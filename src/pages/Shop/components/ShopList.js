import { Image, Switch, Table } from 'antd';
import React, { Component } from 'react'
import WithLoading from '../../../hoc/loading';
import ToJS from '../../../hoc/toJS';
import PropTypes from 'prop-types';
import moment from 'moment';


const showImage = (value) => {
    if (value.length > 0) {
        return (
            <img
                width={40}
                height={40}
                style={{
                    borderRadius:'50%',
                }}
                src={"https://s3.amazonaws.com/uifaces/faces/twitter/iduuck/128.jpg"}
                // src={"https://s3.amazonaws.com/uifaces/faces/twitter/iduuck/128.jpg"}
                // src={value}
            />
        )
    }
    else {
        return (
            <img
                width={40}
                height={40}
                style={{
                    borderRadius:'50%',
                }}
                // src={"https://s3.amazonaws.com/uifaces/faces/twitter/iduuck/128.jpg"}
            />
        )
    }
}


const columns = (onChangeStatus) => [
    {
        title: 'STT',
        dataIndex: 'id',
        key: 'id',
        width: 20,
        render: value => (  <span>  {value} </span> )
    },
    {
        title:'Ảnh shop',
        dataIndex:'imageUrl',
        key:'imageUrl',
        width: 70,
        render: (value) => ( showImage(value))
    }, 
    {
        title: 'Tên shop',
        dataIndex: 'name',
        key: "name",
        render: (value) => (
        <span>{value}</span> 
        ),
    },
    {
        title: 'Người quản lý',
        key:'manager',
        dataIndex: 'manager',
        width: 100,
        render: (value) => (
            <span> {value}</span> 
        ),
    },
    {
        title: 'Mail',
        key:'email',
        dataIndex: 'email',
        width: 100,
        render: (value) => (
            <span> {value}</span> 
        ),
    },
    {
        title: 'Số điện thoại',
        key:'phone',
        dataIndex: 'phone',
        width: 100,
        render: (value) => (
            <span> {value}</span> 
        ),
    },
    {
        title: 'Địa chỉ',
        key:'address',
        dataIndex: 'address',
        width: 200,
        render: (value) => (
            <span> {value}</span> 
        ),
    },
    {
        title: 'Ngày tạo',
        key:'createdDate',
        dataIndex: 'createdDate',
        width: 150,
        render: (value) => (
            <span> {moment(value).format('YYYY-MM-DD')}</span> 
        ),
    },
    {
        title: 'Người tạo',
        dataIndex: ['user','name'],
        key: 'user.id',
        width: 100,
         render: (value) => (
          <span>{value}</span> 
        ),
    },
    {
        title: 'Trạng thái',
        dataIndex: 'isActive',
        key:'isActive',
        align: 'center',
        width: 100,
        render: (value, record) => (
            <Switch key={record.id} checked={value} onChange={()=> onChangeStatus(record.id, value)}/>
        ),
    },
   
]

const ShopList = ({
  shopData,
  meta,
  onChangePage,
  onChangeSize,
  onChangeStatus,
}) => {
  return (
    <>
        <Table
          columns={columns(onChangeStatus)}
          dataSource={shopData}
          rowKey={record => record.id}
          pagination={{
            size: "small",
            current: meta.current ? meta.current : 0,
            total: meta.total,
            pageSize: meta.pageSize ? meta.pageSize : 10,
            onChange: onChangePage,
            showSizeChanger: true,
            pageSizeOptions: ['10', '15', '20', '25'],
            onShowSizeChange: onChangeSize,
          }}
           scroll={{ x: 1300 }}
        />
    </>  
  )
}


ShopList.propTypes = {
    shopData: PropTypes.array,
    meta: PropTypes.object,
    onChangeSize: PropTypes.func,
    onChangeStatus: PropTypes.func
  
  }
  
  ShopList.defaultProps = {
    shopData: [],
    meta: {},
    onChangePage: () => {},
    onChangeSize: () => { },
    onChangeStatus: () => {}
  
  }
  
export default WithLoading(ToJS(ShopList))
