import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Card, Modal, Button, message, Divider, Select, Row, Col, Spin } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { getRepository } from '../../utils/gitMap'
import layout from "@/utils/layout";
import styles from "./ProjectInfo.less";

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
                console.info(res)
                if (JSON.stringify(res) != '{}') {
                    res = res.
                        replace(/src="/g, 'src="https://ci.devops.viewchain.net').
                        replace(/href="/g, 'href="https://ci.devops.viewchain.net')
                    this.setState({ loading: false, buildHtml: res })
                }
                this.setState({ loading: false })
            }
        })

    }

    render() {
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
                                    <FormItem><Button type="primary" icon="key" onClick={this.getProjectInfo}>Get project status</Button></FormItem>
                                </Col>
                                <Col span={4}>
                                    <FormItem><Button type="primary" icon="key" onClick={this.getBuildDetail}>Get epro-mall-web/762 build info</Button></FormItem>
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
                                <Card bordered >
                                    <DetailItems projectInfo={projectInfo}></DetailItems>
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

// Project Info
class DetailItems extends Component {
    render() {
        let projectInfo = this.props.projectInfo
        return (
            <div>
                {
                    JSON.stringify(projectInfo) != '{}' &&
                    <div>
                        <div className={styles.outter}><span className={styles.label}>Display name:</span><span className={styles.value}> {projectInfo.displayName}</span></div>

                        <div className={styles.outter}><span className={styles.label}>Full display name :</span><span className={styles.value}> {projectInfo.fullDisplayName}</span></div>

                        <div className={styles.outter}><span className={styles.label}>In queue:</span><span className={styles.value}> {projectInfo.inQueue ? 'true' : 'false'}</span></div>

                        <div className={styles.outter}><span className={styles.label}>LastBuild:</span><span className={styles.value}> {projectInfo.lastBuild.number}</span></div>

                        <div className={styles.outter}><span className={styles.label}>LastCompletedBuild:</span><span className={styles.value}> {projectInfo.lastCompletedBuild.number}</span></div>

                        <div className={styles.outter}><span className={styles.label}>LastFailedBuild:</span><span className={styles.value}> {projectInfo.lastFailedBuild.number}</span></div>

                        <div className={styles.outter}><span className={styles.label}>LastStableBuild:</span><span className={styles.value}> {projectInfo.lastStableBuild.number}</span></div>

                        <div className={styles.outter}><span className={styles.label}>LastSuccessfulBuild:</span><span className={styles.value}> {projectInfo.lastSuccessfulBuild.number}</span></div>

                        <div className={styles.outter}><span className={styles.label}>LastUnsuccessfulBuild:</span><span className={styles.value}> {projectInfo.lastUnsuccessfulBuild.number}</span></div>

                        <div className={styles.outter}><span className={styles.label}>NextBuildNumber:</span><span className={styles.value}> {projectInfo.nextBuildNumber}</span></div>

                        <div className={styles.outter}><span className={styles.label}>HealthReport description:</span><span className={styles.value}> {projectInfo.healthReport[0].description}</span></div>

                        <div className={styles.outter}><span className={styles.label}>HealthReport score:</span><span className={styles.value}> {projectInfo.healthReport[0].score}</span></div>

                        <div className={styles.outter}><span className={styles.label}>ConcurrentBuild:</span><span className={styles.value}> {projectInfo.concurrentBuild}</span></div>

                        <div className={styles.outter}><span className={styles.label}>Color:</span><span className={styles.value}> {projectInfo.color}</span></div>

                        <div className={styles.outter}><span className={styles.label}>ResumeBlocked:</span><span className={styles.value}> {projectInfo.resumeBlocked ? 'true' : 'false'}</span></div>

                    </div>

                }
            </div>
        )
    }
}