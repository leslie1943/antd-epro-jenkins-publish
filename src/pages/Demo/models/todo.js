// import queryString from 'query-string';
// import * as todoService from '../services/todo';

export default {
    namespace: 'todo',
    state: {
        list: []
    },

    // reducers里的方法参数定义:
    // 1: state
    // 2: 传递的值.
    reducers:{
        save(state,{payload:{list}}){
            /**
             * const foo = {a: 1,b: 2,};
                const bar = {b: 3,c: 2,};
                const d = 4;
                const ret = {...foo,...bar,d} // {a:1,b:3,c:2,d:4}
             */
            // ...state 的值 list , 合并2个值.
            return {...state,list}
        }
    },
    // effects 里的方法参数定义:
    // 1: 前台传递的值
    // 2: 方法类型 [ call | put | select ]
    effects:{
        // ----------- add 
        *addTodo({payload:value},{call,put,select}){
            //模拟网络请求.
            // const data = yield call(todoService.query,value);
            // console.log(data);

            // 从state中获取相应的字段
            let tempList = yield select(state => state.todo.list);

            let list = [];
            list = list.concat(tempList);

            const tempObj = {};
            tempObj.title = value;
            tempObj.id = list.length;
            tempObj.finished = false;
            
            list.push(tempObj);


            yield put({type: 'save',payload:{list}})
        },
        // ----------- toggle 
        *toggle({payload: index},{call, put, select}){
            // const data = yield call(todoService.query, index);
            // console.log(data);

            let tempList = yield select(state => state.todo.list);
            let list = [];
            list = list.concat(tempList);

            let obj = list[index];
            obj.finished = !obj.finished;
            yield put({ type: 'save', payload: { list } });
        },
        // ----------- delete 
        *delete({payload:index},{call,put,select}){
            // const data = yield call(todoService.query, index);
            // console.log(data);

            let tempList = yield select(state => state.todo.list);
            let list = [];
            list = list.concat(tempList);
            list.splice(index,1);

            yield put({type: 'save',payload: {list}});
        },
        // ----------- modify
        *modify({payload:{value,index}},{call,put,select}){
            // const data = yield call(todoService.query, index);
            // console.log(data);

            let tempList = yield select(state => state.todo.list);
            let list = [];
            list = list.concat(tempList);

            let obj = list[index]
            obj.title = value;
            yield put({type: 'save',payload:{list}})
        }
    },
}