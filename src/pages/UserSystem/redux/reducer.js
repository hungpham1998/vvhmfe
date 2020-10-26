
import { fromJS } from "immutable";
import Types from '../../../constants/ActionTypes';
import { findIndex } from "../../../utils/findIndex";

const userSystemState = fromJS({
    items: [],
    meta: {
        current: 0,
        pageSize: 10,
        total: 0,
      },
    isFetching: false,
    didInvalidate: true,
});


const userSystemReducer = (state = userSystemState, action) => {
    switch (action.type) {
        case Types.GETTING_USERSYSTEM:
        // case Types.DELETE_USERSYSTEM:
            return state.set('isFetching', true)
        case Types.GET_USERSYSTEM_SUCCESS:
            const { data, metaData } = action.payload
            return state.merge({
                items: data,
                meta: {
                  current: metaData.page,
                  pageSize: metaData.size,
                  total: metaData.total,
                },
                isFetching: false,
                didInvalidate: false,
            }) 
        case Types.CHANGE_STATUS_USERSYSTEM_SUCCESS:
            const items = state.get('items')
            const { id, active } = action.payload
            const index = findIndex(items, id)
            console.log(index.active)
            items[index].active = active
            return state.merge({
                items: [...items],
                isFetching: false,
                didInvalidate: false,
            })
        case Types.DELETE_USERSYSTEM_SUCCESS:
        case Types.GET_USERSYSTEM_FAILURE:
        case Types.CHANGE_STATUS_USERSYSTEM_FAILURE:
        case Types.DELETE_USERSYSTEM_FAILURE:
            return state.merge({
                isFetching: false,
                didInvalidate: true,
            })
        case Types.ADD_SERVICESHOP_SUCCESS:
            return state.merge({
                isFetching: false,
                didInvalidate: false,
            })
      default:
          return state
    }
}



  

export default userSystemReducer;
