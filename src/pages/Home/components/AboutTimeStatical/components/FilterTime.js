import {Form, Button, Input, DatePicker, Select } from 'antd';
import React, { Component } from 'react';
import moment from 'moment';
const { Option } = Select;

const { RangePicker } = DatePicker;
class FilterTime extends Component {

    disabledDate =(current)=> {
        return current && current > moment().startOf('month');
    }


    constructor(props) {
        super(props);
        this.state = {
            showFilter : false
        }
    }  

    onShowFilter = () => {
        this.setState({ showFilter: !this.state.showFilter });
    }

    dataSlected = [
        {
            id: 1,
            name: "Tuần này",
            value: moment()
            .startOf("week")
            .subtract(-1, "days")
            .format("DD-MM-YYYY")
            .concat("/", moment().format("DD-MM-YYYY"))
        },
        {   id: 2,
            name: "Tuần trước",
            value: moment()
                .subtract(7, "days")
                .startOf("week")
                .subtract(-1, "days")
                .format("DD-MM-YYYY")
                .concat(
                    "/",
                    moment()
                        .subtract(7, "days")
                        .endOf("week")
                        .subtract(-1, "days")
                        .format("DD-MM-YYYY")
            )
        },
        {
            id: 3,
            name: "Tháng này",
            value: moment()
                .startOf("month")
                .format("DD-MM-YYYY")
                .concat("/", moment().format("DD-MM-YYYY"))
        },
        {
            id: 4,
            name: "Tháng trước",
            value: moment()
            .subtract(1, "months")
            .startOf("month")
            .format("DD-MM-YYYY")
            .concat("/",moment()
                .subtract(1, "months")
                .endOf("month")
                .format("DD-MM-YYYY")
            )
        },
        {
            id: 5,
            name: "3 Tháng trước",
            value: moment()
            .subtract(3, "months")
            .startOf("month")
            .format("DD-MM-YYYY")
            .concat("/",moment()
                .subtract(1, "months")
                .endOf("month")
                .format("DD-MM-YYYY")
            )
        }
     ]
      
    render() {
        const { showFilter } = this.state;
        return (
            <>
                <h4> 
                    Chọn mốc thời gian
                    <Select 
                        style={{marginLeft: 20}}
                        placeholder="Please choose the role"
                        defaultValue={this.dataSlected[0].value}
                        onChange={(e) => this.props.onSelect(e)}
                    >
                        {this.dataSlected.map(item => (<Option value={item.value} key={item.id}>{item.name}</Option>))}          
                    </Select>
                </h4>
                <a onClick={this.onShowFilter}>Tìm trong khoảng thời gian</a>
                {
                    showFilter && (
                        <Form style={{marginTop: 20}} onFinish={(e)=>this.props.onFilter(e)} >
                            <Form.Item 
                                    name="fromDate"
                                    label="Từ ngày"
                                    rules={[{ required: true, message: 'Mời chọn thời gian' }]}
                                >
                                <DatePicker
                                    disabledDate={current => current && current > moment().endOf('day')}
                                />
                            </Form.Item>
                            <Form.Item 
                                    name="toDate"
                                    label="Đến ngày"
                                    rules={[{ required: true, message: 'Mời chọn thời gian' }]}
                                >
                                <DatePicker
                                    disabledDate={current => current && current > moment().endOf('day')}
                                />
                            </Form.Item>
                            <Form.Item >
                                <Button type="primary" htmlType="submit">
                                    Tìm kiếm
                                </Button>
                            </Form.Item>
                        </Form>  
                    )
               }
              
            </>
        )
    }
}

export default FilterTime;
