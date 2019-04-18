import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Card, Modal, Button, message, Divider, Select, Row, Col, Spin } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { getRepository } from '../../utils/gitMap'
import layout from "@/utils/layout";
const repositories = getRepository()
// console.table(repositories)
const FormItem = Form.Item;

@connect(({ jenkins, loading }) => ({
    loading: loading.models.jenkins,
}))
@Form.create()
class ProjectInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            projectInfo: {},
            buildHtml: ''
        }
    }
    getProjectInfo = () => {
        const { form: { getFieldValue, validateFields }, dispatch } = this.props;
        validateFields(['project'], (error, values) => {
            if (!error) {
                this.setState({ loading: true })
                dispatch({
                    type: 'jenkins/getProjectJson',
                    payload: values,
                    callback: (res) => {
                        console.info(res)
                        this.setState({ loading: false, projectInfo: res })
                    }
                })
            }
        })
    }

    getBuildDetail = () => {
        const { form: { getFieldValue, validateFields }, dispatch } = this.props;

        this.setState({ loading: true })
        dispatch({
            type: 'jenkins/getBuildDetail',
            payload: {},
            callback: (res) => {
                // console.info(res)
                res = res.replace(/<img src="/g, '<img src="https://ci.devops.viewchain.net')
                this.setState({ loading: false, buildHtml: res })
            }
        })

    }

    render() {
        console.info(this.props)
        const { form: { getFieldDecorator, getFieldValue } } = this.props;
        const { loading, projectInfo, buildHtml } = this.state
        return (
            <PageHeaderWrapper title="Jenkins project information" content="">
                <Spin spinning={loading} tip="Loading...">
                    <Card bordered={false}>
                        <Form style={{ marginTop: 8 }}>
                            <Row>
                                <Col span={8}>
                                    <FormItem {...layout.formItemLayout} label="Repository">
                                        {getFieldDecorator('project', {
                                            initialValue: '',
                                            rules: [{ required: true, message: 'Repository is required' }]
                                        })(<Select>
                                            {repositories.map(item => <Select.Option key={item.value} value={item.label}>{item.label}</Select.Option>)}
                                        </Select>)}
                                    </FormItem>
                                </Col>
                                <Col span={4}>
                                    <FormItem>
                                        <Button type="primary" icon="key" onClick={this.getProjectInfo}>Get project status</Button>
                                    </FormItem>
                                </Col>
                                <Col span={4}>
                                    <FormItem>
                                        <Button type="primary" icon="key" onClick={this.getBuildDetail}>Get epro-mall-web/762 build info</Button>
                                    </FormItem>
                                </Col>
                            </Row>
                        </Form>
                        <Divider />
                        <Row>
                            <Col style={{ padding: '10px' }} span="10">
                                <Card bordered>
                                    <div style={{ fontSize: '10px' }} dangerouslySetInnerHTML={{ __html: buildHtml }}></div>
                                </Card>
                            </Col>
                            <Col style={{ padding: '10px' }} span="14">
                                <Card bordered>
                                    <div style={{ fontSize: '10px' }}>
                                        {JSON.stringify(projectInfo) == '{}' ? '' : JSON.stringify(projectInfo)}
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </Card>
                </Spin>
            </PageHeaderWrapper >
        )
    }
}

export default ProjectInfo