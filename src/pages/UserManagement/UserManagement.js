import React, { Component } from 'react';
import { message, Steps, Modal, Card, Col, Divider, Button, Row, Select, Form, Table, Input, notification } from 'antd';
import { connect } from 'react-redux';
import select from '../../utils/select';
import WithPageHOC from '../../hoc/page';
import ROUTER from '../../constants/Router';
import { PlusOutlined } from '@ant-design/icons';
import UserList from '../UserManagement/components/UserList'
import FilterForm from '../../components/Filter/FilterForm';
import {getUserManagement,  updateStatusUser,} from '../UserManagement/redux/action';



class UserManagement extends Component {

  constructor(props) {
    super(props)
    this.state = {
      filterOptions: {},
      search: null,
      current: 0
    }
  }


  static getDerivedStateFromProps(props, state) {
    const { search } = props.history.location
    let params
    if (search !== state.search) {
      const filterOptions = search.split('?')[1]
      if (filterOptions !== undefined) {
        params = `{"${decodeURI(filterOptions)
          .replace(/"/g, '\\"').replace(/&/g, '","')
          .replace(/=/g, '":"')}"}`
        props.getUserManagement(JSON.parse(params))
      } else {
        props.getUserManagement()
      }
      return { ...state, search, filterOptions: params }
    }
    return state
  }


  // onFilterRequest = params => this.props.getRequests(params);

  onChangePage = (page, size) => {
    const { search } = this.props.history.location
    if (search !== '') {
      let params
      const filterOptions = search.split('?')[1]
      if (filterOptions !== undefined) {
        params = `{"${decodeURI(filterOptions)
          .replace(/"/g, '\\"').replace(/&/g, '","')
          .replace(/=/g, '":"')}"}`
      }

      const obj = JSON.parse(params)
      params = { ...obj, page, size }
      const urlParameters = []
      Object.entries(params).map(e => {
        if (e[1] !== undefined && e[1] !== '') {
          urlParameters.push(e.join('='))
        }
      })
      this.props.history.push(ROUTER.USERMANAGEMENT.concat(`?${urlParameters.join('&')}`))
    } else {
      this.props.history.push(ROUTER.USERMANAGEMENT.concat(`?page=${page}&size=${size}`))
    }
  }


  onChangeStatus = (id, value) => {
    const payload = { id: id, status: !value };
    console.log(payload);
    this.props.updateStatusUser(payload, {
      onSuccess: () => {
        notification.success({ message: `Đã cập nhật trạng thái cho ID #${id} ` });
      },
      onError: error => notification.error({ message: `${error} - Cập nhật thất bại cho ID  #${id} ` }),
    })
  }




  search(filter) {
    if (filter) {
      this.props.history.push(ROUTER.USERMANAGEMENT.concat(`?query=${filter}`))
    } else {
      this.props.history.push(ROUTER.USERMANAGEMENT)
      this.props.getUserManagement()
    }

  }


  render() {
    const { isFetching, meta, history, UserManagementData } = this.props
    console.log(UserManagementData, "UserManagementData")
    return (

      <Card style={{ borderRadius: 5 }}>

        <Row>
          <Col span={8}>
            <Button style={{ float: "left", backgroundColor: '#00d084', borderRadius: 5, border: "#00d084" }} type="primary" >
              <PlusOutlined /> Add User
                            </Button>
            {/* <AddUser
                                //  visible = {this.state.visible}
                                //  onClose = {this.onClose}
                                dataEdit={this.state.dataEdit}
                                closeModal={this._closeModal}
                                isOpen={this.state.openModal}
                                type={this.state.type}
                            /> */}
          </Col>
          <Col span={8}>
            <h1 style={{ float: 'center', fontWeight: 'bold', fontSize: 20 }}>Danh sách tài khoản</h1>
          </Col>
          <Col span={8}>
            <FilterForm
              onChange={(e) => this.search(e)}
            />
          </Col>
        </Row>
        <br />
        <UserList
          UserManagementData={UserManagementData}
          onChangePage={this.onChangePage}
          onChangeSize={this.onChangePage}
          isFetching={isFetching}
          onChangeStatus={this.onChangeStatus}
          meta={meta}
        />

      </Card>
    )
  }

}


const mapStateToProps = (state) => {
  return {
    UserManagementData: select(state, 'userManagementReducer', 'items'),
    isFetching: select(state, 'userManagementReducer', 'isFetching'),
    meta: select(state, 'userManagementReducer', 'meta'),
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    getUserManagement: (filterOptions) => {
      dispatch(getUserManagement(filterOptions));
    },
    updateStatusUser: (payload, meta) => {
      dispatch(updateStatusUser(payload, meta));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WithPageHOC('user', 'data')(UserManagement));
