import { setStore, getStore } from '@/utils/localStore';
import { message } from 'antd';
import * as jenkins from '@/services/jenkins';

export default {
    namespace: 'jenkins',
    state: {
        mall_json:{},
    },
    reducers:{
        setJson(state,payload){
            // 获取参数值
            let pay = payload.payload;
            // 获取要更新的state
            let key = pay.param;
            //析构其余state
            let result = {...state};
            // 更新模板state
            result[key]= pay.res
            
            return result;
        },
    },
    effects:{
        // get crumb from jenkins.
        *auth(_,{call,put}){
            const res = yield call(jenkins.auth);
            console.info(res);
            setStore('epro_jenkins_auth', res);
        },

        // get mall api json.
        *mall_api_json(_,{call,put}){
            const res = yield call(jenkins.mall_api_json);
            yield put({type: 'setJson', payload:{res:res,param:'mall_json'}})
        },
       
        *build_mall_params(_,{call,put}){
            const r = yield call(jenkins.build_mall_params);
            console.info(r);
        },
        *fetch_mall_config(_,{call,put}){
            const r = yield call(jenkins.fetch_mall_config);
            console.info(r);
        },
    },
}