import { fromJS } from "immutable";
import Types from '../../../constants/ActionTypes';
import { findIndex } from "../../../utils/findIndex";

const userMangementState = fromJS({
    items: [],
    meta: {
        current: 0,
        pageSize: 10,
        total: 0,
      },
    isFetching: false,
    didInvalidate: true,
});


const userManagementReducer = (state = userMangementState, action) => {
    switch (action.type) {
        case Types.GETTING_USER:
            return state.set('isFetching', true)
        case Types.GET_USER_SUCCESS:
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
        case Types.CHANGE_STATUS_USER_SUCCESS:
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
        case Types.GET_USER_FAILURE:
            return state.merge({
                isFetching: false,
                didInvalidate: true,
            })
        case Types.CHANGE_STATUS_USER_FAILURE:
            return state.merge({
                isFetching: false,
                didInvalidate: true,
            })
      default:
          return state
    }
}


  

export default userManagementReducer;
