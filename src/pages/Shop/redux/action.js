import callApi from '../../../utils/apiCall';
import { API } from "../../../constants/api";
import Types from "../../../constants/ActionTypes";


export const getShop = (params) => async dispatch => {
    const api = API.SHOP.getShops();
    dispatch({ type: Types.GETTING_SHOP });
    const { response, error } = await callApi({ ...api, params });
    if(!error && response.status === 200 && response.data.success === true) {
        dispatch({
            type: Types.GET_SHOP_SUCCESS,
            payload: response.data
        })
    }
    else {
        dispatch({
            type: Types.GET_SHOP_FAILURE,
        })
    }
  }


export const updateStatus = (payload, meta) => async (dispatch) => {
    const api = API.SHOP.updateStatus();
    dispatch({ type: Types.UPDATTING_STATUS_SHOP });
    const { response, error } = await callApi({ ...api, payload });
    if(!error && response.status === 200 && response.data.success === true) {
        dispatch({
            type: Types.CHANGE_STATUS_SHOP_SUCCESS,
            payload: response.data.data
        })
        if (meta && meta.onSuccess) {
            meta.onSuccess()
        }
    }
    else {
        dispatch({ type: Types.CHANGE_STATUS_SHOP_FAILURE })
        if (meta && meta.onError) {
            meta.onError()
        }
    }
  }
