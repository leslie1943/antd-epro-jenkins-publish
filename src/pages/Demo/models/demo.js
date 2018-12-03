/**
 * dva通过model的概念把一个领域的模型管理起来,包含
 *  【💗💗 reducers (VUEX里的 mutation) ====>>>>> 处理数据 】
 *      同步更新 state 的 reducers: key/value形式的格式定义reducer.用于处理同步操作，唯一可以修改state的地方，有action触发.
 *      格式为 
 *              (state,action) => newState
 *                      或者
 *              [(state,action) => newState,enhancer]    尽量制作state的数据返回,不做逻辑
 *  【💗💗 effects (VUEX里的action) ====>>>>> 接收数据 】 处理异步逻辑的effects
 * 
 *  【💗💗 subsriptions ====>>>>> 监听数据 】以key/value的格式定义subsription, subscription是订阅，用于订阅一个数据源，
 *      然后根据需要dispatch相应的action.在app.start()时被执行,数据源可以是当前的时间,服务器的websocket连接,keyboard输入,geolocation变化,history路由变化的等等
 *   格式为 ({dispatch,history},done) => unlistenFunction
 */
/*
    put 用来发起一条action.
    call 以异步的方式调用函数.
    select 从 state 中获取相关的数据
    take 获取发送的数据
*/

export default {
    namespace:'products', //表示在全局state上的key
    state:{ // 初始值
        data:[
            {id: 1,key: 1,name: 'dva', author:'Facebook', publishDate: '2018-01-01', ver:'v1.0'},
            {id: 2,key: 2,name: 'antd', author:'Google', publishDate: '2018-11-11', ver:'v2.0'},
            {id: 3,key: 3,name: 'dva', author:'Facebook', publishDate: '2018-01-01', ver:'v1.0'},
            {id: 4,key: 4,name: 'antd', author:'Google', publishDate: '2018-11-11', ver:'v2.0'},
            {id: 5,key: 5,name: 'dva', author:'Facebook', publishDate: '2018-01-01', ver:'v1.0'},
            {id: 6,key: 6,name: 'antd', author:'Google', publishDate: '2018-11-11', ver:'v2.0'},
            {id: 7,key: 7,name: 'dva', author:'Facebook', publishDate: '2018-01-01', ver:'v1.0'},
            {id: 8,key: 8,name: 'antd', author:'Google', publishDate: '2018-11-11', ver:'v2.0'},
            {id: 9,key: 9,name: 'dva', author:'Facebook', publishDate: '2018-01-01', ver:'v1.0'},
            {id: 10,key: 10,name: 'antd', author:'Google', publishDate: '2018-11-11', ver:'v2.0'},
            {id: 11,key: 11,name: 'dva', author:'Facebook', publishDate: '2018-01-01', ver:'v1.0'},
            {id: 12,key: 12,name: 'antd', author:'Google', publishDate: '2018-11-11', ver:'v2.0'},
            {id: 13,key: 13,name: 'dva', author:'Facebook', publishDate: '2018-01-01', ver:'v1.0'},
            {id: 14,key: 14,name: 'antd', author:'Google', publishDate: '2018-11-11', ver:'v2.0'},
          ],
    },
    
    effects:{
        // {payload}:固定写法,接收UI传递的参数数据.
        *delete({payload},{put,select}){
            // 选取当前数据
            let currentList = yield select(state => state.products.data);
            // 过滤(删除数据)
            // 👇👇👇 "data" 的命名需要和 state 里的命名一致,否则不能在 reducer里进行操作.
            let data = currentList.filter(item => item.id !== payload.id)
            //传递参数
            yield put({type: 'deleteRecord',payload:{data}})
            // yield put({type: 'removeRecord',payload:{data}})
            // yield put({type: 'reduceRecord',payload:{data}})
        },
        *addProduct({payload},{put,select}){
            let currentList = yield select(state => state.products.data);
            let data = [];
            data = data.concat(currentList);
            let tempObj = {};
            tempObj.id = data.length + 1;
            tempObj.key = data.length + 1;
            tempObj.name = payload.value;
            tempObj.author = payload.value;
            tempObj.publishDate = '2018-01-01';
            tempObj.ver = "v1.0";
            data.push(tempObj);
            yield put({type:'save',payload:{data}})
        },
        *searchProduct({payload},{put,select}){
            let currentList = yield select(state => state.products.data);
            let data = currentList.filter(item=> item.name.indexOf(payload.query) > -1);
            yield put({type:'save',payload:{data}})
        }
    },
    reducers: { // 接收action,同步更新state.
        /**
         * 第二个传递参数方式有2种.
         *      parameter______1: {payload} 对象整体传递
         *      parameter______2: {payload:{data}} 显示传递 从effects里过来的参数.
         *      parameter______3: payload  实体整体传递
         */
        save(state,{payload}){
            return {
                data: payload.data,
            }
        },

         // parameter______1
        deleteRecord(state,{payload}){
            /**
             * {data: [.........] }
             */
            console.info(payload);
            return {
                data: payload.data,
            }
        },

        // parameter______2
        removeRecord(state,{payload:{data}}){
            // [.........]
            console.info(data);
            return {...state, data}
        },

        // parameter______3
        reduceRecord(state,payload){
            /**
             * type: "products/reduceRecord"
             * payload:{data:[.............]}
             */
            console.info(payload);

            return {
                data: payload.payload.data,
            }
        }
    },
    subscriptions: {
    }
}