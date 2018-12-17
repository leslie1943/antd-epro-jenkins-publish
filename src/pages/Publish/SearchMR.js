import React, { Component } from 'react';
import styles from './BasicPublish.css';
import moment from 'moment';
import { connect } from 'dva';
import {Form, Card,  List, Select, Table,Button,message,Row,Col} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const { Option } = Select;
const FormItem = Form.Item;


const fieldLabels = {
    repository: "Repository name",
  };

const types = [
    { id: 106, desc: 'epro-mall' },
    { id: 116, desc: 'epro-dmcc-svc' },
    { id: 104, desc: 'epro-user-svc' },
    { id: 103, desc: 'epro-certificate-svc' },
    { id: 173, desc: 'epro-gateway' },
    { id: 166, desc: 'epro-job' },
    { id: 207, desc: 'epro-flyway' },
    { id: 113, desc: 'epro-message' },
    { id: 211, desc: 'utility-epro' },
    { id: 107, desc: 'epro-mall-web' },
];

@Form.create()
class SearchMR extends Component{
    constructor(props){
        super(props)
    }

    search = () => {
        const {form: { validateFields,getFieldValue}, dispatch} = this.props;
        validateFields(['repository'],(error, values) => {
            // 🎃🎃🎃KEEP DESC🎃🎃🎃 [getFieldValue('fieldName')]
            // 🎃🎃🎃KEEP DESC🎃🎃🎃 validateFieldsAndScroll: 校验所有当前页面所有的字段
            // 🎃🎃🎃KEEP DESC🎃🎃🎃 validateFields: 校验指定的Fields
            // 🎃🎃🎃KEEP DESC🎃🎃🎃 validateFieldsAndScroll((error, values) => {
          if (!error) {
            let project_id = getFieldValue('repository');
            dispatch({
                type: 'publish/searchMR',
                // payload: project_id,
                payload: values, // 👌👌👌 payload 可以是其他命名,但要和model里的参数名保持一致👌👌👌
            });
          }
        });
    };

    componentDidMount(){}
    
    render(){
        const { form: { getFieldDecorator , getFieldValue}} = this.props;
        // from mapStateToProps
        const mrList  = this.props.mrList

         // 列数据...
         const columns = [
            {
              title: 'ID',
              dataIndex: 'id',
              key: 'id',
            },
            {
                title: 'Title',
                dataIndex: 'title',
                key: 'title'
            },
            // {
            //     title: 'Merge status',
            //     dataIndex: 'merge_status',
            //     key: 'merge_status'
            // },
            {
                title: 'Source branch',
                dataIndex: 'source_branch',
                key: 'source_branch'
            },
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

        ];

        // Item 布局
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 7 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 12 },
              md: { span: 10 },
            },
          };

          // 提交布局
          const submitFormLayout = {
            wrapperCol: {
              xs: { span: 24, offset: 0 },
              sm: { span: 10, offset: 7 },
            },
          };
        return(
            <PageHeaderWrapper title="Query merge request" content="">
                <Card bordered={false}>
                    <Form style={{marginTop: 8}}>
                        {/* ---------------- 选择类型  ---------------- */}
                        <FormItem {...formItemLayout} label={fieldLabels.repository}>{
                            getFieldDecorator('repository',{
                                rules:[{required:true,message:'请选择Repository'}]
                            })(<Select placeholder="全部项目" >
                            {types.map(item => <Option key={item.id} value={item.id}>{item.desc}</Option>)}
                        </Select>)
                        }</FormItem>

                        {/*  */}
                        <FormItem {...submitFormLayout} style={{ marginTop: 10 }}>
                            <Button type="primary" onClick={()=>this.search()}>查询 merge request</Button>      
                         </FormItem>
                     </Form>

                     <Table rowKey="id" size='small' columns={columns} dataSource={mrList?mrList:[]} />
                </Card>
            </PageHeaderWrapper>
        )
    }
}

function mapStateToProps(state){
    return {
        mrList: state.publish.mrList
    }
}

// connect里的所有属性在UI层可以使用 this.props.xxx来使用.
const _searchMR = connect(mapStateToProps)(SearchMR)

export default _searchMR