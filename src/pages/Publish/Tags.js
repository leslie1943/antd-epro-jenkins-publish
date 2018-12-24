import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {Form, Table, Divider, Card, Tag, Select, Modal, Button, message} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { getGitMap } from '../../utils/gitMap';
const gitMap = getGitMap();
import layout from "@/utils/layout";

const { Option } = Select;
const FormItem = Form.Item;


@Form.create()
class Tags extends Component{
    constructor(props){
        super(props)
    }
    state={
        test:{},
    }
    createTags = this.createTags.bind(this);

    searchTags(){
        const {dispatch} = this.props;
        dispatch({
            type: 'publish/searchTags',
        });
    }
    createTags(){
        const {dispatch} = this.props;
        dispatch({
            type: 'publish/createTagsAuto',
            payload: this.props.tags
        });
    }
    createDefinedTags(){
        const {dispatch} = this.props;
        Modal.confirm({
            title: 'Create tags for all repositories',
            content: 'Are you sure?',
            okText: 'Confirm',
            cancelText: 'Cancel',
            onOk: () => dispatch({
                type: 'publish/createTagsManually',
            }),
        });
    }

    // newTag(record){
    newTag = (record) => {
        // 【测试 setState】
        // this.setState({test:record},() => {
        //     console.info(this.state);
        // });
        const {dispatch} = this.props;
        dispatch({
            type: 'publish/newTag',
            payload: record
        });
    }

    render(){
        const { form: { getFieldDecorator , getFieldValue}} = this.props;
        // from mapStateToProps
        const tags = this.props.tags;
        
        // 列数据...
        const columns = [
            {
              title: 'Tag repository',
              dataIndex: 'project_id',
              key: 'project_id',
              render: (text, record) => {
                return gitMap[record.project_id]
                }
            },
            {
                title: 'Tag name',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: 'Tag date',
                render: (text, record) => {
                    return moment(record.commit.committed_date).format("YYYY-MM-DD HH:mm:ss");
                }
            },
            {
                title: 'Action',
                key: "action",
                render: (text, record) => {
                    return(
                        <span>
                            <a href="javascript:;" onClick={()=>this.newTag(record)}>Create tag</a>
                        </span>
                    )
                }
            },
        ];

        return(
            <PageHeaderWrapper title="Create repository tags" content="">
                <Card bordered={false}>
                    <Form style={{marginTop: 8}}>
                        <FormItem  style={{ marginTop: 10 }}>
                            <Button icon="tag" type="primary" onClick={() => this.createDefinedTags()}>Create tag for all repositories with defined version</Button>
                        </FormItem>
                        <Divider dashed />

                        <FormItem  style={{ marginTop: 10 }}>
                            <Button icon="search" type="primary" onClick={() => this.searchTags()}>Search tags of all repositories</Button>
                        </FormItem>
                     </Form>
                     <hr></hr>
                     <Table rowKey="key"  columns={columns} dataSource={tags} />
                     <div>
                         {tags && tags.length > 0 ? <Button icon="tags" type="primary" onClick={() => this.createTags()}>Create tags for search result</Button>:''}
                     </div>
                </Card>
                
            </PageHeaderWrapper>
        )
    }
}

function mapStateToProps(state){
    return {
        tags: state.publish.tags
    }
}

// connect里的所有属性在UI层可以使用 this.props.xxx来使用.
const _tags = connect(mapStateToProps)(Tags)

export default _tags