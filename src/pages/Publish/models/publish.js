import * as publish from '@/services/publish';
import { setStore,getStore } from '@/utils/localStore';
import { message } from 'antd';
import { getRepository } from '@/utils/gitMap';


export default {
    namespace: 'publish',
    state: {
        mrResult: getStore("epro_publish_tool_mergeRequest"),
        acceptResult: getStore("epro_publish_tool_acceptRequest"),
        mrList:[],
        sendLoading: false,
        acceptLoading: false,
        tags:[],
    },
    reducers:{
        setMrResult(state,payload){
            // console.info(payload);
            return {
                ...state,
                mrResult: payload.payload.res, // res should be same from different effect's methods.
            }
        },
        setAcceptResult(state,payload){
            // console.info(payload);
            return {
                ...state,
                acceptResult: payload.payload.res, // res should be same from different effect's methods.
            }
        },
        freshMrList(state,payload){
            // console.info(payload);
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
        }
    },
    effects:{
        // ------------------------------- Submit All Merge Request  -------------------------------
        *sendMR({payload : v},{call, put, select}){
            console.info('[Debug-Log: params in model start]')
            console.info(v);
            // assemble params
            let params = {
            //   id: 'in for loop',
              title: v.mr_title,
              description: v.mr_description,
              target_branch: v.mr_targetBranch,
              source_branch: v.mr_originBranch,
              privateKey: v.mr_privateKey,
            }

            // send_loading: true
            yield put({type: 'setSendLoading', payload:{loading: true}})

            // get git repositories which should be submitted merge request.
            const repositories = getRepository();

            // start call services.
            let res = [];
            for(var i = 0; i< repositories.length;i++){
                params.id = repositories[i].id;
                const r = yield call(publish.sendMR,params);
                res.push(r);
            }

            // set localstore incase refresh page.
            setStore('epro_publish_tool_mergeRequest',res);
            // update state: result
            yield put({type: 'setMrResult', payload:{res}})
            yield put({type: 'setSendLoading', payload:{loading: false}})
        },

        // ------------------------------- ACCEPT ONE -------------------------------
        *acceptOne({payload: v},{call, put, select}){
            // -------------------- Step_1: Before accepting.
            let params = {
                id: v.id,
                iid: v.iid,
            }
            // -------------------- Step_2: Doing accept.
            // const r = yield call(publish.acceptMR, params);

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

        // ------------------------------- ACCEPT ALL -------------------------------
        *acceptAll(_, {call , put}){
            // get all merge request from local.
            let current_mrs = getStore("epro_publish_tool_mergeRequest");

            // 🚧🚧🚧 call api to accept one by one.
            let res_accept = [];
            while(current_mrs.length != 0){
                // 组织数据=>accept merge request=>get result=>set local && state
                let params = {id:'', iid:''};
                params.id = current_mrs[0].id;
                params.iid = current_mrs[0].iid;
                // const r = yield call(publish.acceptMR,params);
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
        }









        // ----------- close
        // *close({payload: v},{call, put, select}){
        //     console.info('[Debug-Log: params in model start]')
        //     console.info(v);
        //     let params = {
        //         id: v.mrType,
        //         iid: v.mrId,
        //     }
        //     const r = yield call(publish.close, params);
        //     console.info(r);
        // },
        // ----------- searchMR
        // *searchMR({payload: v},{call, put, select}){
        //     console.info('[Debug-Log: params in model start]')
        //     console.info(v);
        //     let params = {
        //         id: v.mrType,
        //     }
        //     const r = yield call(publish.searchMR, params);
        //     console.info(r);
        //     yield put({type: 'freshMrList', payload:{r}})
        // },
        
    },
}