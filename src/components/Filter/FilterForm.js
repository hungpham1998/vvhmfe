import { Input } from 'antd';
import React, { Component } from 'react'
const { Search } = Input;
class FilterForm extends Component {
    render() {
        return (
            <>
                <Search  placeholder="mời nhập thông tin"
                    onSearch={value => this.props.onChange(value)}
                    size="large"
                    style={{ width: 400, borderRadius: 20, border: '1px solid #00d084' }}
                />
            </>
        )
    }
}

export default  FilterForm;
