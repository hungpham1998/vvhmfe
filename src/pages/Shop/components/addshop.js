import React, { Component } from 'react';
import { UploadOutlined} from '@ant-design/icons';
import {
    Upload, Drawer, Select, Form,
    Input, Col, Row,
     Button,
} from 'antd';

const { Search } = Input;
const { Option } = Select;

const props = {
    action: '//jsonplaceholder.typicode.com/posts/',
    listType: 'picture',
    previewFile(file) {
      console.log('Your upload file:', file);
      // Your process logic. Here we just mock to the same file
      return fetch('https://next.json-generator.com/api/json/get/4ytyBoLK8', {
        method: 'POST',
        body: file,
      })
        .then(res => res.json())
        .then(({ thumbnail }) => thumbnail);
    },
  }; // Upload Avatar

  class AddShop extends Component {
    constructor(props) {
        super(props);
    
        this.state={
            loading: false
        }
    }

    render() {
       
        return (
         
            <Drawer style={{textAlign:'center'}}
              title="Tạo mới cửa hàng"
              width={720}
              backgroundColor
              onClose={this.props.onClose}
              visible={this.props.visible}
              bodyStyle={{ paddingBottom: 80 ,backgroundColor:'#eaeae1'}}
              footer={
                <div style={{ textAlign: 'right'}}>
                  <Button onClick={()=>this.props.onClose()} type="primary" htmlType="submit" style={{backgroundColor:'#00d084',borderRadius:5,fontWeight:'bold',marginRight:10}}>
                          Xác nhận
                  </Button>
                  <Button onClick={()=>this.props.onClose()}type="primary" htmlType="reset" style={{ marginRight: 8, backgroundColor:'#ff1a1a',color:'#fff',borderRadius:5,fontWeight:'bold' }}>
                          Hủy
                  </Button>
                </div>
              }
            >
              <Form layout="vertical" hideRequiredMark style={{backgroundColor:'#eaeae1',fontWeight:'bold',height:'90%'}}>
                <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="ten"
                        label="Tên cửa hàng"
                        rules={[{ required: true, message: 'Mời điền tên cửa hàng' }]}>
                        <Input placeholder="Mời điền tên cửa hàng" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="qlcuahang"
                        label="Quản lý cửa hàng"
                        rules={[{ required: true, message: 'Mời điền tên quản lý' }]} >
                        <Input placeholder="Mời điền tên quản lý" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="dienthoai"
                        label="Số điện thoại"
                        rules={[{ required: true, message: 'Mời điền số điện thoại' }]}>
                        <Input placeholder="Mời điền số điện thoại" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="diachi"
                        label="Địa chỉ cửa hàng"
                        rules={[{ required: true, message: 'Mời điền địa chỉ' }]}>
                        <Input placeholder="Mời điền địa chỉ" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ required: true, message: 'Mời điền email' }]}>
                        <Input placeholder="Mời điền email" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item 
                        name="upload"
                        label="Upload logo cửa hàng"
                        rules={[{ required: true, message: '' }]}
                        >
                        <Upload {...props}>
                          <Button icon={<UploadOutlined />} style={{marginLeft:-230}}>Upload</Button>
                        </Upload>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item
                        name="mota"
                        label="Mô tả"
                        rules={[
                          {
                            required: true,
                            message: 'Mô tả cửa hàng',
                          },
                        ]}
                      >
                        <Input.TextArea rows={4} placeholder="Mô tả cửa hàng" />
                      </Form.Item>
                    </Col>
                  </Row>
              </Form>
            </Drawer>
        );
    }
  };

  export default AddShop;