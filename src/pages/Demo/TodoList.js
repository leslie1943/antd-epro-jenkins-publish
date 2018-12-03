import React, { Component } from 'react';
import styles from './TodoList.css';
import { connect } from 'dva';
import { Button, Input,Checkbox,message} from 'antd';


class TodoList extends Component{
    constructor(props){
        /**
         * this.props:
         *  => dispatch
         *  => history
         *  => list
         *  => location
         *  => match
         */
        super(props)
        
        this.state = {
            value: ''
        }
    }
    componentDidMount(){}

    // 删除待办事项.
    removeItem(index){
        this.props.dispatch({
            type: 'todo/delete',
            payload: index
        })
    }
    // 改变待办事项状态.
    toggleItem(index){
        this.props.dispatch({
            type: 'todo/toggle',
            payload: index
        })
    }
    // 改变待办事项内容.
    modify(value,index){
        this.props.dispatch({
            type: 'todo/modify',
            payload: {value,index}
        })
    }
    // 增加待办事项
    addTodo(value){
        if(value){
            this.props.dispatch({
                type: 'todo/addTodo',
                payload: value
            });
            // 添加后清空.
            this.setState({value: ''});
        }else{
            message.error('待办事项不能为空.');
        }
    }

    render(){
        /**
         * this.props:
         *  => dispatch
         *  => history
         *  => list
         *  => location
         *  => match
         */
        const {list} = this.props;
        let count = 0;
        list.map(item => count = !item.finished ? count + 1: count);
        return(
            <div className={styles.container}>
                <span>
                    <h1>我的待办事项</h1>
                    <h3>你有{count}项待办事项未处理</h3>
                </span>
                
                <Input
                    style={{borderWidth:1,borderColor: '#5aaafa',width:'300px'}}
                    placeholder="请输入待办事项,按回车键直接添加..."
                    value={this.state.value}
                    onChange={(e) => this.setState({value : e.target.value})}
                    onKeyDown={(e)=>{
                        if(e.keyCode === 13){
                            let title = e.target.value
                            if(title.length > 0){
                                this.addTodo(title)
                            }
                        }
                    }}
                />
                <span style={{paddingLeft:'10px'}}></span>
                <Button type="primary" onClick={() => this.addTodo(this.state.value)}>添加</Button>
                <span>
                    <ul>
                        {
                            list.map((item,index) => {
                                return(
                                    <li key={index} style={{marginTop:'10px'}}>

                                        <Checkbox
                                            checked={item.finished}
                                            onChange={() => this.toggleItem(index)}
                                        />
                                        <span style={{width:'20px'}}></span>

                                        <Input
                                            style={{borderWidth:1,borderColor: '#98A3AE',width:'230px'}}
                                            defaultValue={item.title}
                                            autoFocus={false}
                                            onKeyDown={(e) => {
                                                if(e.keyCode === 13){
                                                    let title = e.target.value;
                                                    this.modify(title,index)
                                                }
                                            }}
                                        />
                                        <span style={{paddingLeft:'10px'}}></span>
                                        <Button type="danger" onClick={() => this.removeItem(index)}>删除</Button>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </span>
            </div>
        )
    }
}

/**
 * mapStateToProps 是一个函数，用于建立组件跟 store 的 state 的映射关系
 * 作为一个函数，它可以传入两个参数，结果一定要返回一个 object 
 */
/**
 * state里存放的是所有的models里定义的全部命名空间下的所有对象.
 *      - login:{loginLoading:false,pwd:'',user:''}
 *      - products: array
 *      - routing: location
 *      - todo: list:[]
 */
function mapStateToProps(state){
    // 按需加载.
    return {
        list: state.todo.list,
        // "xxx": state.xxx.xxxAttr, //允许多个对象的注入.
    }
}

// connect里的所有属性在UI层可以使用 this.props.xxx来使用.
const _todoList = connect(mapStateToProps)(TodoList)

export default _todoList