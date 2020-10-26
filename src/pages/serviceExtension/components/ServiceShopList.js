import { Switch, Table } from 'antd';
import React, { Component } from 'react'
import WithLoading from '../../../hoc/loading';
import ToJS from '../../../hoc/toJS';
import PropTypes from 'prop-types';
import moment from 'moment';
import formatMoney from '../../../constants/ConvertMoney';


const showTime = (value) =>{
  let time = moment(value).diff(moment().format('YYYY-MM-DD HH:mm:ss'), 'days');
  if (time == 0) {
    return ( <span> hết hạn ngày {moment(value).format('DD-MM-YYYY')}</span>)
  }
  if (time > 0) {
   return ( <span> còn {time} ngày</span>)
  }
}


const columns = (onChangeStatus) => [
    {
      title: 'STT',
      dataIndex: 'id',
      key: 'id',
      width: 20,
      render: value => (
      
        <span>  {value} </span>
     
      )
    },
    {
      title: 'Tên shop',
      dataIndex: 'shopName',
      key: "shopName",
      render: (value) => (
        <span>{value}</span> 
      ),
    },
    {
      title: 'Từ ngày',
      dataIndex: 'fromDate',
      key:'fromDate',
      render: (value) => (
      <span> {moment(value).format('YYYY-MM-DD HH:mm:ss')}</span> 
      ),
    },
    {
      title: 'Đến ngày',
      dataIndex: 'toDate',
      key:'toDate',
      render: (value) => (
          <span> {moment(value).format('YYYY-MM-DD HH:mm:ss')}</span> 
        ),
    },
    {
      title: 'Tên dich vụ',
      dataIndex: 'serviceName',
      key: 'serviceName',
      render: (value) => (
          <span>{value}</span> 
        ),
    },
    { 
      title: 'Loại dịch vụ',
      dataIndex: ['service', 'numday'],
      key: 'service.numday',
      render: (value) => (
          <span>{value}</span> 
        ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isPayment',
      align: 'center',
      key: 'isPayment',
      width: 100,
      render: (value, record) => (
        <Switch key={record.id} checked={value} onChange={()=> onChangeStatus(record.id, value)}/>
      ),
    },
    {
      title: 'Ngày còn lại',
      dataIndex: 'toDate',
      align: 'center',
      key:'toDate',
      render: (value) => (
        showTime(value)
      ),
  },
  {
    title: 'Mã giảm giá',
    dataIndex: 'vouchercode',
    key: 'vouchercode'
  },
  {
      title: 'Tổng số tiền',
      key:'total',
      dataIndex: 'total',
    render: (value) => (
      formatMoney(value)
      )
  },
   
]

const ServiceShopList = ({
  serviceShop,
  meta,
  onChangePage,
  onChangeSize,
  onChangeStatus,
}) => {
  return (
    <>
        <Table
          columns={columns(onChangeStatus)}
          dataSource={serviceShop}
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


ServiceShopList.propTypes = {
    serviceShop: PropTypes.array,
    meta: PropTypes.object,
    onChangeSize: PropTypes.func,
    onChangeStatus: PropTypes.func
  
  }
  
  ServiceShopList.defaultProps = {
    serviceShop: [],
    meta: {},
    onChangePage: () => {},
    onChangeSize: () => { },
    onChangeStatus: () => {}
  
  }
  
export default WithLoading(ToJS(ServiceShopList))
