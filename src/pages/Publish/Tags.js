import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {Form, Table,Divider,Card, Tag, Select, Button,message,Row,Col,List} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { getGitMap, getGitToken,getRepository } from '../../utils/gitMap';
const gitMap = getGitMap();


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
            type: 'publish/createTags',
            payload: this.props.tags
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

        const submitFormLayout = {
            wrapperCol: {
              xs: { span: 24, offset: 0 },
              sm: { span: 10, offset: 7 },
            },
          };
        
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
            <PageHeaderWrapper title="Epro project tags" content="">
                <Card bordered={false}>
               
                    <Form style={{marginTop: 8}}>
                        <FormItem  style={{ marginTop: 10 }}>
                            <Button icon="search" type="primary" onClick={() => this.searchTags()}>Get tags of all repositories</Button>
                        </FormItem>
                     </Form>
                     <hr></hr>
                     <Table rowKey="key"  columns={columns} dataSource={tags} />
                     <div>
                         {tags.length > 0 ? <Button icon="tags" type="primary" onClick={() => this.createTags()}>Create tags for these repositories</Button>:''}
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