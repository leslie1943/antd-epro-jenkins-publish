import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Form, Table, Divider, Card, Skeleton, Select, Input, Modal, Row, Col, Button, Spin, message } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { getRepository } from '../../utils/gitMap';
import contributors from '../../../private/contributors';


import { Bar } from '@/components/Charts';

const repositories = getRepository();
import layout from "@/utils/layout";

const { Option } = Select;
const FormItem = Form.Item;

const fieldLabels = {
    branch_repository: 'Repository name:',
};
@Form.create()
class Contributors extends Component {
    constructor(props) {
        super(props)
        this.state = { people: [], loading: false, chartData: [] }
    }

    listContributors = () => {
        // e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({ loading: true })
                let payload = {
                    id: values.project
                }
                this.props.dispatch({
                    type: 'publish/listContributors',
                    payload: payload,
                    callback: (res) => {

                        console.table(res)
                        let t = []
                        for (let i = 0; i < res.length; i += 1) {
                            if (res[i].email in contributors) {
                                t.push({
                                    x: contributors[res[i].email],
                                    // x: res[i].email,
                                    y: res[i].commits
                                });
                            }
                        }
                        this.setState({ people: res, loading: false, chartData: t })
                    }
                });
            }
        })

    }

    // 渲染页面
    render() {
        const { people, loading, chartData } = this.state;
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const columns = [

            {
                title: 'name',
                dataIndex: 'name',
                key: 'name',
                // width: '10%'
            },
            {
                title: 'email',
                dataIndex: 'email',
                key: 'email',
                // width: '10%'
            },
            {
                title: 'commits',
                dataIndex: 'commits',
                key: 'commits',
                // width: '20%'
            },
            // {
            //     title: 'additions',
            //     dataIndex: 'additions',
            //     key: 'additions',
            //     width: '10%'
            // },
            // {
            //     title: 'deletions',
            //     dataIndex: 'deletions',
            //     key: 'deletions',
            //     width: '10%',
            // }

        ]
        return (
            <PageHeaderWrapper title="projects" content="projects">
                <Card bordered={false}>
                    <Form onSubmit={this.listContributors}>
                        <Row >
                            <Col offset={8} span={4}>
                                <FormItem >
                                    {getFieldDecorator(`project`, {
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
                            <Col span={4}>
                                <FormItem >
                                    <Button icon="check" type="primary" size="default" onClick={this.listContributors}>Get</Button>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                    <div style={{ height: '300px' }}>
                        <Skeleton loading={loading || chartData.length == 0} active>
                            <Bar
                                id="app.analysis.sales-trend"
                                defaultMessage="Sales Trend"
                                data={chartData}
                            />
                        </Skeleton>
                    </div>
                    {/* <Spin spinning={loading} tip="Loading epro projects">
                        <Table scroll={{ y: 500 }} pagination={{ pageSize: 30 }} rowKey="email" columns={columns} dataSource={people ? people : []} />
                    </Spin> */}
                </Card>

            </PageHeaderWrapper >
        )
    }
}

// connect里的所有属性在UI层可以使用 this.props.xxx来使用.
const _contributors = connect()(Contributors)

export default _contributors