import { setStore, getStore } from '@/utils/localStore';
import { message } from 'antd';
import * as jenkins from '@/services/jenkins';

export default {
    namespace: 'jenkins',
    state: {
    },
    reducers:{
    },
    effects:{

        // get mall api json.
        *mall_api_json(_,{call,put}){
            const r = yield call(jenkins.mall_api_json);
        },
        // get crumb from jenkins.
        *auth(_,{call,put}){
            const res = yield call(jenkins.auth);
            console.info(res);
            setStore('epro_jenkins_auth', res);
        },
        *build_mall_params(_,{call,put}){
            const r = yield call(jenkins.build_mall_params);
            console.info(r);
        },
        *fetch_mall_config(_,{call,put}){
            const r = yield call(jenkins.fetch_mall_config);
            console.info(r);
        }
    },
}