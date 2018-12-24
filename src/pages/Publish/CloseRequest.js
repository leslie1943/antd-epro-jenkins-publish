import React, { Component } from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import layout from "@/utils/layout";

@Form.create()
class CloseRequest extends Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){}
    render(){
        const { form: { getFieldDecorator , getFieldValue}} = this.props;
        return(
            <PageHeaderWrapper title="关闭 Merge request" content="">
            </PageHeaderWrapper>
        )
    }
}

function mapStateToProps(state){
    return {
    }
}

// connect里的所有属性在UI层可以使用 this.props.xxx来使用.
const _closeRequest = connect(mapStateToProps)(CloseRequest)

export default _closeRequest