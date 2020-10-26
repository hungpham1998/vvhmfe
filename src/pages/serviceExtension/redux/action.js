import callApi from '../../../utils/apiCall';
import { API } from "../../../constants/api";
import Types from "../../../constants/ActionTypes";


export const getServiceShop = (params) => async dispatch => {
    const api = API.SERVICESHOP.getServiceShop();
    dispatch({ type: Types.GETTING_SERVICESHOP });
    const { response, error } = await callApi({ ...api, params });
    if(!error && response.status === 200 && response.data.success === true) {
        dispatch({
            type: Types.GET_SERVICESHOP_SUCCESS,
            payload: response.data
        })
    }
    else {
        dispatch({
            type: Types.GET_SERVICESHOP_FAILURE
        })
    }
  }


export const updateStatus = (payload, meta) => async (dispatch) => {
    const api = API.SERVICESHOP.updateStatus();
    dispatch({ type: Types.UPDATTING_STATUS_SERVICESHOP });
    const { response, error } = await callApi({ ...api, payload });
    if(!error && response.status === 200 && response.data.success === true) {
        dispatch({
            type: Types.CHANGE_STATUS_SERVICESHOP_SUCCESS,
            payload: response.data.data
        })
        if (meta && meta.onSuccess) {
            meta.onSuccess()
        }
    }
    else {
        dispatch({ type: Types.CHANGE_STATUS_SERVICESHOP_FAILURE })
        if (meta && meta.onError) {
            meta.onError()
        }
    }
  }


// export const getRequests = (params) => async (dispatch) => {
//     const api = API.SERVICESHOP.getRequest();
//     dispatch({ type: Types.GETTING_REQUESTS });
//     const { response, error } = await callApi({ ...api, params })
//     console.log("aaa")
//     if (!error && response.status === 200) {
//         if(response.data){
//             dispatch({
//                 type: Types.GET_REQUESTS_SUCCESS,
//                 payload: response.data
//             })
//         }
//         else {
//             dispatch({ type: Types.GET_REQUESTS_FAILURE })
//         }
//     }
//     else {
//         dispatch({ type: Types.GET_REQUESTS_FAILURE })
//     }

// }
