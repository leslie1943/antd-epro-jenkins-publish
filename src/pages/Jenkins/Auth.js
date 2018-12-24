import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {Form, Card, Modal, Button, message} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
const FormItem = Form.Item;

@Form.create()
class Auth extends Component{
    constructor(props){
        super(props)
    }

    getCrumb(){
        const {dispatch} = this.props;
        dispatch({
            // type: 'jenkins/mall_web_config'
            type: 'jenkins/auth',
        })
    }
    render(){
        const { form: { getFieldDecorator , getFieldValue}} = this.props;

        return(
            <PageHeaderWrapper title="Jenkins authorization" content="">
                <Card bordered={false}>
                    <Form style={{marginTop: 8, textAlign: 'left'}}>
                        <Button type="primary" icon="key" onClick={()=>this.getCrumb()}>Get crumb</Button>
                     </Form>
                </Card>
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
const _auth = connect(mapStateToProps)(Auth)

export default _auth