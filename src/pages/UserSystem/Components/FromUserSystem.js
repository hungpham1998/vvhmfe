import {
    Col, Form,
    Input,
    Modal, notification, Row, Switch
} from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addUserSystem, updateUserSystem } from '../redux/action';

class FromUserSystem extends Component {

    formRef = React.createRef();
    constructor(props) {
        super(props);
        this.state = {}
     
    }

    componentDidUpdate() {
        if (this.props.type === "update" && this.props.dataEdit !== null) {
            const data = this.props.dataEdit;
            this.formRef.current.setFieldsValue({
                name: data.name,
                lastname: data.lastname,
                active: data.active ,
                phone: data.phone,
                email: data.email,
                username: data.username,
                issupperadmin: data.isSupperAdmin ,
                
            })
        }  
        else {
            this.formRef.current.resetFields();
        }
    }

    handleOk = (value) => {

        const payload = {
            username: value.username,
            name: value.name,
            phone: value.phone,
            lastname: value.lastname,
            email: value.email,
            active: value.active ? value.active: false,
            isSupperAdmin: value.issupperadmin?value.issupperadmin: false,
        }

        if (this.props.type === "update") {
            this.props.updateUserSystem({...payload, id: this.props.dataEdit.id}, {
                onSuccess: () => {
                    notification.success({ message: `Đã cập nhật thành công tài khoản #${this.props.dataEdit.username} ` });
                    this.handleCancel();
                },
                onError: error => notification.error({ message: `${error} - Cập nhật thất bại tài khoản #${this.props.dataEdit.username}  ` }),
              })
        } else {
            this.props.addUserSystem({...payload, password: value.password}, {
                onSuccess: () => {
                    notification.success({ message: `Thêm mới thành công ` });
                    this.handleCancel();
                },
                onError: error => notification.error({ message: `${error} - Thêm mới thất bại` }),
              })
        }
        this.formRef.current.resetFields();
    };

    handleCancel = () => {
        this.props.onClose();
    };

   


    render() {
        return (
            <>
                <Modal
                    title={this.props.type === 'update' ? `cập nhật thông tin tài khoản ${this.props.dataEdit.username}` : "Tạo mới user" }
                    onCancel={this.handleCancel}
                    visible={this.props.visible}
                    okButtonProps={{form:'usersystem-form', key: 'submit', htmlType: 'submit'}}
                    okType="primary"
                >
                    <Form
                        id='usersystem-form'
                        layout="vertical"
                        hideRequiredMark
                        ref={this.formRef}
                        onFinish={this.handleOk}
                    >
                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item
                                    name="username"
                                    label="Username"
                                    rules={[{ required: true, message: 'Please enter username' }]}
                                >
                                    <Input placeholder="Please enter username" />
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item
                                    name="name"
                                    label="Name"
                                    rules={[{ required: true, message: 'Please enter name' }]}
                                >
                                    < Input placeholder="Please enter name" />
                                </Form.Item>

                            </Col>
                        </Row>

                        <Row gutter={24}>
                            {this.props.type === "create" && (
                                <Col span={12}>

                                    <Form.Item
                                        name="password"
                                        label="Password"
                                        rules={[{ required: true, message: 'Please enter password' }]}>
                                        <Input.Password placeholder="Please enter password" />
                                    </Form.Item>
                                 </Col>
                            )}
                            <Col span={12}>

                                <Form.Item
                                    name="lastname"
                                    label="Họ"
                                    rules={[{ required: true, message: 'Please enter last name' }]}
                                >
                                    <Input style={{ borderRadius: "5px" }} placeholder="Please enter last name" />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item
                                    name="email"
                                    label="Email"
                                    rules={[{ required: true, message: 'Please enter email ' }]}
                                >
                                    <Input style={{ borderRadius: "5px" }} placeholder="Please enter email" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="phone"
                                    label="Phone"
                                    rules={[{ required: true, message: 'Please enter phone' }]}
                                >
                                    <Input  style={{ borderRadius: "5px" }} placeholder="Please enter phone" />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item
                                    // name="role"
                                    label="Role"
                                    // rules={[{ required: true, message: 'Please enter password' }]}>
                                >
                                    <Input style={{ borderRadius: "5px" }} placeholder="Please enter phone" />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name="active"
                                    valuePropName="checked"
                                    label="Kích hoạt"
                                >
                                    <Switch  />
                                </Form.Item>     
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    name="issupperadmin"
                                    valuePropName="checked"
                                    label="Admin"
                                >
                                    <Switch   />
                                </Form.Item>     
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            </>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        // userData: select(state, 'userManagementReducer', 'userData'),
        // isFetching: select(state, 'userManagementReducer', 'isFetching'),
        // error: select(state, 'userManagementReducer', 'error'),

    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {

        addUserSystem: (user, meta) => {
            console.log(user)
            dispatch(addUserSystem(user, meta));
        },
        updateUserSystem: (user, meta) => {
            dispatch(updateUserSystem(user, meta));
        }
        // findbyidUser: (id) => {
        //     dispatch(findbyidUser(id));
        // },
        // getAll: () => {
        //     dispatch(getAll());
        // },

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FromUserSystem);
