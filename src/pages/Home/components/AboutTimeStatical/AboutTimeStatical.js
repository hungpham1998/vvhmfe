import { Col, Divider, Row } from 'antd';
import React, { Component } from 'react';
import { API } from '../../../../constants/api';
import FilterTime from './components/FilterTime';
import moment from 'moment';
import callApi from '../../../../utils/apiCall';
import AboutTimeChart from './components/AboutTimeChart';
import formatMoney from '../../../../constants/ConvertMoney';
class AboutTimeStatical extends Component {
    constructor(props) {
        super(props);
        this.state = {
            onSelectData: moment()
            .startOf("week")
            .subtract(-1, "days")
            .format("DD-MM-YYYY")
            .concat("/", moment().format("DD-MM-YYYY")),
            isFetching: false,
            dataChart: {},
        
        };
    }

    componentDidMount() {
        this.getDataApi(this.state.onSelectData)
        console.log(this.state.onSelectData)
    }

    getDataApi = (time) => {
        this.setState({ isFetching: true });
        const api = API.REPORTS.getReportAbouts();
        const params = { month: time };
        callApi({ ...api, params }).then((({ response, error }) => {
            if (!error && response.status === 200 && response.data) {
                let data = {};
                const dataReport = response.data.data;
                if (dataReport) {      
                    data = this.convertData(dataReport, response.data.success);
                    this.setState({
                        isFetching: false,
                        dataChart: data,
                    });
                }
            }
            else {
                this.setState({ isFetching: false });
            }
        }))
    }


    convertData = (data, success) => {
        const series =[];
        const dataTitle = [];
        let element = {};
        const dataDetails =[];
        
        if (data) {
            for (let i in data) {
                if (typeof data[i] == 'object') {
                    for (let j in data[i]) {
                        dataTitle.push(j);
                        series.push(data[i][j]);
                        dataDetails.push(element={
                            title: j,
                            data:data[i][j]
                        });
                    }
                }
            }
            let countTotal = 0;
            series.map(item => { countTotal += item });
            return { series, success, dataTitle, dataDetails, countTotal};
        }

    }


    onFilter = async (e) => { 
        const datafilter = moment(e.fromDate).format("DD-MM-YYYY").concat("/",moment(e.toDate).format("DD-MM-YYYY"));
        await this.getDataApi(datafilter);
        this.setState({ onSelectData: datafilter });
    }


    render() { 
        const { dataChart: { series, success, dataTitle, dataDetails, countTotal },
        onSelectData,
            isFetching
        } = this.state;
        return (
            <>
                <Row> 
                    <Col span={6}>
                        <FilterTime
                            onFilter={(e) => this.onFilter(e)}
                            onSelect={(e) => {
                                this.getDataApi(e);
                                this.setState({ onSelectData: e });
                            }} />
                    </Col>
                    <Col span={18}>
                        {success == true && isFetching == false && (
                            <AboutTimeChart                            
                                series={series}
                                dataTitle={dataTitle}
                                onSelectData={onSelectData}
                            />)}
                           
                    </Col>
                </Row> 
                <Row >
                    <Col span={6}></Col>
                    <Col span={18}>
                        <Row>
                            <h1> Thông tin chi tiết  doanh thu dịch vụ :  <br /></h1>
                        </Row>
                        <Row>
                            {success === true && isFetching == false && dataDetails.length > 0 && (
                            
                                dataDetails.map((item, index) => {
                                    if (index % 2 === 0) {
                                        return (
                                            <Col span={12} key={index} >
                                                <span key={index} >doanh thu theo {item.title} : <b>{formatMoney(item.data)}</b> </span>
                                            </Col>
                                        )
                                    } 
                                    else {
                                        return (
                                            <Col span={12} key={index} >
                                                <span key={index} >doanh thu theo {item.title} : <b>{formatMoney(item.data)}</b></span>
                                            </Col>
                                        )
                                    }
                                })
                            
                            )}
                            <h3> Tổng cộng : {formatMoney(countTotal)}</h3>
                        </Row>
                    </Col>
                </Row>
            </>
        );
    }
}
 
export default AboutTimeStatical;
