import { setStore, getStore } from '@/utils/localStore';
import { searchTags } from '@/services/publish';
import { message } from 'antd';
import * as jenkins from '@/services/jenkins';
import { getGitMap } from '@/utils/gitMap';

const gitMap = getGitMap();

export default {
    namespace: 'jenkins',
    state: {
        mall_json: {},
        //loading
        initLoading: false,
        // all dependency tags.
        user_svc_tags: [],
        certificate_svc_tags: [],
        dmcc_svc_tags: [],
        mall_tags: [],
        gateway_tags: [],
        job_tags: [],
        message_tags: [],
        op_tags: [],
        support_tags: [],
        utility_tags: [],
    },
    reducers: {
        updateStateByParam(state, payload) {
            // 获取参数值
            let pay = payload.payload;
            // 获取要更新的state
            let key = pay.param;
            //析构其余state
            let result = { ...state };
            // 更新模板state
            result[key] = pay.res

            return result;
        },
        setLoading(state, { payload: { loading } }) {
            return {
                ...state,
                initLoading: loading,
            }
        },
    },
    effects: {
        // get crumb from jenkins.
        *auth(_, { call, put }) {
            const res = yield call(jenkins.auth);
            setStore('epro_jenkins_auth', res);
        },

        *buildDeploy(_, { call, put }) {
            const r = yield call(jenkins.buildDeploy);
        },
        *init_dependency(_, { call, put }) {
            yield put({ type: 'setLoading', payload: { loading: true } })
            const repository = [
                { value: 104, label: 'epro-user-svc', tags: 'user_svc_tags' },
                { value: 103, label: 'epro-certificate-svc', tags: 'certificate_svc_tags' },
                { value: 116, label: 'epro-dmcc-svc', tags: 'dmcc_svc_tags' },
                { value: 106, label: 'epro-mall', tags: 'mall_tags' },
                { value: 173, label: 'epro-gateway', tags: 'gateway_tags' },
                { value: 166, label: 'epro-job', tags: 'job_tags' },
                { value: 113, label: 'epro-message', tags: 'message_tags' },
                { value: 117, label: 'epro-op', tags: 'op_tags' },
                { value: 207, label: 'epro-support', tags: 'support_tags' },
                { value: 211, label: 'utility-epro', tags: 'utility_tags' },
            ];

            for (let i = 0; i < repository.length; i++) {
                let params = {
                    id: repository[i].value,
                }
                const res = yield call(searchTags, params);
                yield put({ type: 'updateStateByParam', payload: { res: res, param: repository[i].tags } })
            }
            yield put({ type: 'setLoading', payload: { loading: false } })
        },

        *buildPipeline({ payload }, { call, put }) {
            let params = {
                gitTagName: payload.gitTagName,
                gitBranch: payload.gitBranch,
                gradleProperties: payload.gradleProperties,
                gitProject: gitMap[payload.gitProject],
            }
            console.info(params)
            const r = yield call(jenkins.buildPipeline, params);
        }
    },
}