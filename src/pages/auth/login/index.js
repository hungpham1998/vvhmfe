import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Card, Row, Col, Image } from 'antd';
import ReCAPTCHA from 'react-grecaptcha';
import { UserOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons';
import { loginUser } from './redux/action';
import { Link } from 'react-router-dom';
import ROUTER from '../../../constants/Router';
import select from '../../../utils/select';
import { history } from '../../../constants/history';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          userName: '',
          passWord: '',
          isShow: false,  
      };
      this.callback = this.callback.bind(this);
      this.expiredCallback = this.expiredCallback.bind(this);
    }


    onFinish = () => {
      const { userName, passWord } = this.state;
      const user = {
        username: userName,
        password: passWord,
      }
      this.props.loginUser(user);
    };

    onChange = (e, field) => {
        var target = e.target;
        var name = field;
        var value = target.value;
        this.setState({
            [name]: value
        });
    
    }

   callback = () => {
    this.setState({
         isShow: true
       })
     };
  expiredCallback  = () => {
      
    };
    

  
    componentDidMount() {
      if(this.props.isAuthenticated) {
         history.push(ROUTER.HOME);
      }
  }
  
  componentWillReceiveProps(nextProps) {
    const { history,  isAuthenticated, error} = nextProps
      if(isAuthenticated){
        history.push(ROUTER.HOME)
      }
  }

  
  render() {
    const { error } = this.props;
    return (
      <>
        <Row>
          <Col span={4} />
          <Col span={10} style={{ marginTop: '180px'}}>
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
                <h1 style={{ textAlign: 'center' }}>Đăng nhập</h1>
                { error? <h4 style={{ textAlign: 'center', color: 'red'}}>{error}</h4> : undefined}
                <Form
                  name="normal_login"
                  className="login-form"
                  layout="vertical"
                  initialValues={{ remember: true }}
                  onFinish={this.onFinish}
                >
                  <Form.Item
                  name="userName"
                  label="Tên đăng nhập"
                  rules={[{ required: true, message: 'Please input your userName!' }]}
                  validateStatus={error ? error : undefined}
                  // help={
                  //   error
                  //     ? error
                  //     : undefined
                  // }
                  >
                    <Input
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="Username"
                        onChange={(e) => this.onChange(e, "userName")}
                    />
                  </Form.Item>
                  <Form.Item
                    name="passWord"
                    label="Mật khẩu"
                      rules={[{ required: true, message: 'Please input your passWord!' }]}
                  >
                    <Input
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      type="password"
                      placeholder="passWord"
                      onChange={(e) => this.onChange(e, "passWord")}
                    />
                  </Form.Item>
                  <Form.Item >
                    <ReCAPTCHA
                          sitekey="6Ld4vssZAAAAACC-kSdbWkJC7MTMq1bE3bpcMsOX"
                          callback={this.callback}
                          expiredCallback={() => this.expiredCallback()}
                          locale="vn"
                    />
                  </Form.Item>
                  <Form.Item >
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        style={{ width: '100%' }} 
                      >
                      Log in <LoginOutlined /> 
                    </Button>
                      <Link to={ROUTER.AUTH.REGISTER} > <span style={{ marginLeft: '40%'}}>register now! </span></Link>
                  </Form.Item>
                </Form>
              </Card>
          </Col>
      </Row>
    </>
  )}
  
};



const mapDispatchToProps = (dispatch, props) => {
  return {
    loginUser: (user) => {
      dispatch(loginUser(user))
     }
    }
}
const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: select(state, 'authReducer', 'isAuthenticated'),
    isFetching: select(state, 'authReducer', 'isFetching'),
    forwardLocation: select(state, 'authReducer', 'forwardLocation'),
    error: select(state, 'authReducer', 'error'),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
