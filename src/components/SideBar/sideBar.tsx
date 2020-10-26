import React from "react";
import "antd/dist/antd.css";
import { Image, Layout, Menu } from "antd";
import {
  UserOutlined,ShopOutlined, DollarOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import ROUTER from '../../constants/Router';

const { SubMenu } = Menu;
const { Sider } = Layout;
const data: any = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      name: `Edward King ${i}`,
      age: 32,
      address: `London, Park Lane no. ${i}`,
    });
  }
let columns: any = [];
let title = Object.keys(data[0]);
title.map(item => {
  let columnOb = {
    title: "",
    dataIndex: ""
  };
  columnOb.title = item;
  columnOb.dataIndex = item.toLowerCase();
  columns.push(columnOb);
})

class SideBarComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      collapsed: false,
      nameOfContent: ""
    };
  }
  

  _changeContent = (name: String) => {
      this.setState({
          nameOfContent: name
      })
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  _showContent = () => {
      switch(this.state.nameOfContent) {
          case "Kho":
            return ( 
            <Layout>
                {/* <StoreHouseComponent /> */}
            </Layout>);
        
          default:
              return "";
      }
  }

  render() {
    return (
      <>
        <Sider
          width={200}
          className="site-layout-background"
          trigger={null}
          
          collapsed={this.state.collapsed}
        >
          <div className="logo" >
            <Image src={require("../../assets/banner.jpg")} />
          </div>
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <SubMenu key="sub1" icon={<UserOutlined />} title="Danh mục">
            
              <Menu.Item key="2" onClick={() => this._changeContent("bao cao doanh thu")}>
                <Link to={ROUTER.HOME}>Trang chủ</Link>
              </Menu.Item>
              <Menu.Item key="6" icon={<UserOutlined />} onClick={() => this._changeContent("Quan ly User")}>
                <Link to={ROUTER.USERMANAGEMENT} >Quản lý User</Link>
              </Menu.Item>
              <Menu.Item key="7" onClick={() => this._changeContent("Cua hang")}>
                <Link to={ROUTER.SHOP} >  <ShopOutlined /> Cửa hàng</Link>
              </Menu.Item>
              <Menu.Item key="́8" onClick={() => this._changeContent("Cua hang")}>
                <Link to={ROUTER.SERVICE} >  <DollarOutlined /> Dịch vụ</Link>
              </Menu.Item>
              <Menu.Item key="́9" onClick={() => this._changeContent("Cua hang")}>
                  <Link to={ROUTER.USERSYSTEM} >  <UserOutlined /> Người dùng</Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        { this._showContent() }
    </>
    );
  }
}

export default SideBarComponent;
