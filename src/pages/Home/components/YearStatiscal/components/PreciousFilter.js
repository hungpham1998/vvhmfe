import { Select, Form, Input, Button } from 'antd';
import React, { Component } from 'react'
import moment from 'moment';
const { Option } = Select;
class PreciousFilter extends Component {
    formRef = React.createRef();

    componentDidMount() {
        this.formRef.current.setFieldsValue({
            year: parseInt(moment().format('YYYY')),
            precious: 1
          });
    }


    render() {
        return (
        <>
            <Form ref={this.formRef}  onFinish={(value)=> this.props.onFilterPrecious(value)} >
                <h4> Tìm kiếm doanh thu theo qúy của năm </h4>
                <Form.Item 
                        name="year"
                        label="Chọn năm"
                        rules={[{ required: true, message: 'mời nhập năm' }]}
                    >
                    <Input
                        type='number'
                        min={2000}
                        max={parseInt(moment().format('YYYY'))}
                        placeholder="Please enter year" />
                </Form.Item>
                <Form.Item 
                    name="precious"
                    label="chọn quý của năm"
                    rules={[{ required: true, message: 'Please enter precious' }]}
                    defaultValue="chọn quý"
                >
                    <Select
                        placeholder="Please choose the role"
                    >
                            <Option value={1}>qúy 1</Option>
                            <Option value={2}>qúy 2</Option>
                            <Option value={3}>qúy 3</Option>
                            <Option value={4}>qúy 4</Option>
                    </Select>
                </Form.Item>
                <Form.Item >
                    <Button type="primary" htmlType="submit">
                        Tìm kiếm
                    </Button>
                </Form.Item>
                </Form> 
            </>
        )
    }
}

export default PreciousFilter;
