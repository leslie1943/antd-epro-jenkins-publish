import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Form, Table, Divider, Card, Select, Row, Col, Input, Modal, Button, Spin, message, Icon } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { getRepository } from '../../utils/gitMap';
const repositories = getRepository();
import layout from "@/utils/layout";
const { Option } = Select;
const FormItem = Form.Item;


let id = 0;
const colorType = ["#409eff", "#67c23a", "#909399", "#e6a23c", "#f56c6c"]

@Form.create()
class BatchTag extends Component {
    constructor(props) {
        super(props)
        this.state = { loading: false }
    }

    add = () => {
        const { form } = this.props
        // can use data-binding to get
        const keys = form.getFieldValue('keys')
        const nextKeys = keys.concat(id++)
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({ keys: nextKeys })
    }

    remove = (k) => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        // We need at least one passenger
        if (keys.length === 1) {
            return;
        } else {
            // 删除最后一个.
            // can use data-binding to set
            form.setFieldsValue({
                keys: keys.filter(key => key !== k),
            });
        }
    }

    // 批量提交
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({ loading: true })
                console.info('receive from:', values)
                let payload = []
                let tags = values['keys']
                for (let i = 0; i < tags.length; i++) {
                    payload.push({
                        id: values[`repos${tags[i]}`],
                        ref: values[`branch${tags[i]}`],
                        tag_name: values[`tag${tags[i]}`],
                        message: values[`msg${tags[i]}`],
                    })
                }
                console.table(payload)
                this.props.dispatch({
                    type: 'publish/batchTag',
                    payload: payload,
                    callback: (res) => {
                        console.info(res)
                        this.setState({ loading: false })
                        message.success('All tags have been created!')
                    }
                });

            }
        });
    }

    // 渲染页面
    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        let { loading } = this.state
        getFieldDecorator('keys', { initialValue: [] })
        const keys = getFieldValue('keys')
        const cardItems = keys.map((k, index) => (
            <Card key={index} >
                {/* 项目名称 */}
                <Col span={1}>
                    <FormItem >{index + 1}</FormItem>
                </Col>
                <Col span={5}>
                    <FormItem >
                        {getFieldDecorator(`repos${k}`, {
                            rules: [{
                                required: true,
                                message: 'Repository is required.'
                            }]
                        })(<Select style={{ width: '180px' }} placeholder="Project name">
                            {repositories.map((item) =>
                                <Option key={item.id} value={item.value}>{item.label}</Option>)}
                        </Select>)}
                    </FormItem>
                </Col>
                {/* branch */}
                <Col span={5}>
                    < FormItem  >
                        {getFieldDecorator(`branch${k}`, {
                            rules: [{ required: true, message: 'Branch is required.' }]
                        })(<Select style={{ width: '180px' }} placeholder="Branch name">
                            <Option value="master">master</Option>
                            <Option value="master-hx">master-hx</Option>
                            <Option value="develop">develop</Option>
                            <Option value="develop-hx">develop-hx</Option>
                            <Option value="staging">staging</Option>
                        </Select>)}
                    </FormItem>
                </Col>
                {/* tag  */}
                <Col span={5}>
                    < FormItem  >
                        {getFieldDecorator(`tag${k}`, {
                            rules: [{ required: true, message: 'Tag name is required.' }]
                        })(<Input style={{ width: '180px' }} placeholder="Tag name."></Input>)}
                    </FormItem>
                </Col>
                {/* tag message  */}
                <Col span={5}>
                    <FormItem >
                        {getFieldDecorator(`msg${k}`, {
                            rules: [{ required: true, message: 'Tag message is required.' }]
                        })(<Input style={{ width: '180px' }} placeholder="Tag message."></Input>)}
                    </FormItem>
                </Col>
                {
                    keys.length > 1 ? (
                        <FormItem>
                            <Button type="danger" onClick={() => this.remove(k)}>Delete<Icon type="minus-circle" /></Button>
                        </FormItem>
                    ) : null
                }
            </Card>
        ))
        return (
            <PageHeaderWrapper title="Action: make tags batching" content="">
                <Spin spinning={loading} tip="Please wait, creating tags...">
                    <Card style={{ textAlign: 'center' }} bordered={false}>
                        <Button onClick={this.add} type="primary" size="default">
                            Add a new Tag<Icon type="plus-circle" />
                        </Button>
                    </Card>

                    <Card>
                        <Form layout="inline" onSubmit={this.handleSubmit}>
                            {cardItems}
                            {
                                keys.length > 0 ? (
                                    <Card style={{ textAlign: 'center' }} bordered={false}>
                                        <Button htmlType="submit" type="primary" size="default">
                                            <Icon type="check-circle" />Submit batch tags
                                    </Button>
                                    </Card>
                                ) : null
                            }
                        </Form>
                    </Card>
                </Spin>
            </PageHeaderWrapper>
        )
    }
}

// connect里的所有属性在UI层可以使用 this.props.xxx来使用.
const _batchTag = connect()(BatchTag)

export default _batchTag