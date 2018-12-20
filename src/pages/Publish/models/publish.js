import * as publish from '@/services/publish';
import { setStore,getStore } from '@/utils/localStore';
import { getLatestRecord, generateLatestTag } from '@/utils/utils';

import { message } from 'antd';
import { getRepository } from '@/utils/gitMap';


export default {
    namespace: 'publish',
    state: {
        mrResult: getStore("epro_publish_tool_mergeRequest"),
        acceptResult: getStore("epro_publish_tool_acceptRequest"),
        mrList:[],
        sendLoading: false,
        tagLoading: false,
        acceptLoading: false,
        tags:[],
        exist_tags:[],
    },
    reducers:{
        setMrResult(state,payload){
            return {
                ...state,
                mrResult: payload.payload.res, // res should be same from different effect's methods.
            }
        },
        setAcceptResult(state,payload){
            return {
                ...state,
                acceptResult: payload.payload.res, // res should be same from different effect's methods.
            }
        },
        freshMrList(state,payload){
            return {
                ...state,
                mrList: payload.payload.r,
            }
        },
        setSendLoading(state,{payload:{loading}}){
            return {
                ...state,
                sendLoading: loading
            }
        },
        setTagLoading(state,{payload:{loading}}){
            return {
                ...state,
                tagLoading: loading,
            }
        },
        setTags(state,{payload:{tags}}){
            return {
                ...state,
                tags: tags,
            }           
        },
        update_exist_tags(state,{payload:{exist_tags}}){
            return {
                ...state,
                exist_tags: exist_tags,
            }
        }
    },
    effects:{
        // ------------------------------- Submit All Merge Request  -------------------------------
        *sendMR({payload : v},{call, put, select}){
            // assemble params
            let params = {
            //   id: 'in for loop',
              title: v.mr_title,
              description: v.mr_description,
              target_branch: v.mr_targetBranch,
              source_branch: v.mr_originBranch,
            //   privateKey: v.mr_privateKey,
            }

            // send_loading: true
            yield put({type: 'setSendLoading', payload:{loading: true}})

            // get git repositories which from selection
            const repositories = v.mr_repos

            // start call services.
            let res = [];
            for(var i = 0; i< repositories.length;i++){
                params.id = repositories[i]
                const r = yield call(publish.sendMR,params);
                // 校验返回结果
                if(r){
                    res.push(r);
                }
            }
            // set localstore incase refresh page.
            setStore('epro_publish_tool_mergeRequest',res);
            // update state: result
            yield put({type: 'setMrResult', payload:{res}})
            yield put({type: 'setSendLoading', payload:{loading: false}})
        },

        // ------------------------------- 接受单个Merge request -------------------------------
        *acceptOne({payload: v},{call, put, select}){
            // -------------------- Step_1: Before accepting.
            let params = {
                id: v.id,
                iid: v.iid,
            }
            // -------------------- Step_2: Doing accept.
            const r = yield call(publish.acceptMR, params);

            // -------------------- Step_3: After accept.
            // get merge requests from local storage.
            let current_mrs = getStore("epro_publish_tool_mergeRequest");
            // filter item from local items
            let res = current_mrs.filter(item => {
                return item.iid !== v.iid;
            });

            // update state: result.
            yield put({type: 'setMrResult', payload:{res}})
            // update local storage.
            setStore('epro_publish_tool_mergeRequest',res);
        },

        // ------------------------------- 接受全部Merge request -------------------------------
        *acceptAll(_, {call , put}){
            // get all merge request from local.
            let current_mrs = getStore("epro_publish_tool_mergeRequest");

            // 🚧🚧🚧 call api to accept one by one.
            let res_accept = [];
            while(current_mrs.length != 0){
                // id is project_id
                let params = {id:'', iid:''};
                params.id = current_mrs[0].project_id;
                params.iid = current_mrs[0].iid;
                const r = yield call(publish.acceptMR,params);
                // 将accept结果存储
                res_accept.push(r);

                //🎃🎃🎃 删除当前数据 并更新 LocalStorage 和 state. 🎃🎃🎃
                current_mrs.splice(0,1);
                // update state: result.
                yield put({type: 'setMrResult', payload:{res:current_mrs}})
                // update local storage.
                setStore('epro_publish_tool_mergeRequest',current_mrs);
            }

            // set accept merge reqs into local 
            setStore('epro_publish_tool_acceptRequest',res_accept);
            // update state 
            yield put({type: 'setAcceptResult', payload:{res: res_accept}})
        },

        // ------------------------------- 一次性查询所有项目的tags -------------------------------
        *searchTags(_,{call,put}){
            const tag_reps = getRepository();
            // start call services.
            let res = [];
            for(var i = 0; i < tag_reps.length; i++){
                let params = {};
                params.id = tag_reps[i].value;
                const r = yield call(publish.searchTags , params);

                // 查询最新的.
                let latest = getLatestRecord(r);
                if(latest){
                    latest.project_id = tag_reps[i].value;
                    latest.key = tag_reps[i].value;
                    res.push(latest);
                }
            }
            yield put({type: 'setTags', payload:{tags:res}})
        },

         // ------------------------------- 根据项目查询tags -------------------------------
        *searchProjectTags({payload:project_id},{call,put}){
            yield put({type: 'setTagLoading', payload:{loading: true}})
            // 清空list
            yield put({type: 'update_exist_tags', payload:{exist_tags:[]}})
            
            let params = {
                id: project_id,
            }
            const r = yield call(publish.searchTags , params);
            //刷新list
            yield put({type: 'update_exist_tags', payload:{exist_tags:r}})
            yield put({type: 'setTagLoading', payload:{loading: false}})
        },

        // ------------------------------- 根据输入内容创建Tag -------------------------------
        *newSingleTag({payload},{call,put}){
            let params = {
                id: payload.tag_project,
                tag_name: payload.target_tag,
                ref: 'master',
                message: payload.tag_message,
            }
            const r = yield call(publish.createTag,params);
        },

        // ------------------------------- 从列表选区后创建Tag -------------------------------
        *newTag({payload:record},{call,put}){
            let tag = record
            let latest_tag = generateLatestTag(tag.name);
            let params = {
                id: tag.project_id,
                tag_name: latest_tag,
                ref: 'master',
            }
            const r = yield call(publish.createTag,params);
        },

        // ------------------------------- 全局性的创建Tags. -------------------------------
        *createTagsAuto({payload:tags},{call,put}){
            for(let i = 0; i < tags.length; i++){
                let tag = tags[i];
                let latest_tag = generateLatestTag(tag.name);
                let params = {
                    id: tag.project_id,
                    tag_name: latest_tag,
                    ref: 'master',
                    message: '',
                }
                const r = yield call(publish.createTag,params);
            }
        },

        // ------------------------------- 指定版本为全局创建Tags -------------------------------
        *createTagsManually(_,{call,put}){
            const repositories = getRepository();
            for(let i = 0; i<repositories.length; i++){
                let params = {
                    id: repositories[i].id,
                    tag_name: '2.0.0',
                    ref: 'master',
                    message: '[2018-12-20] 2.0.0版本发布',
                }
                const r = yield call(publish.createTag , params);
            }
        },
        
        // ------------------------------- 查询Merge request -------------------------------
        *searchMR({payload},{call, put, select}){
            let params = {
                id: payload.repository
            }
            const r = yield call(publish.searchMR, params);
            yield put({type: 'freshMrList', payload:{r}})
        },

        // ------------------------------- close -------------------------------
        *close({payload: record},{call, put, select}){
            let params = {
                id: record.project_id,
                iid: record.iid,
            }
            yield call(publish.close, params);
            
            const r = yield call(publish.searchMR, params);
            yield put({type: 'freshMrList', payload:{r}})
        },
        
    },
}