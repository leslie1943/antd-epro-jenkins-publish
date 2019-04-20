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
    branch_repository: 'Repository name:',
};
@Form.create()
class Projects extends Component {
    constructor(props) {
        super(props)
        this.state = { eproProject: [], loading: false }
    }

    listEproProjects = () => {
        this.setState({ loading: true })
        // 执行查询
        this.props.dispatch({
            type: 'publish/listEproProjects',
            callback: (res) => {
                console.info(res)
                this.setState({ eproProject: res, loading: false })
            }
        });
    }

    // 渲染页面
    render() {
        const { eproProject, loading } = this.state;
        const columns = [
            {
                title: 'id',
                dataIndex: 'id',
                key: 'id',
                width: '10%'
            },
            {
                title: 'name',
                dataIndex: 'name',
                key: 'name',
                width: '10%'
            },
            {
                title: 'description',
                dataIndex: 'description',
                key: 'description',
                width: '10%'
            },
            {
                title: 'web_url',
                dataIndex: 'web_url',
                key: 'web_url',
                width: '20%'
            },
            {
                title: 'default_branch',
                dataIndex: 'default_branch',
                key: 'default_branch',
                width: '10%'
            },
            {
                title: 'last_activity_at',
                dataIndex: 'last_activity_at',
                key: 'last_activity_at',
                width: '10%',
                render: (text, record) => {
                    return moment(record.last_activity_at).format("YYYY-MM-DD HH:mm:ss");
                }
            }

        ]
        return (
            <PageHeaderWrapper title="projects " content="projects">
                <Card bordered={false}>
                    <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                        <Button icon="project" type="primary" size="large" onClick={this.listEproProjects}>Get epro projects</Button>
                    </div>
                    <Spin spinning={loading} tip="Loading epro projects">
                        <Table scroll={{ y: 500 }} pagination={{ pageSize: 30 }} rowKey="id" columns={columns} dataSource={eproProject ? eproProject : []} />
                    </Spin>
                </Card>

            </PageHeaderWrapper >
        )
    }
}

// connect里的所有属性在UI层可以使用 this.props.xxx来使用.
const _projects = connect()(Projects)

export default _projects