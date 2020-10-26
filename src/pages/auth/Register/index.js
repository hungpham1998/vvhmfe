import React from 'react';
import { Form, Input, Button, Card, Row, Col, Image, notification } from 'antd';
import { UserOutlined, LockOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import ROUTER from '../../../constants/Router';
import { Link } from 'react-router-dom';
import select from '../../../utils/select';
import { registerUser } from './redux/action';
import { connect } from 'react-redux';

class Resgiter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            password: '',
            password1: '',
            email: '',
            error: ''
         };
    }


    onFinish = () => {
        const { email, password, password1 } = this.state;
        if (password.length === password1.length) {
            const user = {
                email : email,
                password: password,
            }
            this.props.registerUser(user, {
                onSuccess: () => {
                    notification.success({ message: 'Sửa thành công' })
                    this.props.history.push(ROUTER.AUTH.LOGIN)
                },
                onError: error => notification.error({ message: `Sửa thất bại - ${error}` }),
            });
        }
        else (
            this.setState({ error: "kiểm tra lại mật khẩu" })
        )

    };

    onChange = (e, field) => {
        var target = e.target;
        var name = field;
        var value = target.value;
        this.setState({
            [name]: value
        });
    
    }

   
  
  render() {
      
    return (
      <div style={{ background: 'whilesmoke'}}>
        <Row>
            <Col span={4} />
            <Col span={10} style={{ paddingTop: '180px'}}>
                <Image style={{ 
                width: 490,
                height: 128
                }} src={require("../../../assets/banner.jpg")}  alt="image"  />
            </Col>
            <Col span={6} style={{ marginTop: '100px'}} >
                <Card
                    bordered={false}
                    style={{
                        maxWidth: '100%',
                        background: 'while'
                    }}
                >
                <h1 style={{ textAlign: 'center' }}>Thay đổi mật khẩu </h1>
                <Form
                  name="normal_Resgiter"
                  className="Resgiter-form"
                  layout="vertical"
                  initialValues={{ remember: true }}
                  onFinish={this.onFinish}
                >
                    <Form.Item
                         name="email"
                        label="gmail đăng ký"
                        rules={[{ required: true, message: 'Please input your userName!' }]}
                    >
                        <Input
                            type='email'
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="email"
                            onChange={(e) => this.onChange(e, "email")}
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Mật khẩu mới"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="new password"
                        onChange={(e) => this.onChange(e, "password")}
                        />
                    </Form.Item>
                    <Form.Item
                        name="password1"
                        label="Nhập lại mật khẩu mới"
                                rules={[{ required: true, message:  'Please input your password!' }]}>
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="new password"
                                onChange={(e) => this.onChange(e, "password1")}
                                />         
                        </Form.Item>
                        {this.state.error > 0 && (<Form.Item>  <h6>{this.state.error} </h6></Form.Item>)}
                        <Form.Item >
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="Resgiter-form-button"
                                style={{ width: '100%' }} 
                            >
                                Send
                            </Button>
                            <Link to={ROUTER.AUTH.LOGIN}><span style={{ marginLeft: '40%'}}><ArrowLeftOutlined /> back </span> </Link>
                        </Form.Item>        
                    </Form>
                </Card>
            </Col>
            <Col span={4}/>
        </Row>
    </div>
  )}
  
};


const mapStateToProps = (state, ownProps) => {
    return {
        isFetching: select(state, 'registerReducer', 'isFetching'),
        error: select(state, 'registerReducer', 'error'),
      }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        registerUser: (user, meta) => {
        dispatch(registerUser(user,meta))
       }
      }
  }
export default connect(mapStateToProps,mapDispatchToProps)(Resgiter);
