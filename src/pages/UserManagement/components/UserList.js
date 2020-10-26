import { Popconfirm, Space, Switch, Table } from 'antd';
import React, { Component } from 'react'
import WithLoading from '../../../hoc/loading';
import ToJS from '../../../hoc/toJS';
import PropTypes from 'prop-types';
import moment from 'moment';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const columns = (onChangeStatus) => [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width:50,
    render: value => (
      <span>  {value} </span>

    )
  },
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
    width:120,
    ellipsis: true,
    render: (value) => (
      <span>{value}</span>
    ),
  },
  {
    title: 'E-Mail',
    dataIndex: 'email',
    key: 'email',
    width:150,
    ellipsis: true,
    render: (value) => (
      <span>{value}</span>
    ),
  },
  {
    title: 'Họ',
    dataIndex: 'lastname',
    key: 'lastname',
    width:120,
    ellipsis: true,
    render: (value) => (
      <span>{value}</span>
    ),
  },
  {
    title: 'Tên',
    dataIndex: 'name',
    key: 'name',
    width:120,
    ellipsis: true,

    render: (value) => (
      <span>{value}</span>
    ),
  },
  {
    title: 'Điện thoại',
    dataIndex: 'phone',
    key: 'phone',
    width:120,

    render: (value) => (
      <span>{value}</span>
    ),
  },
  {
    title: 'Trạng thái',
    dataIndex: 'active',
    key: 'active',
    width:120,
    align: "center",
    render: (value, record) => (
      // <Switch key={record.id} checked={value} />
      <Switch  key={record.id} checked={value} onChange={() => onChangeStatus(record.id, value)} />
    ),

  },

  // {
  //   title: "Action",
  //   key: "action",
  //   width: 100,
  //   // render: (record) => (
  //   //   <Space size="middle">
  //   //     {/* <EditOutlined onClick={() => this._showModal("update", record)} /> */}
  //   //     <EditOutlined />
  //   //     <Popconfirm
  //   //       title="Bạn có muốn xóa User này?"
  //   //       onConfirm={() => {
  //   //         console.log(record);
  //   //         this._onDelete(record);


  //   //       }}
  //   //     >
  //   //       <DeleteOutlined />
  //   //     </Popconfirm>


  //   //   </Space>
  //   // ),


  // },
]

const UserList = ({
  UserManagementData,
  meta,
  onChangePage,
  onChangeSize,
  onChangeStatus,
  isFetching
}) => {
  return (
    <>
      { isFetching === false && (
        <Table
          columns={columns(onChangeStatus)}
          // columns={columns}
          dataSource={UserManagementData}
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
          // scroll={{ x: 'calc(800px + 50%)'}}
          scroll={{ x: 800 }}
        />
      )}
    </>
  )
}


UserList.propTypes = {
  UserManagementData: PropTypes.array,
  meta: PropTypes.object,
  onChangeSize: PropTypes.func,
  onChangeStatus: PropTypes.func

}

UserList.defaultProps = {
  UserManagementData: [],
  meta: {},
  onChangePage: () => { },
  onChangeSize: () => { },
  onChangeStatus: () => { }

}

export default WithLoading(ToJS(UserList))

