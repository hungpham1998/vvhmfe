import {Form, Button, DatePicker} from 'antd';
import React, { Component } from 'react'
import moment from 'moment';
function handleChange(value) {
    console.log(`selected ${value}`);
  }

const monthFormat = 'MM/YYYY';
const { RangePicker } = DatePicker;

function disabledDate(current) {
  // Can not select days before today and today
  return current && current > moment().startOf('month');
}

class MonthFilter extends Component {
    render() {
        return (
            <>
                <Form>
                    <Form.Item 
                            name="month"
                            label="Lọc theo tháng"
                            rules={[{ required: true, message: 'Mời điền tháng' }]}
                        >
                        <DatePicker picker="month" format={monthFormat} disabledDate={disabledDate} placeholder=''  style={{borderRadius:5}} />
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

export default MonthFilter;
