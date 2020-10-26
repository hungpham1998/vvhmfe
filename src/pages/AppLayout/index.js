import React from 'react';
import SideBarComponent from "../../components/SideBar/sideBar";
import HeaderComponent from '../../components/Header/header';
import FooterComponent from '../../components/Footer/footer';
import {  Route, Switch, withRouter  } from 'react-router-dom';
import { Layout } from 'antd';
import ROUTER from '../../constants/Router';
import changePassword from '../auth/ChangePassword';
import AuthDetail from '../auth/AuthDetail';
import ServiceExtension from '../serviceExtension/ServiceExtension';
import HomeComponents from '../Home/Home';
import UserManagement from '../UserManagement/UserManagement';
import ShopIndex from '../Shop/ShopIndex';
import UserSystem from '../UserSystem/UserSystem';

const { Header, Footer, Sider, Content } = Layout;

function AppLayout() {

    return (
      <>
        < Layout style={{ minHeight: '100vh' }}>
          <Sider><SideBarComponent />  </Sider>
          <Layout className="site-layout">
            <HeaderComponent />
            <Content style={{ padding: 20 }}>         
              <Switch>
                <Route path={ROUTER.ACCOUNT.PASSWORD} component={changePassword} exact />
                <Route path={ROUTER.SHOP} component={ShopIndex} exact  />
                <Route path={ROUTER.HOME} component={HomeComponents}  exact/>
                <Route path={ROUTER.USERMANAGEMENT} component={UserManagement} exact />
                <Route path={ROUTER.SERVICE} component={ServiceExtension} exact />
                <Route path={ROUTER.ACCOUNT.AUTHDETAIL} component={AuthDetail} exact />
                <Route path={ROUTER.USERSYSTEM} component={UserSystem} exact/>
              </Switch>
            </Content>
            <Footer>
              <FooterComponent />
            </Footer>
          </Layout>
        </Layout>
          
      </>
    );
  
    
}

export default withRouter(AppLayout);
