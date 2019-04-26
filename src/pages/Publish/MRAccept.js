import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Form, Card, Input, Spin, List, Select, Table, Button, message, Modal } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import layout from "@/utils/layout";
import { getRepository } from '@/utils/gitMap';
const repos = getRepository();

const { Option } = Select;
const FormItem = Form.Item;
const { TextArea } = Input;

@Form.create()
class MRAccept extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mergeList: [],
            loading: false,
            selectedRowKeys: [],
            selectedRows: []
        }
    }

    // 接收一个merge request
    // id: project_id
    acceptOne = (record) => {
        const { dispatch } = this.props;
        Modal.confirm({
            title: '提交merge request',
            content: '请确认你的操作?',
            okText: '确定',
            cancelText: '取消',
            onOk: () => dispatch({
                type: 'publish/acceptOne',
                payload: { id: record.id, iid: record.iid },
            })
        })
    }

    // 接收全部选中的
    acceptSelect = () => {
        const { selectedRows } = this.state
        const { dispatch } = this.props;
        Modal.confirm({
            title: 'Accept selected merge request?',
            content: 'Are you sure?',
            okText: 'Yes',
            cancelText: 'No',
            onOk: () => dispatch({
                type: 'publish/acceptSelect',
                payload: selectedRows,
                callback: (res) => {
                    if (res) {
                        message.success('Merged all selected items')
                    } else {
                        message.error('Error occurs during merge process.')
                    }
                }
            })
        })
    }

    // 查询所有open merge request
    searchOpen = () => {
        this.setState({ loading: true })
        this.props.dispatch({
            type: 'publish/searchOpenMR',
            callback: res => {
                this.setState({
                    mergeList: res,
                    loading: false
                })
            }
        });
    }

    render() {
        const { form: { getFieldDecorator, getFieldValue } } = this.props;
        const mergeList = this.state.mergeList
        const loading = this.state.loading
        const selectedRows = this.state.selectedRows

        const rowSelection = {
            columnWidth: '10px',
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    selectedRowKeys,
                    selectedRows
                })
            },
            // 执行完删除,重置 rowSelectRowKeys
            // 如果没有下面代码,删除之后不会清空上次选择的数据
            selectedRowKeys: this.state.selectedRowKeys
        };

        // 列数据...
        const columns = [
            {
                title: 'Repository',
                dataIndex: 'project_id',
                key: 'project_id',
                width: 200,
                render: (text, record) => {
                    return (repos.find(item => {
                        return item.id == record.project_id
                    }).name)
                }
            },
            // {
            //     title: 'ID',
            //     dataIndex: 'id',
            //     key: 'id',
            // },
            {
                title: 'Title',
                dataIndex: 'title',
                key: 'title',
                width: 200,
            },
            // {
            //     title: 'Source branch',
            //     dataIndex: 'source_branch',
            //     key: 'source_branch'
            // },
            {
                title: 'Target branch',
                dataIndex: 'target_branch',
                key: 'target_branch'
            },
            {
                title: 'Author',
                render: (text, record) => {
                    return record.author.username
                }
            },
            {
                title: 'Creation date',
                render: (text, record) => {
                    return moment(record.created_at).format("YYYY-MM-DD HH:mm:ss");
                }
            },
            {
                title: 'Status',
                render: (text, record) => {
                    return record.state;
                }
            },
            {
                title: 'Action',
                render: (text, record) => {
                    return (<span >
                        <a href="javascript:;" style={{ color: 'red' }} onClick={() => this.acceptOne(record)}>Accept</a>
                    </span>)
                }
            },
        ];

        return (
            <PageHeaderWrapper title="Accept merge request" content="">
                <Card bordered={false}>
                    <Form style={{ marginTop: 8 }}>
                        <FormItem {...layout.submitFormLayout} style={{ marginTop: 10 }}>
                            <Button style={{ marginLeft: '10px' }} type="primary" onClick={this.searchOpen}>Get all open merge requests</Button>
                        </FormItem>
                        <Spin spinning={loading} tip="Loading...">
                            <Table rowSelection={rowSelection} rowKey="id" size='small' pagination={{ pageSize: 50 }} columns={columns} dataSource={mergeList ? mergeList : []} />
                        </Spin>
                        {/* 接收全部Merge request */}
                        <FormItem {...layout.submitFormLayout} style={{ marginTop: 10 }}>
                            <Button disabled={selectedRows.length == 0} type="primary" onClick={this.acceptSelect}>Accept selected items</Button>
                        </FormItem>
                    </Form>
                </Card>
            </PageHeaderWrapper>
        )
    }
}
const _mrAccept = connect()(MRAccept)
export default _mrAccept