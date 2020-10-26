import React, { Component } from 'react';
import { message, Steps, Modal, Card, Col, Divider, Button, Row, Select, Form, Table, Input, notification } from 'antd';
import { connect } from 'react-redux';
import select from '../../utils/select';
import WithPageHOC from '../../hoc/page';
import ROUTER from '../../constants/Router';
import { PlusOutlined } from '@ant-design/icons';
import FilterForm from '../../components/Filter/FilterForm';
import {deleteUserSystem, getUserSystem,  updateStatus} from '../UserSystem/redux/action';
import UserSystemList from './Components/UserSystemList';
import FromUserSystem from './Components/FromUserSystem';
import _ from 'lodash';


class UserSystem extends Component {

  constructor(props) {
    super(props)
    this.state = {
        filterOptions: {},
        search: null,
        type: '',
        showModal: false,
        dataEdit: {}

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
        props.getUserSystem(JSON.parse(params))
      } else {
        props.getUserSystem()
      }
      return { ...state, search, filterOptions: params }
    }
    return state
  }



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
      this.props.history.push(ROUTER.USERSYSTEM.concat(`?${urlParameters.join('&')}`))
    } else {
      this.props.history.push(ROUTER.USERSYSTEM.concat(`?page=${page}&size=${size}`))
    }
  }


  onChangeStatus = (id, value) => {
    const payload = { id: id, status: !value };
    this.props.updateStatus(payload, {
      onSuccess: () => {
        notification.success({ message: `Đã cập nhật trạng thái cho UserID #${id} ` });
      },
      onError: error => notification.error({ message: `${error} - Cập nhật thất bại cho UserID  #${id} ` }),
    })
  }




  search(filter) {
        if (filter) {
            this.props.history.push(ROUTER.USERSYSTEM.concat(`?query=${filter}`))
        } else {
            this.props.history.push(ROUTER.USERSYSTEM)
            this.props.getUserSystem()
        }

    }
    
    showModal = (type, item) => {
        console.log(item)
        if (type == "update") {
         this.setState({
            showModal: !this.state.showModal,
            type: type, 
            dataEdit: type === "update" ? _.cloneDeep(item) : {}
         });
        } else {
         this.setState({
            showModal: !this.state.showModal,
             type: type,
             dataEdit: null
         });
        }
    };

    onClose = async() => {
        await this.props.getUserSystem()
        this.setState({
          showModal:  !this.state.showModal
        });
    };
    

    onDelete = (data) => {
        let pramas ={id: data.id}
        this.props.deleteUserSystem(pramas, {
            onSuccess: () => {
                notification.success({ message: `Đã xoá thành công tài khoản #${data.username} ` });
                this.props.getUserSystem();
            },
            onError: error => notification.error({ message: `${error} - xoá tài khoản #${data.username}` }),
          })
    }

  render() {
      const { isFetching, meta, history, UserSystemData } = this.props;

    return (
        <Card style={{ borderRadius: 5 }}>
            <Row>
                <Col span={8}>
                    <FilterForm
                    onChange={(e) => this.search(e)}
                    />
                </Col>
                <Col span={8}>
                    <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Danh sách tài khoản</h1>
                </Col>
                <Col span={8} style={{textAlign: 'end'}}>
                    <Button
                        style={{
                            backgroundColor: '#00d084',
                            borderRadius: 5,
                            border: "#00d084"
                        }}
                        type="primary"
                        onClick={() => this.showModal("create", null)}
                    >
                        <PlusOutlined /> Add User
                    </Button>
                    <FromUserSystem
                        visible = {this.state.showModal}
                        onClose={this.onClose}
                        dataEdit = {this.state.dataEdit}
                        type={this.state.type}
                    />
                </Col>
            </Row>
            <br />
            <UserSystemList
                UserSystemData={UserSystemData}
                onChangePage={this.onChangePage}
                onChangeSize={this.onChangePage}
                isFetching={isFetching}
                onDelete={this.onDelete}
                onChangeStatus={this.onChangeStatus}
                meta={meta}
                onEdit={this.showModal}
            />

        </Card>
        )
    }

}


const mapStateToProps = (state) => {
  return {
    UserSystemData: select(state, 'userSystemReducer', 'items'),
    isFetching: select(state, 'userSystemReducer', 'isFetching'),
    meta: select(state, 'userSystemReducer', 'meta'),
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    getUserSystem: (filterOptions) => {
      dispatch(getUserSystem(filterOptions));
    },
    updateStatus: (payload, meta) => {
      dispatch(updateStatus(payload, meta));
    },
      deleteUserSystem: (pramas, meta) => {
          console.log(pramas)
        dispatch(deleteUserSystem(pramas, meta));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WithPageHOC('usersystem', 'data')(UserSystem));
