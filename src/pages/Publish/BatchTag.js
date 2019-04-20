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

let id = 1;
const colorType = ["#409eff", "#67c23a", "#909399", "#e6a23c", "#f56c6c"]

@Form.create()
class BatchTag extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    add = (item) => {
        const { form } = this.props
        const keys = form.getFieldValue('keys')
        console.info('keys', keys)
        // let idx = id - 1
        // let t = 'repos' + '' + (keys.length - 1) + ''

        // setTimeout(() => {
        let field = `repos${keys.length - 1}`
        console.info(field)
        form.setFieldsValue({ 'repos0': item.name })
        // }, 1000)

        const nextKeys = keys.concat(id++)
        form.setFieldsValue({ keys: nextKeys })

    }

    // to do with object  initialValue: []

    // 渲染页面
    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        getFieldDecorator('keys', { initialValue: [] })
        const keys = getFieldValue('keys')
        const cardItems = keys.map((k, index) => (
            <Card key={index} >
                {/* 项目名称 */}
                <FormItem label="Repository name:">
                    {
                        getFieldDecorator(`repos${k}`, {
                            rules: [{
                                required: true,
                                message: 'Repository is required.'
                            }]
                        })(<Input placeholder="Repository name."></Input>)
                    }
                    {k}
                </FormItem>
                {/* tag  */}
                <FormItem label="Tag name:">
                    {
                        getFieldDecorator(`tag${k}`, {
                            rules: [{
                                required: true,
                                message: 'Tag name is required.'
                            }]
                        })(<Input placeholder="Tag name."></Input>)
                    }
                </FormItem>
                {/* tag message  */}
                <FormItem label="Tag message:">
                    {
                        getFieldDecorator(`msg${k}`, {
                            rules: [{
                                required: true,
                                message: 'Tag message is required.'
                            }]
                        })(<Input placeholder="Tag message."></Input>)
                    }
                </FormItem>
                {
                    keys.length > 1 ? (
                        <FormItem>
                            <Button type="danger">Delete</Button>
                        </FormItem>
                    ) : null
                }
            </Card>
        ))
        return (
            <PageHeaderWrapper title="Action: make tags batching" content="">
                <Card bordered={false}>
                    <Row>
                        {repositories.map((item) =>
                            <Col style={{ padding: '5px' }} key={item.value} span="4">
                                {/* < backgroundColor: colorType[Math.floor(Math.random() * 5)] }} */}
                                <Button onClick={() => this.add(item)} style={{ fontSize: '12px', width: '160px', textAlign: 'left' }} size="default" > {item.name} <Icon type="plus" /></Button>
                            </Col>)}
                    </Row>
                </Card>
                <Card>
                    <Form layout="inline">
                        {cardItems}
                    </Form>
                </Card>
            </PageHeaderWrapper>
        )
    }
}

// connect里的所有属性在UI层可以使用 this.props.xxx来使用.
const _batchTag = connect()(BatchTag)

export default _batchTag