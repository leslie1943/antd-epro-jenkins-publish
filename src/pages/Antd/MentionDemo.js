import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {Form,Mention} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
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
    changeHandle(contentState){
        console.info('.........changeHandle.........');
        // console.info(contentState)
        console.info(toString(contentState));
    }

    // select event
    selectHandle(suggestion){
        console.info('.........selectHandle.........');
        console.info('onSelect',suggestion);
    }

    render(){
        return(
            <PageHeaderWrapper title="Antd demo - Mention" content="mention">
                <Mention style={{width:'100%'}}
                onChange={(v) => this.changeHandle(v)}
                defaultValue={toContentState('@afc163')}
                // defaultSuggestions={this.state.suggestionList}
                suggestions={this.state.suggestionList}
                onSelect={(suggestion)=>this.selectHandle(suggestion)}
                placement="top"
                >
                </Mention>
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