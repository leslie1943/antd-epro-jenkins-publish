import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Form, Table, Divider, Card, Skeleton, Select, Input, Modal, Row, Col, Button, Spin, message } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { getRepository } from '../../utils/gitMap';
import contributors from '../../../private/contributors';


const repositories = getRepository();
import layout from "@/utils/layout";

const { Option } = Select;
const FormItem = Form.Item;

const fieldLabels = {
    branch_repository: 'Repository name:',
};
@Form.create()
class Commits extends Component {
    constructor(props) {
        super(props)
        this.state = { loading: false, commits: [] }
    }

    listCommits = (value) => {
        this.setState({ loading: true })
        // console.info(this.props.form.getFieldValue('project')) // also get project id.
        this.props.dispatch({
            type: 'publish/listCommits',
            payload: { id: value },
            callback: (res => {
                this.setState({ loading: false })
                this.setState({ commits: res })
            })
        })
    }

    // 渲染页面
    render() {
        const { loading, commits } = this.state;
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const columns = [
            {
                title: 'short_id',
                dataIndex: 'short_id',
                key: 'short_id',
                width: '10%'
            },
            {
                title: 'title',
                dataIndex: 'title',
                key: 'title',
                width: '30%'
            },
            {
                title: 'author_name',
                dataIndex: 'author_name',
                key: 'author_name',
                width: '10%',
            },
            {
                title: 'committed_date',
                dataIndex: 'committed_date',
                key: 'committed_date',
                width: '18%',
                render: (text, record) => {
                    return moment(record.committed_date).format("YYYY-MM-DD HH:mm:ss")
                },
            },
            {
                title: 'message',
                dataIndex: 'message',
                key: 'message'
            }
        ]
        return (
            <PageHeaderWrapper title="commits" content="commits">
                <Card bordered={false}>
                    <Form>
                        <Row>
                            <Col offset={8} span={4}>
                                <FormItem {...layout.formItemLayout} label="项目名称">
                                    {getFieldDecorator(`project`, {
                                        rules: [{
                                            required: true,
                                            message: 'Repository is required.'
                                        }]
                                    })(<Select style={{ width: '180px' }} placeholder="Project name" onChange={this.listCommits}>
                                        {repositories.map((item) =>
                                            <Option key={item.id} value={item.value}>{item.label}</Option>)}
                                    </Select>)}
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                    {/* <div style={{ height: '300px' }}>
                        <Skeleton loading={loading || commits.length == 0} active>
                            <Bar
                                id="app.analysis.sales-trend"
                                defaultMessage="Sales Trend"
                                data={commits}
                            />
                        </Skeleton>
                    </div> */}
                    <Table loading={loading} pagination={{ pageSize: 50 }} rowKey="id" scroll={{ y: 500 }} columns={columns} dataSource={commits ? commits : []} />

                </Card>
            </PageHeaderWrapper >
        )
    }
}

// connect里的所有属性在UI层可以使用 this.props.xxx来使用.
const _commits = connect()(Commits)

export default _commits