import React, { Component } from 'react';
import { connect } from 'dva';

import { Form, Card, Modal, Button, message, Divider, Tooltip, Select, Input, Spin, Text } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import layout from "@/utils/layout";
const FormItem = Form.Item;
const TextArea = Input.TextArea
const { Option } = Select;

const fixedParams = ' -PvhscTracingVersion=0.1.0-SNAPSHOT -PvhscMetricsVersion=0.1.0-SNAPSHOT -PvhscProtobufVersion=1.0.0 -PsvcTradingVersion=1.0.0-SNAPSHOT  -Papi3VoVersion=2.5.0-SNAPSHOT'

const repository = [
    { value: 104, label: 'epro-user-svc' },
    { value: 103, label: 'epro-certificate-svc' },
    { value: 116, label: 'epro-dmcc-svc' },
    { value: 106, label: 'epro-mall' },
    { value: 173, label: 'epro-gateway' },
    { value: 166, label: 'epro-job' },
    { value: 113, label: 'epro-message' },
    { value: 117, label: 'epro-op' },
    { value: 207, label: 'epro-support' },
    { value: 211, label: 'utility-epro' },
];

/**
 * 🚦所有的React组件必须像纯函数那样使用它们的props🚦
 * // 纯函数
 *  function(a,b){
 *     return a + b;
 * }
*/

// Class epro-user-svc
class UserItem extends Component {
    handleLevelThird = (value) => {
        this.props.handleLevelTwo({ id: 104, label: 'user_svc_tag', value: '-PsvcUserVersion=' + value });
    }
    render() {
        const { form: { getFieldDecorator } } = this.props.param; // props: 约定参数写法,可以去获取父组件里传过来的属性(名字随意)
        return (
            <FormItem {...layout.formItemLayout} label="epro-user-svc tag">{
                getFieldDecorator('user_svc_tag', {
                    initialValue: '',
                    rules: [{ required: true, message: '清选择 epro-user-svc tag' }],
                })(<Select onChange={this.handleLevelThird} placeholder="清选择 epro-user-svc tag" >
                    {this.props.param.user_svc_tags.map(item => <Option key={item.commit.id} value={item.name}>{item.name}</Option>)}
                </Select>)}
            </FormItem>
        )
    }
}

// Class epro-certificate-svc
class CertificateItem extends Component {

    /** 【this.props】
     * handleLevelTwo ： f(value){}
     * param: {form:{}},other:{}
     */
    handleLevelThird = (value) => {
        this.props.handleLevelTwo({ id: 103, label: 'certificate_svc_tag', value: '-PsvcCertificateVersion=' + value });
    }
    render() {
        const { form: { getFieldDecorator } } = this.props.param;
        return (
            <FormItem {...layout.formItemLayout} label="epro-certificate-svc tag">{
                getFieldDecorator('certificate_svc_tag', {
                    initialValue: '',
                    rules: [{ required: true, message: '清选择 epro-certificate-svc tag' }],
                })(<Select onChange={this.handleLevelThird} placeholder="清选择 epro-certificate-svc tag" >
                    {this.props.param.certificate_svc_tags.map(item => <Option key={item.commit.id} value={item.name}>{item.name}</Option>)}
                </Select>)}
            </FormItem>
        )
    }
}

// Class epro-dmcc-svc
class DmccItem extends Component {
    handleLevelThird = (value) => {
        this.props.handleLevelTwo({ id: 116, label: 'dmcc_svc_tag', value: '-PsvcDmccVersion=' + value });
    }
    render() {
        const { form: { getFieldDecorator } } = this.props.param;
        return (
            <FormItem {...layout.formItemLayout} label="epro-dmcc-svc tag">{
                getFieldDecorator('dmcc_svc_tag', {
                    initialValue: '',
                    rules: [{ required: true, message: '清选择 epro-dmcc-svc tag' }],
                })(<Select onChange={this.handleLevelThird} placeholder="清选择 epro-dmcc-svc tag" >
                    {this.props.param.dmcc_svc_tags.map(item => <Option key={item.commit.id} value={item.name}>{item.name}</Option>)}
                </Select>)}
            </FormItem>
        )
    }
}

// Class epro-mall
class MallItem extends Component {
    handleLevelThird = (value) => {
        this.props.handleLevelTwo({ id: 106, label: 'mall_tag', value: value });
    }
    render() {
        const { form: { getFieldDecorator } } = this.props.param;
        return (
            <FormItem {...layout.formItemLayout} label="epro-mall tag">{
                getFieldDecorator('mall_tag', {
                    initialValue: '',
                    rules: [{ required: true, message: '清选择 epro-mall tag' }],
                })(<Select onChange={this.handleLevelThird} placeholder="清选择 epro-mall tag" >
                    {this.props.param.mall_tags.map(item => <Option key={item.commit.id} value={item.name}>{item.name}</Option>)}
                </Select>)}
            </FormItem>
        )
    }
}

// Class epro-gateway
class GatewayItem extends Component {
    handleLevelThird = (value) => {
        this.props.handleLevelTwo({ id: 173, label: 'gateway_tag', value: value });
    }
    render() {
        const { form: { getFieldDecorator } } = this.props.param;
        return (
            <FormItem {...layout.formItemLayout} label="epro-gateway tag">{
                getFieldDecorator('gateway_tag', {
                    initialValue: '',
                    rules: [{ required: true, message: '清选择 epro-gateway tag' }],
                })(<Select onChange={this.handleLevelThird} placeholder="清选择 epro-gateway tag" >
                    {this.props.param.gateway_tags.map(item => <Option key={item.commit.id} value={item.name}>{item.name}</Option>)}
                </Select>)}
            </FormItem>
        )
    }
}

// Class epro-job
class JobItem extends Component {
    handleLevelThird = (value) => {
        this.props.handleLevelTwo({ id: 166, label: 'job_tag', value: value });
    }
    render() {
        const { form: { getFieldDecorator } } = this.props.param;
        return (
            <FormItem {...layout.formItemLayout} label="epro-job tag">{
                getFieldDecorator('job_tag', {
                    initialValue: '',
                    rules: [{ required: true, message: '清选择 epro-job tag' }],
                })(<Select onChange={this.handleLevelThird} placeholder="清选择 epro-job tag" >
                    {this.props.param.job_tags.map(item => <Option key={item.commit.id} value={item.name}>{item.name}</Option>)}
                </Select>)}
            </FormItem>
        )
    }
}

// Class epro-message
class MessageItem extends Component {
    handleLevelThird = (value) => {
        this.props.handleLevelTwo({ id: 113, label: 'message_tag', value: '-PeproMessageVersion=' + value });
    }
    render() {
        const { form: { getFieldDecorator } } = this.props.param;
        return (
            <FormItem {...layout.formItemLayout} label="epro-message tag">{
                getFieldDecorator('message_tag', {
                    initialValue: '',
                    rules: [{ required: true, message: '清选择 epro-message tag' }],
                })(<Select onChange={this.handleLevelThird} placeholder="清选择 epro-message tag" >
                    {this.props.param.message_tags.map(item => <Option key={item.commit.id} value={item.name}>{item.name}</Option>)}
                </Select>)}
            </FormItem>
        )
    }
}

// Class epro-op
class OpItem extends Component {
    handleLevelThird = (value) => {
        this.props.handleLevelTwo({ id: 117, label: 'op_tag', value: value });
    }
    render() {
        const { form: { getFieldDecorator } } = this.props.param;
        return (
            <FormItem {...layout.formItemLayout} label="epro-op tag">{
                getFieldDecorator('op_tag', {
                    initialValue: '',
                    rules: [{ required: true, message: '清选择 epro-op tag' }],
                })(<Select onChange={this.handleLevelThird} placeholder="清选择 epro-op tag" >
                    {this.props.param.op_tags.map(item => <Option key={item.commit.id} value={item.name}>{item.name}</Option>)}
                </Select>)}
            </FormItem>
        )
    }
}

// Class epro-support
class SupportItem extends Component {
    handleLevelThird = (value) => {
        this.props.handleLevelTwo({ id: 207, label: 'support_tag', value: '-PeproSupportVersion=' + value });
    }
    render() {
        const { form: { getFieldDecorator } } = this.props.param;
        return (
            <FormItem {...layout.formItemLayout} label="epro-support tag">{
                getFieldDecorator('support_tag', {
                    initialValue: '',
                    rules: [{ required: true, message: '清选择 epro-support tag' }],
                })(<Select onChange={this.handleLevelThird} placeholder="清选择 epro-support tag" >
                    {this.props.param.support_tags.map(item => <Option key={item.commit.id} value={item.name}>{item.name}</Option>)}
                </Select>)}
            </FormItem>
        )
    }
}

// Class epro-utility
class UtilityItem extends Component {
    handleLevelThird = (value) => {
        this.props.handleLevelTwo({ id: 211, label: 'utility_tag', value: '-PvcUtilityVersion=' + value + '-SNAPSHOT' });
    }
    render() {
        const { form: { getFieldDecorator } } = this.props.param;
        return (
            <FormItem {...layout.formItemLayout} label="epro-utility tag">{
                getFieldDecorator('utility_tag', {
                    initialValue: '',
                    rules: [{ required: true, message: '清选择 epro-utility tag' }],
                })(<Select onChange={this.handleLevelThird} placeholder="清选择 epro-utility tag" >
                    {this.props.param.utility_tags.map(item => <Option key={item.commit.id} value={item.name}>{item.name}</Option>)}
                </Select>)}
            </FormItem>
        )
    }
}

class DependencyItem extends Component {
    // 构造函数可以不写,具体可参照 Skill-Learn-Point.md => constructor
    // constructor() {
    // super(props)
    // }

    handleLevelTwo = (value) => {
        this.props.handleLevelOne(value);
    }

    render() {
        /**
         * 在这个class之前定义了全部的单体依赖class(以function形式)
         * 根据不同项目的依赖项,组合成不同的界面, 然后把结果嵌入在 return 结果内.
         * 
         * 😎😎😎 具有复杂逻辑的组件,可以在return之前先处理, 然后把处理结果以变量的形式嵌入在结果中.
         * {complexLogicComponent}
         */
        // console.info(this.props);
        let dynamicItems = null;
        switch (this.props.id) {
            // epro-user-svc
            case "104":
                dynamicItems = (<div>
                    <SupportItem handleLevelTwo={this.handleLevelTwo} param={this.props.param}></SupportItem>
                    <MessageItem handleLevelTwo={this.handleLevelTwo} param={this.props.param}></MessageItem>
                </div>)
                break;
            // epro-certificate-svc, 🔵🔵{param: this.props.param} 作为 props 传递给子组件🔵🔵
            case "103":
                dynamicItems = (<div>
                    <MessageItem handleLevelTwo={this.handleLevelTwo} param={this.props.param}></MessageItem>
                    <SupportItem handleLevelTwo={this.handleLevelTwo} param={this.props.param}></SupportItem>
                </div>)
                break;
            // epro-dmcc-svc
            case "116":
                dynamicItems = (<div>
                    <SupportItem handleLevelTwo={this.handleLevelTwo} param={this.props.param}></SupportItem>
                    <MessageItem handleLevelTwo={this.handleLevelTwo} param={this.props.param}></MessageItem>
                </div>)
                break;
            // epro-mall
            case "106":
                dynamicItems = (<div>
                    <UserItem handleLevelTwo={this.handleLevelTwo} param={this.props.param}></UserItem>
                    <CertificateItem handleLevelTwo={this.handleLevelTwo} param={this.props.param}></CertificateItem>
                    <DmccItem handleLevelTwo={this.handleLevelTwo} param={this.props.param}></DmccItem>
                    <UtilityItem handleLevelTwo={this.handleLevelTwo} param={this.props.param}></UtilityItem>
                    <MessageItem handleLevelTwo={this.handleLevelTwo} param={this.props.param}></MessageItem>
                    <SupportItem handleLevelTwo={this.handleLevelTwo} param={this.props.param}></SupportItem>
                </div>)
                break;
            // epro-gateway
            case "173":
                dynamicItems = (<div>
                    <DmccItem handleLevelTwo={this.handleLevelTwo} param={this.props.param}></DmccItem>
                    <SupportItem handleLevelTwo={this.handleLevelTwo} param={this.props.param}></SupportItem>
                    <UserItem handleLevelTwo={this.handleLevelTwo} param={this.props.param}></UserItem>
                    <CertificateItem handleLevelTwo={this.handleLevelTwo} param={this.props.param}></CertificateItem>
                    <MessageItem handleLevelTwo={this.handleLevelTwo} param={this.props.param}></MessageItem>
                    <UtilityItem handleLevelTwo={this.handleLevelTwo} param={this.props.param}></UtilityItem>
                </div>)
                break;
            // epro-job
            case "166":
                dynamicItems = (<div>
                    <UtilityItem handleLevelTwo={this.handleLevelTwo} param={this.props.param}></UtilityItem>
                    <UserItem handleLevelTwo={this.handleLevelTwo} param={this.props.param}></UserItem>
                    <CertificateItem handleLevelTwo={this.handleLevelTwo} param={this.props.param}></CertificateItem>
                    <DmccItem handleLevelTwo={this.handleLevelTwo} param={this.props.param}></DmccItem>
                    <SupportItem handleLevelTwo={this.handleLevelTwo} param={this.props.param}></SupportItem>
                    <MessageItem handleLevelTwo={this.handleLevelTwo} param={this.props.param}></MessageItem>
                </div>)
                break;
            // epro-message
            case "113":
                dynamicItems = <SupportItem handleLevelTwo={this.handleLevelTwo} param={this.props.param}></SupportItem>
                break;
            // epro-op
            case "117":
                dynamicItems = (<div>
                    <UserItem handleLevelTwo={this.handleLevelTwo} param={this.props.param}></UserItem>
                    <CertificateItem handleLevelTwo={this.handleLevelTwo} param={this.props.param}></CertificateItem>
                    <DmccItem handleLevelTwo={this.handleLevelTwo} param={this.props.param}></DmccItem>
                    <SupportItem handleLevelTwo={this.handleLevelTwo} param={this.props.param}></SupportItem>
                </div>)
                break;
            // epro-support
            case "207":
                dynamicItems = (<div></div>);
                break;
            // epro-utility
            case "211":
                dynamicItems = <SupportItem handleLevelTwo={this.handleLevelTwo} param={this.props.param}></SupportItem>
                break;
        }
        return (
            <div>
                {/* 动态加载不同项目的依赖项 */}
                {dynamicItems}
            </div>
        )
    }
}

@Form.create()
class Job extends Component {
    constructor(props) {
        super(props)
        this.state = { id: '', desc_params: [] }
    }
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'jenkins/init_dependency'
        })
    }

    buildMallWithParam() {
        const { form: { getFieldDecorator, validateFields, getFieldValue }, dispatch } = this.props;
        // TODO: need a validate mapping:
        validateFields(['support_tag', 'message_tag', 'build_project'], (error, values) => {
            // console.info(values);
            if (!error) {
                Modal.confirm({
                    title: '构建 Mall 项目',
                    content: '请确认你的操作?',
                    okText: '确定',
                    cancelText: '取消',
                    onOk: () => dispatch({
                        type: 'jenkins/buildDeploy',
                        payload: values,
                    })
                })
            }
        })
    }

    // 在 constructor 定义的 state,可以在class内的方法操作, 操作后的结果可以在render内进行使用.
    projectChange = (value) => {
        this.setState({ id: value });
        this.props.form.setFieldsValue({
            build_params: (repository.find(item => item.value === value)).label
        });
    }

    handleLevelOne = (value) => {
        let desc_params = this.state.desc_params;
        // 先过滤再更新结果
        desc_params = desc_params.filter(item => item.id != value.id)
        // update
        desc_params.push(value)
        this.setState({
            desc_params: desc_params
        }, () => {
            console.info(this.state.desc_params)
            let params = ''
            for (let i = 0; i < this.state.desc_params.length; i++) {
                let item = (this.state.desc_params)[i]
                // params += item.id + '-' + item.label + '-' + item.value + '#'
                params += item.value + ' '
            }

            this.props.form.setFieldsValue({
                // build_params: (repository.find(item => item.value === this.state.id)).label + ',' + params
                build_params: params + fixedParams
            });
        })
    }

    render() {
        const { form: { getFieldDecorator, getFieldValue } } = this.props;
        const mall_json = this.props.mall_json;
        const initLoading = this.props.initLoading;
        const id = this.state.id + '';
        return (
            <PageHeaderWrapper title="Jenkins jobs" content="">
                <Card bordered={false}>
                    <Spin spinning={initLoading} tip="Initialize...">
                        <Form style={{ marginTop: 8 }}>
                            <FormItem  {...layout.formItemLayout} label="Build项目">{
                                getFieldDecorator('build_project', {
                                    initialValue: '',
                                    rules: [{ required: true, message: '请选择Build项目' }],
                                })(<Select placeholder="全部项目" onChange={this.projectChange}>
                                    {repository.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>)}
                                </Select>)
                            }</FormItem>

                            <DependencyItem handleLevelOne={this.handleLevelOne} param={this.props} id={id} ></DependencyItem>

                            <FormItem  {...layout.formItemLayout} label="构建参数">{
                                getFieldDecorator('build_params', {
                                    initialValue: '',
                                    rules: [{ required: true, message: '请输入构建参数' }],
                                })(<TextArea disabled rows={6}></TextArea>)
                            }</FormItem>

                            {/* <DynamicItems id={this.state.id}></DynamicItems> */}
                            <FormItem style={{ textAlign: 'center' }}>
                                <Button type="primary" icon="build" onClick={() => this.buildMallWithParam()}>Build with Parameters</Button>
                            </FormItem>
                        </Form>
                    </Spin>
                </Card>
            </PageHeaderWrapper>
        )
    }
}

function mapStateToProps(state) {
    return {
        // project json.
        mall_json: state.jenkins.mall_json,
        // all tags
        initLoading: state.jenkins.initLoading,
        user_svc_tags: state.jenkins.user_svc_tags,
        certificate_svc_tags: state.jenkins.certificate_svc_tags,
        dmcc_svc_tags: state.jenkins.dmcc_svc_tags,
        mall_tags: state.jenkins.mall_tags,
        gateway_tags: state.jenkins.gateway_tags,
        job_tags: state.jenkins.job_tags,
        message_tags: state.jenkins.message_tags,
        op_tags: state.jenkins.op_tags,
        support_tags: state.jenkins.support_tags,
        utility_tags: state.jenkins.utility_tags,
    }
}

// connect里的所有属性在UI层可以使用 this.props.xxx来使用.
const _job = connect(mapStateToProps)(Job)

export default _job