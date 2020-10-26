import React, { Component, } from 'react';
import {  Card, Col,  Row,  notification, } from 'antd';
import { connect } from 'react-redux';
import select from '../../utils/select';
import { getShop, updateStatus } from './redux/action';
import WithPageHOC from '../../hoc/page';
import ROUTER from '../../constants/Router';
import FilterForm from '../../components/Filter/FilterForm';
import ShopList from './components/ShopList';




class ShopIndex extends Component {

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
            props.getShop(JSON.parse(params))
        } else {
            props.getShop()
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
        this.props.history.push(ROUTER.SHOP.concat(`?${urlParameters.join('&')}`))
      } else {
        this.props.history.push(ROUTER.SHOP.concat(`?page=${page}&size=${size}`))
      }
    }
  
  onChangeStatus =  (id, value) => {
    const payload = { id: id, status: !value };
      this.props.updateStatus(payload, {
        onSuccess: () => {
          notification.success({ message: `Đã cập nhật trạng thái cho phiếu #${id}` });
        },
        onError: error => notification.error({ message: `${error} - Cập nhật thất bại cho phiếu #${id}` }),
      })
    }
  

  search(filter) {
    if (filter) {
      this.props.history.push(ROUTER.SHOP.concat(`?query=${filter}`))
    } else {
      this.props.history.push(ROUTER.SHOP)
      this.props.getShop()
    }
      
  }


  render() {
      const { isFetching, meta, history, shopData } = this.props
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
                  <ShopList
                    shopData={shopData}
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
    shopData: select(state, 'shopReducer', 'items'),
    isFetching: select(state, 'shopReducer', 'isFetching'),
    meta: select(state, 'shopReducer', 'meta'),
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    getShop: (filterOptions) => {
      dispatch(getShop(filterOptions));
    },
    updateStatus: (payload, meta) => {
      dispatch(updateStatus(payload, meta));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WithPageHOC('shop', 'data')(ShopIndex));
