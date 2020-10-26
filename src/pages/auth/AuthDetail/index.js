import React from 'react';
import { Form, Input, Button,  Row, Col,  Upload, message, Card, notification } from 'antd';
import ROUTER from '../../../constants/Router';
import { UploadOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { connect } from 'react-redux';
import { getAccount, updatedAccount} from './redux/action';
import select from '../../../utils/select';
import WithLoadingHOC from '../../../hoc/loading';

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  
  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}



class AuthDetail extends React.Component {
 
    constructor(props) {
        super(props);
        this.state = { 
            // loading: false,
      };
    
    }
    formRef = React.createRef();


    onCancel = () => {
        this.props.history.push(ROUTER.HOME)
    }

    
    handleChange = info => {
    if (info.file.status === 'uploading') {
        this.setState({ loading: true });
        return;
    }
    if (info.file.status === 'done') {
        getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
            imageUrl,
            loading: false,
        }),
        );
    }
    };
    
    componentDidMount() {
        const accountId = jwt_decode(localStorage.getItem('jwtToken'));
        const params = { id: accountId.sub }; 
        this.props.getAccount(params);
        
    }

    componentWillReceiveProps(nextStates, nextProps) {
        if (nextStates && nextStates.accountDetails) {
            const account = nextStates.accountDetails;
            this.formRef.current.setFieldsValue({
                name: account.name,
                email: account.email,
                phone: account.phone,
                lastname: account.lastname
              });
         
        }
    }
    
    onFinish = (value) => {
        const payload = { 
            id: this.props.accountDetails.id,
            name: value.name,
            email: value.email,
            phone: value.phone,
            lastname: value.lastname,
        }
        this.props.updatedAccount(payload,
            {
                onSuccess: () => {
                    notification.open({ message: 'cập nhật thành công' });
                    this.props.getAccount({ id: this.props.accountDetails.id })
                },
                onError: error => notification.error({ message: `${error} - Cập nhật thất bại` }),
            })
            
    }
  
  render() {
      const { loading, imageUrl, } = this.state;   
    return (
    <Card style={{ background: 'white', padding: 40, borderRadius: 10 }}>
            <h3 style={{ textAlign: 'center', fontSize: 'large' }}>Cập nhật thông tin tài khoản {this.props.accountDetails.username}</h3>
        <Row>
            <Col span={8} > 
                <Row style={{justifyContent:'center'}}>
                    <img
                        src={ imageUrl? imageUrl : 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/06/06/15/Chris-Pratt.jpg?width=982&height=726'}
                        style={{
                        height: 240,
                        width: 240,
                        borderRadius: 10
                    }}/>
                </Row>
                <Row style={{paddingTop: 20,justifyContent:'center'}}>
                    <Upload
                        showUploadList={false}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        beforeUpload={beforeUpload}
                        onChange={this.handleChange}
                    >
                        <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                </Row>
            </Col>
                <Col span={16}>
                <Form layout="vertical" hideRequiredMark
                        style={{ backgroundColor: 'smoke' }}
                        ref={this.formRef}
                        onFinish={this.onFinish}
                       >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item 
                                    name="name"
                                    label="Name"
                                    rules={[{ required: true, message: 'Please enter name' }]}
                                >
                                 
                                    <Input style={{ borderRadius: "5px" }}
                                        placeholder="Please enter name"
                                        value={this.state.name}
                                        
                                    />
                                
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="lastname"
                                label="lastname"
                                rules={[{ required: true, message: 'Please enter lastname' }]}
                            >
                            <Input style={{ borderRadius:"5px"}} placeholder="Please enter lastname" value />
                            </Form.Item>
                        </Col>   
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[{ required: true, message: 'Please enter mail' }]}
                            >
                                <Input
                                    type="email"
                                    style={{ borderRadius:"5px" }}
                                    placeholder="Please enter mail"
                                />
                            </Form.Item>
                        </Col>  
                        <Col span={12}>
                            <Form.Item
                                name="phone"
                                label="Phone"
                                rules={[{ required: true, message: 'Please enter phone' }]}
                                >
                                <Input style={{ borderRadius:"5px"}} placeholder="Please enter phone" />
                            </Form.Item>
                        </Col>
                    </Row>
                    
                    <div
                        style={{
                            textAlign: 'right',
                        }}
                        >
                        <Button
                            style={{
                                backgroundColor: '#40a9ff',
                                borderRadius: 5,
                                border: "#00d084",
                                marginRight: 8
                            }}
                                type="primary"
                                htmlType="submit"
                        >
                            OK
                        </Button>
                        <Button style={{ backgroundColor:'#f44336',borderRadius: 5,border:"#f44336", }} onClick={this.onCancel} >
                            Cancel
                        </Button>
                    </div> 
                </Form>
            </Col>
        </Row>
    </Card>
  )}
  
};



const mapDispatchToProps = (dispatch, props) => {
    return {
        getAccount: (params) => {
            dispatch(getAccount(params));
        },
        updatedAccount:(payload,meta) => {
            dispatch(updatedAccount(payload, meta));
        }
    }
}


const mapStateToProps = (state) => {
    return { 
        accountDetails: select(state, 'authDetailReducer', 'accountDetails'),
        error:  select(state, 'authDetailReducer','error')
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WithLoadingHOC(AuthDetail)));
