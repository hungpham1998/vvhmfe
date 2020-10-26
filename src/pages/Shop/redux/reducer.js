import Types from '../../../constants/ActionTypes';
import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { findIndex } from '../../../utils/findIndex';


const shopState = fromJS({
    items: [],
    meta: {
        current: 0,
        pageSize: 10,
        total: 0,
      },
    isFetching: false,
    didInvalidate: true,
});


const shopReducer = (state = shopState, action) => {
    switch (action.type) {
        case Types.GETTING_SHOP:
            return state.set('isFetching', true)
        case Types.GET_SHOP_SUCCESS:
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
        case Types.CHANGE_STATUS_SHOP_SUCCESS:
                const items = state.get('items')
                const { id, isActive } = action.payload
                const index = findIndex(items, id)
                items[index].isActive = isActive
                return state.merge({
                  items: [...items],
                  isFetching: false,
                  didInvalidate: false,
                })
        case Types.GET_SHOP_FAILURE:
            return state.merge({
                isFetching: false,
                didInvalidate: true,
            })
        case Types.CHANGE_STATUS_SHOP_FAILURE:
            return state.merge({
                isFetching: false,
                didInvalidate: true,
            })
      default:
          return state
    }
}



  

export default shopReducer;
