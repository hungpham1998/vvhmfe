import { EditOutlined,DeleteOutlined  } from '@ant-design/icons';
import { Card, Col, Row,DatePicker,Button ,Divider,Image,Space,Tag,Popconfirm,Table} from 'antd';
import React, { Fragment } from 'react'
import moment from 'moment';
import YearFilter from './components/YearFilter';
import MonthFilter from './components/MonthFilter';
import ChartUserStatics from './components/ChartUserStatics';
import { API } from '../../../../constants/api';
import callApi from '../../../../utils/apiCall';


class UserStatistics extends React.Component{

  constructor(props) {
    super(props)
    this.state={
      isFetching: false,
      yearFilter: parseInt(moment().format('YYYY')),
      dataChart: {}
    }
  }

  componentDidMount() {
    this.getApiReport(this.state.yearFilter)
  }

  getApiReport = (year) => {
    this.setState({ isFetching: true });
        const api = API.REPORTS.getReportShop();
        const params = { year: year };
        callApi({ ...api, params }).then((({ response, error }) => {
            if (!error && response.status === 200 && response.data) {
                let data = {};
                const dataReport = response.data.data || [];
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
    const series = [];
    const dataTitle = [];
    data.forEach(item => {
      series.push(item.countShop);
      dataTitle.push(`Tháng` + item.month);
    })
    return {series, dataTitle, success};
  }
    
  onChange = (e, field) => {
    const target = e.target;
    const name = field;
    const value = target.value;
    this.setState({
        [name]: value
    });
  }
  
  onFinish = () => { this.getApiReport(this.state.yearFilter); }
  render() {
    const { isFetching, dataChart: { series, dataTitle, success } } = this.state;
    return (
      <div> 
        <Row> 
          <Col span={6}>
            <YearFilter
              yearFilter={this.state.yearFilter}
              onChange={(e, yearFilter) => this.onChange(e, 'yearFilter')}
              onFinish={() => this.onFinish()}
            />
          </Col>
          <Col span={18}  >
            <h2 style={{ textAlign: 'center' }}> Thống kê người dùng mới theo năm {this.state.yearFilter}</h2>
            {success === true && isFetching == false && (
              <ChartUserStatics
                series={series}
                dataTitle={dataTitle}
              /> 
            )}
          
          </Col>
        </Row>
        {/* <Divider  /> */}
        {/* <Row> 
            <MonthFilter/>
        </Row> */}
        {/* <Row>
          <h2 style={{ textAlign: 'center'}}> Danh sách người dùng đăng kí mới trong tháng 8</h2>
          {/* <Table dataSource={dataSource} columns={columns}   /> */}
        {/* </Row> */} 
      </div>
    )
  }
}

export default UserStatistics;
