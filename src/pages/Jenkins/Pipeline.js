import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Form, Card, Modal, Button, message, Select, Radio, Input } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import { getRepository } from '../../utils/gitMap';
const repositories = getRepository();
import layout from "@/utils/layout";
const FormItem = Form.Item;
const RadioGroup = Radio.Group

@Form.create()
class Pipeline extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tags: []
        }
    }

    // 查询选中仓库的tags
    onProjectChange = (value) => {
        // 重置state
        this.setState({ tags: [] })
        // 执行查询
        this.props.dispatch({
            type: 'publish/searchProjectTags',
            payload: value,
            callback: (res) => {
                // 重置 tag name
                this.props.form.setFieldsValue({ gitTagName: '' })
                this.setState({
                    tags: res
                })
            }
        });
    }

    // 查询选中仓库的tags
    onTagChange = (value) => {
        console.info(value)
    }
    changeBranch = (e) => {
        console.info(e.target.value)
    }
    buildProject = () => {
        const { form: { validateFields }, dispatch } = this.props;
        validateFields(['gitProject', 'gitTagName', 'gitBranch', 'gradleProperties'], (error, values) => {
            if (!error) {
                console.info(values)
                Modal.confirm({
                    title: '构建 Mall 项目',
                    content: '请确认你的操作?',
                    okText: '确定',
                    cancelText: '取消',
                    onOk: () => dispatch({
                        type: 'jenkins/buildPipeline',
                        payload: values,
                    })
                })
            }
        })
    }

    render() {
        const { form: { getFieldDecorator, getFieldValue } } = this.props;
        const { tags } = this.state;
        // gitTagName
        // gitBranch
        // gradleProperties
        return (
            <PageHeaderWrapper title="Jenkins pipeline" content="">
                <Card bordered={false}>
                    <Form style={{ marginTop: 8, textAlign: 'left' }}>
                        {/* ------------ project name ------------ */}
                        <FormItem {...layout.formItemLayout} label="Repository">{
                            getFieldDecorator('gitProject', {
                                initialValue: '',
                                rules: [{ required: true, message: 'Repository is required' }]
                            })(<Select placeholder="请选择项目" onChange={(value) => this.onProjectChange(value)}>
                                {repositories.map(item => <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>)}
                            </Select>)
                        }</FormItem>
                        {/* ------------ tag name ------------ */}
                        <FormItem {...layout.formItemLayout} label="Tag" extra="可空">{
                            getFieldDecorator('gitTagName', {
                                initialValue: '',
                                // rules: [{ required: true, message: 'Tag is required' }]
                            })(<Select placeholder="请选择Tag name" onChange={(value) => this.onTagChange(value)}>
                                {tags.map(item => <Select.Option key={item.name} value={item.name}>{item.name}</Select.Option>)}
                            </Select>)
                        }</FormItem>
                        {/* ------------ brnach name ------------ */}
                        <FormItem {...layout.formItemLayout} label="Branch" extra="可空,默认走develop分支">{
                            getFieldDecorator('gitBranch', {
                                initialValue: '',
                                // rules: [{ required: true, message: 'Branch is required' }]
                            })(<RadioGroup onChange={this.changeBranch}>
                                < Radio value="develop" > develop</Radio>
                                <Radio value="develop-hx">develop-hx</Radio>
                            </RadioGroup>)
                        }</FormItem>
                        {/* ------------ gradleProperties ------------ */}
                        <FormItem {...layout.formItemLayout} label="Gradle properties" extra="可空,示例: -Pk1=v1 -Pk2=v2">{
                            getFieldDecorator('gradleProperties', {
                                initialValue: '',
                                // rules: [{ required: true, message: 'Gradle properties is required' }]
                            })(<Input.TextArea />)
                        }</FormItem>

                        <FormItem style={{ textAlign: 'center' }}>
                            <Button type="primary" icon="build" onClick={this.buildProject}>Build</Button>
                        </FormItem>
                    </Form>
                </Card >
            </PageHeaderWrapper >
        )
    }
}

function mapStateToProps(state) {
    return {
        // tags: state.jenkins.tags
    }
}

// connect里的所有属性在UI层可以使用 this.props.xxx来使用.
const _pipeline = connect(mapStateToProps)(Pipeline)

export default _pipeline