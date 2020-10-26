import React, { Component } from 'react'
import { Card, Tabs } from 'antd';
import UserStatistics from './components/UserStatical/UserStatical';
import YearStatistical from './components/YearStatiscal/YearStatiscal';
import AboutTimeStatical from './components/AboutTimeStatical/AboutTimeStatical';

const { TabPane } = Tabs;
class HomeComponents extends Component {
    render() {
        return (
            <>
                <Tabs style={{ background: 'white', padding: 20}} defaultActiveKey="1">
                    <TabPane tab="Thống kê người dùng" key="1">
                       <UserStatistics />
                    </TabPane>
                    <TabPane tab="Thông kê doanh thu dịch vụ theo thời gian" key="3">
                       <AboutTimeStatical />
                    </TabPane>
                    <TabPane tab="Thống kê doanh thu dịch vụ theo năm" key="2">
                        <YearStatistical />
                    </TabPane>
                </Tabs>   
            </>
        )
    }
}

export default HomeComponents;
