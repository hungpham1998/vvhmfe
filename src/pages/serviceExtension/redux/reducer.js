import Types from '../../../constants/ActionTypes';
import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { findIndex } from '../../../utils/findIndex';


const listState = fromJS({
    items: [],
    meta: {
        current: 0,
        pageSize: 10,
        total: 0,
      },
    isFetching: false,
    didInvalidate: true,
});


const serviceShopReducer = (state = listState, action) => {
    switch (action.type) {
        case Types.GETTING_SERVICESHOP:
            return state.set('isFetching', true)
        case Types.GET_SERVICESHOP_SUCCESS:
            const { data, metaData } = action.payload
            return state.merge({
                items: data,
                meta: {
                  current: metaData.page,
                  pageSize: metaData.size,
                  total: metaData.total ,
                },
                isFetching: false,
                didInvalidate: false,
            })  
        case Types.CHANGE_STATUS_SERVICESHOP_SUCCESS:
                const items = state.get('items')
                const { id, isPayment } = action.payload
                const index = findIndex(items, id)
                items[index].isPayment = isPayment
                return state.merge({
                  items: [...items],
                  isFetching: false,
                  didInvalidate: false,
                })
        case Types.GET_SERVICESHOP_FAILURE:
            return state.merge({
                isFetching: false,
                didInvalidate: true,
            })
        case Types.CHANGE_STATUS_SERVICESHOP_FAILURE:
            return state.merge({
                isFetching: false,
                didInvalidate: true,
            })
      default:
          return state
    }
}



  

export default serviceShopReducer;
