import * as publishService from '@/services/publish';

export default {
    namespace: 'publish',
    state: {
        result:[],
    },
    reducers:{
        update(state,{payload:{result}}){
            return {...state,result}
        }
    },
    effects:{
        // ----------- send 
        *send({payload : v},{call, put, select}){
            console.info("I am in models");
            console.info(v);

            let res = [];

            const types = [
                { id: 106, desc: 'epro-mall' },
                { id: 116, desc: 'epro-dmcc-svc' },
                { id: 104, desc: 'epro-user-svc' },
                { id: 103, desc: 'epro-certificate-svc' },
                { id: 173, desc: 'epro-gateway' },
                { id: 166, desc: 'epro-job' },
                { id: 207, desc: 'epro-flyway' },
                { id: 113, desc: 'epro-message' },
                { id: 211, desc: 'utility-epro' },
                { id: 107, desc: 'epro-mall-web' },
            ];
           
            let params = {
            //   id: 'in for loop',
              title: v.title,
              description: v.description,
              target_branch: v.targetBranch,
              source_branch: v.originBranch,
              privateKey: v.privateKey,
            }
            for(var i = 0; i< types.length;i++){
                params.id = types[i].id;
                const r = yield call(publishService.send,params);
                res.push(r);
            }
            yield put({type: 'update', payload:{res}})
        },
    },
}