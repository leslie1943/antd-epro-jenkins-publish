import * as publish from '@/services/publish';
import { setStore,getStore } from '@/utils/localStore';
import { message } from 'antd';
import { getRepository } from '@/utils/gitMap';


export default {
    namespace: 'publish',
    state: {
        result: getStore("epro_publish_tool_mergeRequest"),
        mrList:[],
        mr_loading: false,
    },
    reducers:{
        update(state,payload){
            console.info(payload);
            return {
                result: payload.payload.res, // res should be same from different effect's methods.
            }
        },
        freshMrList(state,payload){
            // console.info(payload);
            return {
                mrList: payload.payload.r,
            }
        },
    },
    effects:{
        // ----------- sendMR 
        *sendMR({payload : v},{call, put, select}){
            console.info('[Debug-Log: params in model start]')
            console.info(v);
            // get git repositories which should be submitted merge request.
            const types = getRepository();
            // assemble params
            let params = {
            //   id: 'in for loop',
              title: v.mr_title,
              description: v.mr_description,
              target_branch: v.mr_targetBranch,
              source_branch: v.mr_originBranch,
              privateKey: v.mr_privateKey,
            }

            // start call services.
            let res = [];
            for(var i = 0; i< types.length;i++){
                params.id = types[i].id;
                const r = yield call(publish.sendMR,params);
                res.push(r);
            }

            // set localstore incase refresh page.
            setStore('epro_publish_tool_mergeRequest',res);
            // update state: result
            yield put({type: 'update', payload:{res}})
        },
        // ----------- close
        *close({payload: v},{call, put, select}){
            console.info('[Debug-Log: params in model start]')
            console.info(v);
            let params = {
                id: v.mrType,
                iid: v.mrId,
            }
            const r = yield call(publish.close, params);
            console.info(r);
        },
        // ----------- close
        *searchMR({payload: v},{call, put, select}){
            console.info('[Debug-Log: params in model start]')
            console.info(v);
            let params = {
                id: v.mrType,
            }
            const r = yield call(publish.searchMR, params);
            console.info(r);
            yield put({type: 'freshMrList', payload:{r}})
        },
        // ----------- merge
        *acceptMR({payload: v},{call, put, select}){
            // -------------------- Step_1: Before accepting.
            let params = {
                id: v.id,
                iid: v.iid,
            }
            // -------------------- Step_2: Doing accept.
            // const r = yield call(publish.acceptMR, params);
            // console.info(r);
            // yield put({type: 'freshMrList', payload:{r}})

            // -------------------- Step_3: After accept.
            // get merge requests from local storage.
            let current_mrs = getStore("epro_publish_tool_mergeRequest");
            // filter item from local items
            let res = current_mrs.filter(item => {
                return item.iid !== v.iid;
            });

            // update state: result.
            yield put({type: 'update', payload:{res}})
            // update local storage.
            setStore('epro_publish_tool_mergeRequest',res);
        }
    },
}