import React, { Component } from 'react'

import ReactApexChart from 'react-apexcharts';
import formatMoney from '../../../../../constants/ConvertMoney';
class YearChart extends Component {


    constructor(props) { 
        super(props);
        this.state = {
            series: this.props.series,
            options: {
                chart: {
                    height: 350,
                    type: "line",
                    toolbar: { show: false },
                    zoom: {
                      enabled: false
                    },
                    stacked: false
                  },
                  plotOptions: {
                    bar: {
                      dataLabels: {
                        position: "top"
                      }
                    }
                  },
                  dataLabels: {
                    enabled: false
                  },
                  stroke: {
                    width: [1, 1, 4]
                  },
                  legend: {
                    show: true,
                    onItemClick: {
                      toggleDataSeries: false
                    },
                    onItemHover: {
                      highlightDataSeries: false
                    }
                  },
                  xaxis: {
                    categories: this.props.dataMonth,
                    position: "bottom",
                    axisBorder: {
                      show: false
                    },
                    axisTicks: {
                      show: false
                    },
                    crosshairs: {
                      fill: {
                        type: "gradient",
                        gradient: {
                          colorFrom: "#D8E3F0",
                          colorTo: "#BED1E6",
                          stops: [0, 100],
                          opacityFrom: 0.4,
                          opacityTo: 0.5
                        }
                      }
                    },
                    tooltip: {
                      enabled: true
                    },
                    labels: {
                      show: true,
                      formatter(value) {
                        return (
                            value
                        );
                      }
                    }
                  },
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
            }
        }
    }
    
    render() {
        return (
            <>
                 <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={350} width={750}/>
            </>
        )
    }
}

export default  YearChart ;
