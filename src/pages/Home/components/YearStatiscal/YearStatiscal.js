import { Button, Card, Col, Input, Row, Form, Divider, Select, notification} from 'antd'
import React, { Component } from 'react'
import PreciousDetailt from './components/PreciousDetailt';
import PreciousFilter from './components/PreciousFilter';
import YearChart from './components/YearChart';
import YearFilter from './components/YearFilter';
import moment from 'moment';
import { API } from '../../../../constants/api';
import callApi from '../../../../utils/apiCall';



class YearStatistical extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            yearFilter: parseInt(moment().format('YYYY')),
            isFetching: false,
            dataChartYear: {},
            FilterPrecious: {
                year: parseInt(moment().format('YYYY')),
                precious: 1
            },
            dataChartPrecious: {},
            dataCardPrecious: [],
        })
    }
    

    onChange = (e, field) => {
        const target = e.target;
        const name = field;
        const value = target.value;
        this.setState({
            [name]: value
        });
    }

    componentDidMount() {
        this.callDataYear(this.state.yearFilter);
        this.callDataPrevious(this.state.FilterPrecious);
      
    }

    callDataYear = (yearFilter) => {
        this.setState({ isFetching: true });
        const api = API.REPORTS.getYearReport();
        const params = { year: yearFilter };
        callApi({ ...api, params }).then((({ response, error }) => {
            if (!error && response.status === 200 && response.data) {
                let data = {};
                const dataReport = response.data.data || [];
                if (dataReport) {          
                    data = this.convertDataYear(dataReport, response.data.success);
                    this.setState({
                        isFetching: false,
                        dataChartYear: data,
                    });
                }
            }
            else {
                this.setState({ isFetching: false });
            }
        }))
    }

    convertDataYear = (data, success) => {
        const dataAPI = [];
        const dataSystem = [];
        const dataLandingpage = [];
        const dataVVAds = [];
        const dataWebsite = [];
        const dataTotal = [];
        const dataMonth = [];
        let series ;
        data.forEach((item) => { 
            dataAPI.push(item.revenue.API);
            dataMonth.push(`tháng ` + item.month);
            dataSystem.push(item.revenue.System);
            dataWebsite.push(item.revenue.Website);
            dataVVAds.push(item.revenue.VVAds);
            dataLandingpage.push(item.revenue.Landingpage);
            dataTotal.push(item.revenue.System + item.revenue.API + item.revenue.Website + item.revenue.VVAds + item.revenue.Landingpage);
        })

        series = [
            { name: 'doanh thu api', type: 'column', data: dataAPI },
            { name: 'doanh thu hệ thống', type: 'column', data: dataSystem },
            { name: 'doanh thu website', type: 'column', data: dataWebsite },
            { name: 'doanh thu quảng cáo', type: 'column', data: dataVVAds },
            { name: 'doanh thu loading page', type: 'column', data: dataLandingpage },
            { name: 'tổng doanh thu', type: 'line', data: dataTotal}
        ]
        return { dataMonth, series, success };
       
    }

    onFilterYear = () => { this.callDataYear(this.state.yearFilter); }


    callDataPrevious = (data) => {
        this.setState({ isFetching: true });
        const api = API.REPORTS.getPreviousOfYear();
        const params = { year: data.year, precious: data.precious };
        callApi({ ...api, params }).then((({ response, error }) => {
            if (!error && response.status === 200 && response.data) {
                let data = {};
                const dataReport = response.data.data || [];
                if (dataReport) {  
                    data = this.convertDataPrevious(dataReport, response.data.success);
                    this.setState({
                        isFetching: false,
                        dataCardPrecious: dataReport,
                        dataChartPrecious: data
                    });
                }
            }
            else {
                this.setState({ isFetching: false });
            }
        }))

    }

    convertDataPrevious = (data, successData) => {
        let dataAPI =0;
        let dataSystem =0;
        let dataLandingpage =0;
        let dataVVAds = 0;
        let dataWebsite = 0 ;
        let dataTotal = 0;
        const dataTitle =[];
        let seriesData;
        let dataInfo;
     
            data.forEach((item) => {
                dataAPI = dataAPI + item.revenue.API;
                dataSystem = dataSystem + item.revenue.System;
                dataLandingpage = dataLandingpage + item.revenue.Landingpage;
                dataVVAds = dataVVAds + item.revenue.VVAds;
                dataWebsite = dataWebsite + item.revenue.Website;
            
            })
        for (let i in data[0]) {
            if (typeof data[0][i] == 'object') {
                for (let j in data[0][i]) {
                    dataTitle.push("doanh thu " + j);
                }
            }
        }
        seriesData = [dataLandingpage, dataAPI, dataSystem, dataVVAds, dataWebsite];
        dataTotal = dataLandingpage + dataAPI + dataSystem + dataVVAds + dataWebsite;
        dataInfo = {
            dataLandingpage: dataLandingpage,
            dataAPI: dataAPI,
            dataSystem: dataSystem,
            dataVVAds: dataVVAds,
            dataWebsite: dataWebsite,
            dataTotal: dataTotal
        }
        return { seriesData, dataTitle, successData, dataInfo};
    }

    onFilterPrecious = async (value) => {
       await this.setState({
            FilterPrecious: value
       })
        this.callDataPrevious(value);
    }


    render() {
        const {
            dataChartYear: { series, dataMonth, success },
            yearFilter,
            dataChartPrecious: {
                seriesData,
                dataTitle,
                successData,
                dataInfo
            },
            dataCardPrecious,
            isFetching,
            FilterPrecious
        } = this.state;

                
        return (
            <>
                <Row> 
                    <Col span={8}>
                        <YearFilter
                            yearFilter={yearFilter}
                            onChange={(e, yearFilter) => this.onChange(e, "yearFilter")}
                            onFilterYear={() => this.onFilterYear()}
                        />
                    </Col>
                    <Col span={16}>
                        <h2 style={{ textAlign: 'center' }}> Thống kê doanh thu theo năm {yearFilter}</h2>
                        {success == true && isFetching == false && (
                            <YearChart
                                series={series}
                                dataMonth={dataMonth}
                        />)}
                    </Col>
                </Row>
                <Divider  />
                <Row> 
                    <Col span={8}>
                        <PreciousFilter
                            onFilterPrecious={(value)=> this.onFilterPrecious(value)}
                        />
                    </Col>
                    <Col span={16} style={{paddingLeft: 50}} >
                        {dataCardPrecious.length > 0
                            && successData !== false &&
                            isFetching == false &&
                            (<PreciousDetailt
                                FilterPrecious={FilterPrecious}
                                dataCard={dataCardPrecious}
                                dataSeries={seriesData}
                                dataTitle={dataTitle}
                                dataInfo={dataInfo}
                            />)
                        }
                    </Col>
                </Row>
            </>
        )
    }

 }

export default YearStatistical
