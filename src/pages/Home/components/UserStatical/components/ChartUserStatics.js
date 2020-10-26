import React, { Component } from 'react';
import Chart from 'react-apexcharts';

class ChartUserStatics extends Component {
    constructor(props) {
        super(props);
        this.state = {
          
          series: [{
            name: 'Người dùng đăng kí mới',
            data: this.props.series
          }],
          options: {
            chart: {
              height: 350,
              type: 'bar',
              toolbar: { show: false },
            },
            plotOptions: {
              bar: {
                dataLabels: {
                  position: 'top', 
                },
              }
            },
            dataLabels: {
              enabled: true,
              formatter: function (val) {
                return val ;
              },
              offsetY: -20,
              style: {
                fontSize: '12px',
                colors: ["#ff1a75"]
              }
            },
            
            xaxis: {
              categories: this.props.dataTitle,
              position: 'button',
              axisBorder: {
                show: false
              },
              axisTicks: {
                show: false
              },
              crosshairs: {
                fill: {
                  type: 'gradient',
                  gradient: {
                    colorFrom: '#D8E3F0',
                    colorTo: '#BED1E6',
                    stops: [0, 100],
                    opacityFrom: 0.4,
                    opacityTo: 0.5,
                  }
                }
              },
              tooltip: {
                enabled: true,
              }
            },
            yaxis: {
              axisBorder: {
                show: false
              },
              axisTicks: {
                show: false,
              },
              labels: {
                show: false,
                formatter: function (val) {
                  return val + ` người`;
                }
              } 
            },  
          },
        };
    }
    render() { 
        return (
            <div>
            <Chart options={this.state.options} series={this.state.series} type="bar" height={350} width={750}/> 
            </div>
        );
    }
}
 
export default ChartUserStatics;
