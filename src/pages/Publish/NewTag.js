import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Form, Table, Divider, Card, Select, Input, Modal, Button, Spin, message } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { getRepository } from '../../utils/gitMap';
const repositories = getRepository();
import layout from "@/utils/layout";

const { Option } = Select;
const FormItem = Form.Item;

const fieldLabels = {
    tag_project: 'Repository name:',
    exist_tag: 'Existence tags:',
    target_tag: 'New tag name:',
    tag_message: 'Tag message',
};
@Form.create()
class NewTag extends Component {
    constructor(props) {
        super(props)
        this.state = { loading: false }
    }

    newSingleTag = () => {
        const { form: { validateFieldsAndScroll, validateFields }, dispatch } = this.props;
        validateFields(['tag_project', 'exist_tag', 'target_tag', 'tag_message'], (error, values) => {
            if (!error) {
                if (values.exist_tag === values.target_tag) {
                    message.error('Can not be same tag name!!!');
                } else {
                    dispatch({
                        type: 'publish/newSingleTag',
                        payload: values
                    });
                }
            }
        })
    }

    onProjectChange = (value) => {
        // 清除表单项其余信息
        this.props.form.setFieldsValue({
            exist_tag: '',
        });

        this.setState({
            loading: true
        })
        // 执行查询
        this.props.dispatch({
            type: 'publish/searchProjectTags',
            payload: value,
            callback: () => {
                this.setState({
                    loading: false
                })
            }
        });
    }
    onExistTagChange = (value) => {
        // 清除表单项其余信息
        this.props.form.setFieldsValue({
            target_tag: value,
        });
    }

    render() {
        const { form: { getFieldDecorator, getFieldValue } } = this.props;
        // from mapStateToProps
        const exist_tags = this.props.exist_tags;
        // const tagLoading = this.props.tagLoading;
        const loading = this.state.loading
        return (
            <PageHeaderWrapper title="New tag" content="">
                <Card bordered={false}>
                    <Spin spinning={loading} tip="Loading...">
                        <Form style={{ marginTop: 8 }}>
                            {/* ------------ Tag project ------------ */}
                            <FormItem {...layout.formItemLayout} label={fieldLabels.tag_project}>{
                                getFieldDecorator('tag_project', {
                                    initialValue: '',
                                    rules: [{ required: true, message: '请选择项目' }]
                                })(<Select placeholder="请选择项目" onChange={(value) => this.onProjectChange(value)}>
                                    {repositories.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>)}
                                </Select>)
                            }</FormItem>

                            {/* ------------ Tag list ------------ */}
                            <FormItem {...layout.formItemLayout} label={fieldLabels.exist_tag}>{
                                getFieldDecorator('exist_tag', {
                                    initialValue: '',
                                    rules: [{ required: true, message: '请选择已存在的tag' }]
                                })(<Select placeholder="请选择已存在的tag" onChange={value => this.onExistTagChange(value)}>
                                    {exist_tags.map(item => <Option key={item.commit.id} value={item.name}>{item.name}</Option>)}
                                </Select>)
                            }</FormItem>

                            {/* ------------ new Tag name ------------ */}
                            <FormItem {...layout.formItemLayout} label={fieldLabels.target_tag}>{
                                getFieldDecorator('target_tag', {
                                    initialValue: '',
                                    rules: [{ required: true, message: '请输入新tag名字' }]
                                })(<Input placeholder="请输入新tag名字" ></Input>)
                            }</FormItem>

                            {/* ------------ Tag message ------------ */}
                            <FormItem {...layout.formItemLayout} label={fieldLabels.tag_message}>{
                                getFieldDecorator('tag_message', {
                                    initialValue: '',
                                    rules: [{ required: true, message: '请输入Tag信息' }]
                                })(<Input placeholder="请输入Tag信息" ></Input>)
                            }</FormItem>

                            <FormItem style={{ marginTop: 10, textAlign: 'center' }}>
                                <Button icon="tag" type="primary" onClick={() => this.newSingleTag()}>Create tag</Button>
                            </FormItem>
                        </Form>
                    </Spin>
                </Card>

            </PageHeaderWrapper>
        )
    }
}

function mapStateToProps(state) {
    return {
        exist_tags: state.publish.exist_tags,
        // // tagLoading: state.publish.tagLoading
    }
}

// connect里的所有属性在UI层可以使用 this.props.xxx来使用.
const _newTag = connect(mapStateToProps)(NewTag)

export default _newTag