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
        *mall_web_config(_,{call,put}){
            const r = yield call(jenkins.epro_mall_web_config)
        },
        *auth(_,{call,put}){
            const res = yield call(jenkins.auth);
            console.info(res);
            setStore('epro_jenkins_auth', res);
        }
    },
}