/* eslint-disable */
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
};
@Form.create()
class ActionTag extends Component {
    constructor(props) {
        super(props)
        this.state = {
            repository_id: '',
            selectedRowKeys: [],
            loading: false,
            tagList: []
        }
    }

    deleteTag = (record) => {
        Modal.confirm({
            title: `删除当前tag`,
            content: '请确认你的操作?',
            okText: '确定',
            cancelText: '取消',
            onOk: () => this.props.dispatch({
                type: 'publish/deleteTag',
                payload: record,
                rep_id: this.state.repository_id,
                callback: (response) => {
                    message.success('删除成功!')
                }
            })
        })
    }
    deleteTags = () => {
        console.info('deleteTags')
        const tags = this.state.selectedRowKeys
        const rep_id = this.state.repository_id
        if (tags.length === 0) {
            message.error('至少选择一个要删除的tag')
        } else {
            Modal.confirm({
                title: `删除当前tag`,
                content: '请确认你的操作?',
                okText: '确定',
                cancelText: '取消',
                onOk: () => this.props.dispatch({
                    type: 'publish/deleteTags',
                    payload: tags,
                    rep_id: rep_id,
                    callback: (response) => {
                        message.success('删除成功!')
                        this.setState({
                            selectedRowKeys: [],
                            repository_id: rep_id
                        })
                    }
                })
            })
        }
    }

    // 查询选中仓库的tags
    onProjectChange = (value) => {
        // 执行查询

        this.setState({ repository_id: value, loading: true })
        this.props.dispatch({
            type: 'publish/searchProjectTags',
            payload: value,
            callback: (res) => {
                this.setState({
                    loading: false,
                    tagList: res
                })
            }
        });
    }

    // 渲染页面
    render() {
        // table columns
        const columns = [
            {
                title: 'Tag name',
                dataIndex: 'name',
                key: 'name',
                width: '20%',
            },
            {
                title: 'Message',
                dataIndex: 'message',
                key: 'message',
                width: '20%',
            },
            {
                title: 'Committed date',
                dataIndex: 'committed_date',
                key: 'committed_date',
                render: (text, record) => {
                    return moment(record.commit.committed_date).format("YYYY-MM-DD HH:mm:ss");
                },
                width: '20%',
            },
            {
                title: 'Committed message',
                dataIndex: 'commit.message',
                key: 'commit.message',
                width: '30%',
                render: (text, record) => {
                    return record.commit.message
                },
            },
            {
                title: 'Action',
                render: (text, record) => (
                    <span>
                        <Button type="danger" onClick={() => this.deleteTag(record)}>Delete</Button>
                    </span>
                ),
                width: '10%',

            }
        ]
        const rowSelection = {
            columnWidth: '10px',
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    selectedRowKeys
                })
            },
            // 执行完删除,重置 rowSelectRowKeys
            // 如果没有下面代码,删除之后不会清空上次选择的数据
            selectedRowKeys: this.state.selectedRowKeys
        };
        const { form: { getFieldDecorator, getFieldValue } } = this.props;
        // from mapStateToProps
        const loading = this.state.loading;
        const tagList = this.state.tagList;
        return (
            <PageHeaderWrapper title="Action: query/delete tag" content="">
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
                        </Form>
                        {/* 结果列表 */}
                        <Table rowSelection={rowSelection} pagination={{ pageSize: 50 }} rowKey="name" scroll={{ y: 500 }} columns={columns} dataSource={tagList ? tagList : []} />
                        <div style={{ textAlign: 'center', marginTop: '10px' }}><Button type="primary" onClick={this.deleteTags}>删除选中tags</Button></div>
                    </Spin>
                </Card>

            </PageHeaderWrapper>
        )
    }
}

// connect里的所有属性在UI层可以使用 this.props.xxx来使用.
const _actionTag = connect()(ActionTag)

export default _actionTag