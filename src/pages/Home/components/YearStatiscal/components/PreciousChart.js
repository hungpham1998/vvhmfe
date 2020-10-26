import React, { Component } from 'react'
import ReactApexChart from 'react-apexcharts';
import formatMoney from '../../../../../constants/ConvertMoney';

class PreciousChart extends Component {

    constructor(props) {
        super(props);

        this.state = {
            series: this.props.data.dataChart,
            options: {
              chart: {
                width: 380,
                type: 'pie',
              },
              labels: this.props.data.Title,
              responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200
                  },
                  legend: {
                    position: 'bottom'
                  }
                }
              }],
              yaxis: {
                axisBorder: {
                  show: false
                },
                axisTicks: {
                  show: false
                },
                labels: {
                  show: false,
                  formatter(val) {
                    return formatMoney(val) ;
                  }
                }
              }
            },
          };
      }
    render() {
        return (
            <div style={{width: 350}}>
                <ReactApexChart options={this.state.options} series={this.state.series}  type="pie" height={390} />
            </div>
        )
    }
}

export default PreciousChart;
