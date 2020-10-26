import { Card, Col, Divider, Row } from 'antd';
import React, { Component } from 'react'
import formatMoney from '../../../../../constants/ConvertMoney';
import PreciousChart from './PreciousChart';

class PreciousDetailt extends Component {
    render() {
        const { dataCard, dataInfo, dataSeries, dataTitle, FilterPrecious } = this.props;
        return (
        <>
            <div className="site-card-wrapper">
                    <h1> Thống kê doanh thu theo qúy {FilterPrecious.precious} năm {FilterPrecious.year}</h1>
                <Row gutter={16}>
                        {dataCard.map(item => {
                            return (
                                <Col span={8} key={item.month} >
                                    <Card title={`Tháng ${item.month}`} bordered={true} >
                                        <p> loadingpage : {formatMoney(item.revenue.Landingpage)}</p>
                                        <p> apiweb : {formatMoney(item.revenue.API)}  </p>
                                        <p>  hệ thống : {formatMoney(item.revenue.System)}</p>
                                        <p>  quảng cáo : {formatMoney(item.revenue.VVAds)}</p>
                                        <p> website : {formatMoney(item.revenue.Website)}</p>
                                    </Card>
                                </Col>
                            )
                        
                        })}
                </Row>
            </div>
            <Divider />
                <Row>
                <Col span={12}>
                    <PreciousChart data={{
                        dataChart: dataSeries,
                        Title: dataTitle
                    }} />
                 </Col>
                <Col span={12}>
                    
                    <ul>
                        <h1> Chi tiết :</h1>
                        <li> <p> Doanh thu theo loadingpage : {formatMoney(dataInfo.dataLandingpage)}</p>  </li>
                        <li> <p> Doanh thu theo apiweb : {formatMoney(dataInfo.dataAPI)}  </p> </li>
                        <li> <p> Doanh thu theo hệ thống : {formatMoney(dataInfo.dataSystem)}  </p> </li>
                        <li> <p> Doanh thu theo quảng cáo : {formatMoney(dataInfo.dataVVAds)} </p> </li>
                        <li> <p> Doanh thu theo website : {formatMoney(dataInfo.dataWebsite)}  </p> </li>
                        <li> <b>Tổng doanh quý {FilterPrecious.precious} năm {FilterPrecious.year}: {formatMoney(dataInfo.dataTotal)}  </b> </li>
                    </ul> 
               </Col>    
            </Row>
        </>
        )
    }
}


export default PreciousDetailt;
