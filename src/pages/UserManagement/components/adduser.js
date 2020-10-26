// import React, { Component } from 'react';
// import { DeleteOutlined, EditOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
// import {
//     Switch, message, Checkbox, Drawer, Select, Form,
//     Input, Card, Col, Divider, Popconfirm, Row, Space,
//     Table, Button, Modal, notification
// } from 'antd';
// import { connect } from 'react-redux';
// import { activeUser, findbyidUser, getAll } from '../redux/action';
// import select from '../../../utils/select';

// const onFinish = (values) => {
//     console.log("Success:", values);
// };

// const onFinishFailed = (errorInfo) => {
//     console.log("Failed:", errorInfo);
// };
// class AddUser extends Component {

//     constructor(props) {
//         super(props);

//         this.state = {
//             // loading: false,
//             id: "",
//             name:"",
//             lastname:"",
//             email:"",
//             phone:"",
//             password:"",
//             active: "",
//             dataEdit: {}

//         }
//     }

//     componentWillReceiveProps(nextProps) {
//         if (nextProps && nextProps.dataEdit) {
//             var { dataEdit } = nextProps;
//             console.log("dataEdit", dataEdit)
//             this.setState({
//                 id: dataEdit.id,
//                 name: dataEdit.name,
//                 lastname: dataEdit.lastname,
//                 email: dataEdit.email,
//                 phone: dataEdit.phone,
//                 password :dataEdit.password,
//                 active: dataEdit.active,
//             });
//         }
//     }

//     _handleOk = (e) => {
//         e.preventDefault();
//         var { id,name,lastname,email,phone,password, active } = this.state;
//         console.log("id", id)
//         var user = {
//             id: id,
//             name:name,
//             lastname:lastname,
//             email:email,
//             phone:phone,
//             password:password,
//             active: active,
//         };
//         if (this.props.type === "update") {
//             this.props.activeUser(user);
//         } else {
//             this.props.activeUser(user);
//             this.setState({
//                 id: "",
//                 name:"",
//                 lastname:"",
//                 email:"",
//                 phone:"",
//                 password:"",
//                 active: "",
//             });
//         }
//         this._handleCancel();
//         this.props.getAll();
//     };

//     _onChange = (e, field) => {
//         var target = e.target;
//         var name = field;
//         var value = target.value;
//         this.setState({
//             [name]: value,
//         });
//     };

//     _handleCancel = () => {
//         this.props.closeModal(false);
//         this.props.getAll();
//     };


//     // onChangeStatus = (id, value) => {
//     //     // const priceTable = this.props.priceTable.toJS()
//     //     this.props.activeUser(
//     //       id,
//     //       {
//     //         // ...priceTable,
//     //         active: value !== true
//     //         // items: Items.filter(item => item.price !== 0),
//     //       },
//     //       {
//     //         onSuccess: () => {
//     //           notification.success({ message: 'Cập nhật trạng thái thành công' })
//     //           this.props.activeUser()
//     //         },
//     //         onError: error => notification.error({ message: `Cập nhật trạng thái gặp lỗi ${error}! Vui lòng thử lại !` }),
//     //       },
//     //     )
//     //   }

//     onChangeSwitch = () => {
//         this.setState({
//             active: !this.state.active
//         })
//     }



//     render() {
//         var { active,name,lastname,email,password,phone } = this.state;
//         console.log(this.props.dataEdit, "data Edit");
//         return (

//             <Modal
//                 title="Tai khoan"
//                 width={720}
//                 // onClose={()=>this.props.onClose()}
//                 onCancel={this._handleCancel}
//                 visible={this.props.isOpen}
//                 onOk={this._handleOk}
//                 bodyStyle={{ paddingBottom: 80 }}

//             >
//                 <Form layout="vertical" hideRequiredMark
//                     initialValues={{ remember: true }}
//                     onFinish={onFinish}
//                     onFinishFailed={onFinishFailed}
//                 >
//                     <Row gutter={16}>
//                         <Col span={12}>
//                             <Form.Item
//                                 name="username"
//                                 label="Username"
//                                 rules={[{ required: true, message: 'Please enter username' }]}
//                             >
//                                 <Input style={{ borderRadius: "5px" }} placeholder="Please enter username" />
//                                 {/* <Input onChange={(e) => this._onChange(e, "name")} value={name} /> */}
//                             </Form.Item>
//                         </Col>

//                         <Col span={12}>
//                             <Form.Item
//                                 name="name"
//                                 label="Name"
//                                 rules={[{ required: true, message: 'Please enter name' }]}
//                             >
//                                 < Input onChange={(e) => this._onChange(e, "name")} value={name} style={{ borderRadius: "5px" }} placeholder="Please enter name" />
//                             </Form.Item>

//                         </Col>
//                     </Row>

//                     <Row gutter={16}>
//                         <Col span={12}>

//                             <Form.Item
//                                 name="password"
//                                 label="Password"
//                                 rules={[{ required: true, message: 'Please enter password' }]}>
//                                 <Input.Password onChange={(e) => this._onChange(e, "password")} value={password} style={{ borderRadius: "5px" }} placeholder="Please enter password" />
//                             </Form.Item>
//                         </Col>
//                         <Col span={12}>

//                             <Form.Item
//                                 name="lastname"
//                                 label="Lastname"
//                                 rules={[{ required: true, message: 'Please enter username' }]}
//                             >
//                                 <Input onChange={(e) => this._onChange(e, "lastname")} value={lastname} style={{ borderRadius: "5px" }} placeholder="Please enter username" />
//                             </Form.Item>
//                         </Col>
//                     </Row>

//                     <Row gutter={16}>
//                         <Col span={12}>
//                             <Form.Item
//                                 name="email"
//                                 label="Email"
//                                 rules={[{ required: true, message: 'Please enter username' }]}
//                             >
//                                 <Input onChange={(e) => this._onChange(e, "email")} value={email} style={{ borderRadius: "5px" }} placeholder="Please enter username" />
//                             </Form.Item>
//                         </Col>
//                         <Col span={12}>
//                             <Form.Item
//                                 name="phone"
//                                 label="Phone"
//                                 rules={[{ required: true, message: 'Please enter phone' }]}
//                             >
//                                 <Input onChange={(e) => this._onChange(e, "phone")} value={phone} style={{ borderRadius: "5px" }} placeholder="Please enter phone" />
//                             </Form.Item>
//                         </Col>
//                     </Row>

//                     <Row gutter={16}>
//                         <Col span={12}>
//                             <Form.Item
//                                 name="role"
//                                 label="Role"
//                                 rules={[{ required: true, message: 'Please enter password' }]}>
//                                 <Input style={{ borderRadius: "5px" }} placeholder="Please enter phone" />
//                             </Form.Item>
//                         </Col>
//                         <Col span={12}>
//                             <Form.Item
//                                 style={{ marginTop: "30px" }}
//                             >
//                                 <Switch onChange={() => this.onChangeSwitch()} checked={active} />
//                             </Form.Item>
                            
                            
//                         </Col>
//                     </Row>
//                 </Form>
//             </Modal>
//         );
//     }
// }
// const mapStateToProps = (state) => {
//     return {
//         userData: select(state, 'userManagementReducer', 'userData'),
//         isFetching: select(state, 'userManagementReducer', 'isFetching'),
//         error: select(state, 'userManagementReducer', 'error'),

//     };
// };

// const mapDispatchToProps = (dispatch, props) => {
//     return {

//         activeUser: (user) => {
//             dispatch(activeUser(user));
//         },
//         findbyidUser: (id) => {
//             dispatch(findbyidUser(id));
//         },
//         getAll: () => {
//             dispatch(getAll());
//         },

//     };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(AddUser);