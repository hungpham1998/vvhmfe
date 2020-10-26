import React, { Component, Fragment} from 'react';
import {  Steps,  Card, Col,  Row, Select,  notification,  } from 'antd';
import { connect } from 'react-redux';
import select from '../../utils/select';
import { getServiceShop, updateStatus } from './redux/action';
import WithPageHOC from '../../hoc/page';
import ROUTER from '../../constants/Router';
import ServiceShopList from './components/ServiceShopList';
import FilterForm from '../../components/Filter/FilterForm';


class ServiceExtension extends Component {

    constructor(props) {
        super(props)
        this.state = {
          filterOptions: {},
          search: null,
          current: 0
        }
  }
  

    static getDerivedStateFromProps(props, state) {
      const { search } = props.history.location
      let params
      if (search !== state.search) {
        const filterOptions = search.split('?')[1]
        if (filterOptions !== undefined) {
          params = `{"${decodeURI(filterOptions)
            .replace(/"/g, '\\"').replace(/&/g, '","')
            .replace(/=/g, '":"')}"}`
          props.getServiceShop(JSON.parse(params))
        } else {
          props.getServiceShop()
        }
        return { ...state, search, filterOptions: params }
      }
      return state
    }
  
     onChangePage = (page, size) => {
      const { search } = this.props.history.location
      if (search !== '') {
        let params
        const filterOptions = search.split('?')[1]
        if (filterOptions !== undefined) {
          params = `{"${decodeURI(filterOptions)
            .replace(/"/g, '\\"').replace(/&/g, '","')
            .replace(/=/g, '":"')}"}`
        }
        
        const obj = JSON.parse(params)
        params = { ...obj, page, size }
        const urlParameters = []
        Object.entries(params).map(e => {
          if (e[1] !== undefined && e[1] !== '') {
            urlParameters.push(e.join('='))
          }
        })
        this.props.history.push(ROUTER.SERVICE.concat(`?${urlParameters.join('&')}`))
      } else {
        this.props.history.push(ROUTER.SERVICE.concat(`?page=${page}&size=${size}`))
      }
    }
  
  onChangeStatus =  (id, value) => {
    const payload = { id: id, status: !value };
      this.props.updateStatus(payload, {
        onSuccess: () => {
          notification.success({ message: `Đã cập nhật trạng thái cho phiếu #${id} dịch vụ` });
        },
        onError: error => notification.error({ message: `${error} - Cập nhật thất bại cho phiếu #${id} dịch vụ` }),
      })
    }
  

  search(filter) {
    if (filter) {
      this.props.history.push(ROUTER.SERVICE.concat(`?query=${filter}`))
    } else {
      this.props.history.push(ROUTER.SERVICE)
      this.props.getServiceShop()
    }
      
  }


  render() {
    const { isFetching, meta, history, serviceShop } = this.props
    return (
        <>
          <Card style={{ borderRadius: 5, marginBottom: "10px" }}>
              <Row>
                <Col span={8}>
                  <FilterForm
                    onChange={(e) => this.search(e)}
                  />
                </Col>
              </Row>
              <br />
              <Row>
                <Col span={24}>
                  <ServiceShopList
                    serviceShop={serviceShop}
                    onChangePage={this.onChangePage}
                    onChangeSize={this.onChangePage}
                    isFetching={isFetching}
                    onChangeStatus={this.onChangeStatus}
                    meta={meta}
                  />
               </Col>
              </Row>
          </Card>
        </>
    )
  }
     
}


const mapStateToProps = (state) => {
  return {
    serviceShop: select(state, 'serviceShopReducer', 'items'),
    isFetching: select(state, 'serviceShopReducer', 'isFetching'),
    meta: select(state, 'serviceShopReducer', 'meta'),
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    getServiceShop: (filterOptions) => {
      dispatch(getServiceShop(filterOptions));
    },
    updateStatus: (payload, meta) => {
      dispatch(updateStatus(payload, meta));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WithPageHOC('service', 'data')(ServiceExtension));
