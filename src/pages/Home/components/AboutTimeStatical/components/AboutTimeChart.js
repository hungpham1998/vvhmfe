import React, { Component } from 'react'
import Chart from 'react-apexcharts';
import formatMoney from '../../../../../constants/ConvertMoney';
import moment from 'moment';


 class AboutTimeChart extends Component {

     constructor(props) {
        super(props);

        this.state = {
        
          series: [{
            data: this.props.series
          }],
            options: {
                chart: {
                    type: 'bar',
                    height: 350,
                    toolbar: { show: false },
                },
                plotOptions: {
                    bar: {
                        horizontal: true,
                    }
                },
                dataLabels: {
                    enabled: false
                },
                xaxis: {
                    categories: this.props.dataTitle,
                    labels: {
                        show: true,
                        formatter(value) {
                          return (
                            formatMoney(value)
                          );
                        }
                      }
                },
            }
        
        };
      }
     
    

     render() {
        const data = this.props.onSelectData.split("/");
        let fromDate =data[0];
        let toDate = data[1];
        return (
            <>
                <h2 style={{ textAlign: 'center' }}> Thống kê doanh thu dịch vụ từ {fromDate} đến {toDate} </h2>
                <Chart options={this.state.options} series={this.state.series} type="bar" height={350} />
            </>
        )
    }
}


export default AboutTimeChart;
