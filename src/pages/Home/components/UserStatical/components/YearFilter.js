import {Form, Button, Input } from 'antd';
import React, { Component } from 'react'
import moment from 'moment';

class YearFilter extends Component {
    render() {
        return (
            <>
                <h4> Tìm kiếm doanh thu theo năm </h4>
                <Input
                    type='number'
                    min={2000}
                    max={parseInt(moment().format('YYYY'))}
                    defaultValue={this.props.yearFilter}
                    value={this.props.yearFilter}
                    style={{ borderRadius: "5px"}}
                    placeholder="Please enter year"
                    onChange={(e) => { this.props.onChange(e, "yearFilter") }}
                />

                <Button
                    type="primary"
                    htmlType="submit"
                    style={{ marginTop: 20 }}
                    onClick={(e) => this.props.onFinish(e)}
                >
                    Tìm kiếm
                </Button>
            </>
        )
    }
}

export default YearFilter;
