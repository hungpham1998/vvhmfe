import React from "react";
import "antd/dist/antd.css";
import {  Layout,  Modal, } from "antd";
import UserDropdown from "./Components/UserDropdown";
import Avatar from "antd/lib/avatar/avatar";
import ROUTER from "../../constants/Router";
import select from "../../utils/select";
import { connect } from "react-redux";
import { logoutUser } from "../../pages/auth/login/redux/action";
import { withRouter } from "react-router-dom";
import { getAccount } from "../../pages/auth/AuthDetail/redux/action";
import jwt_decode from "jwt-decode";

class HeaderComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  componentDidMount() {
    const accountId = jwt_decode(localStorage.getItem('jwtToken'));
    const params = { id: accountId.sub }; 
    this.props.getAccount(params);
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  logOut = () => {
    Modal.confirm({
      title: 'Bạn chắc chắn đăng xuất ?',
      okText: 'Có',
      cancelText: 'Không',
      onOk: () => {
        this.props.logOut()
        this.props.history.push(ROUTER.AUTH.LOGIN);
      },
      onCancel() {
      },
    })
  }

  
  onChangeProfile = () => {
    this.props.history.push(ROUTER.ACCOUNT.AUTHDETAIL)
  }

  onChangePassword = () => {
    this.props.history.push(ROUTER.ACCOUNT.PASSWORD)
  }
  
  render() {
    return (
    <div style={{ padding: 20}} >
        <span style={{
          paddingLeft: '30px',
          fontSize: '24px'
        }}
        >
          {/* {title} */}
        </span>

        

        <div
          style={{ float: 'right' }}
        >
          {/* #" className="head-example" />
          </Badge>
          <Badge count={1000} overflowCount={999}>
            <a href="#" className="head-example" />
          </Badge> */}
          {/* <NotificationDropdown
            notifications={notifications}
            showAll={this.showAll}
            showDetail={this.showDetail}
            onChangeNotiType={this.onChangeNotiType}
          /> */}
         <span style={{ marginRight: 10 }}>
            {'Xin chào, '}
            <b>{this.props.accountDetails.username}</b>
            !
          </span>
          <UserDropdown onClick={this.onChangeProfile} logOut={this.logOut} onChangePassword={this.onChangePassword}>
            <Avatar
              src={ 'https://s3.amazonaws.com/uifaces/faces/twitter/iduuck/128.jpg'}
            />
          </UserDropdown>
        </div>
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch, props) => {
  return {
    logOut: () => {
      dispatch(logoutUser())
    },
    getAccount: (params) => {
      dispatch(getAccount(params));
    },
    }
}
const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: select(state, 'authReducer', 'isAuthenticated'),
    isFetching: select(state, 'authReducer', 'isFetching'),
    error: select(state, 'authReducer', 'error'),
    accountDetails: select(state, 'authDetailReducer', 'accountDetails'),
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderComponent));
