import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {Form,Mention} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import layout from "@/utils/layout";

const FormItem = Form.Item;

// toContentState: 把字符串转成 ContentState
// toString: 把 ContentState 转成字符串	
const {toString,toContentState} = Mention;

@Form.create()
class MentionDemo extends Component{
    constructor(){
        super(); // 如果要使用this,必须有super()
        this.state = {suggestionList:['afc163', 'benjycui', 'yiminghe', 'jljsj33', 'dqaria', 'RaoHai']}
    }
    // change event
    // changeHandle(contentState){ ✨✨✨✨ 传统定义的方法 ✨✨✨✨
    changeHandle = (contentState) => {
        console.info('.........changeHandle.........');
        // console.info(contentState)
        console.info(toString(contentState));
    }

    // select event
    // selectHandle(suggestion){ ✨✨✨✨ 传统定义的方法 ✨✨✨✨
    selectHandle = (suggestion) => {
        console.info('.........selectHandle.........');
        console.info('onSelect',suggestion);
    }

    render(){
        const { form: { getFieldDecorator , getFieldValue}} = this.props;
        return(
            <PageHeaderWrapper title="Antd demo - Mention" content="mention">
                <Form>
                    {/* 每个FormItem分为两部分:
                    1: 装饰器部分: name, rules,initialValue 等options
                    2: 元素部分: 
                        <Form.Item>
                            {
                                1: getFieldDecorator('xxxxxx',{options})
                                2: (<Element onChange={this.changeHandle}></Element>)
                            }
                        </Form.Item>
                    */}
                    <Form.Item {...layout.formItemLayout} label="Name">
                       {getFieldDecorator('name',{
                           rules:[{required:true,message:'sssss'}],
                           initialValue: toContentState('@afc163')
                       })(<Mention style={{width:'100%'}}
                       suggestions={this.state.suggestionList}
                       // defaultSuggestions={this.state.suggestionList}
                       // onSelect={(suggestion)=>this.selectHandle(suggestion)} =====> ✨✨✨✨ 传统定义的方法 ✨✨✨✨
                       // onChange={(v) => this.changeHandle(v)}  =====> ✨✨✨✨ 传统定义的方法 ✨✨✨✨
                       onChange={this.changeHandle}
                       onSelect={this.selectHandle}
                       placement="top"
                   ></Mention>)}
                    </Form.Item>
                </Form>
            </PageHeaderWrapper>
        )
    }
}

function mapStateToProps(state){
    return {
        // tags: state.jenkins.tags
    }
}

// connect里的所有属性在UI层可以使用 this.props.xxx来使用.
const _mentionDemo = connect(mapStateToProps)(MentionDemo)

export default _mentionDemo