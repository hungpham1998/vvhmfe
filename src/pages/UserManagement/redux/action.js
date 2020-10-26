import { API } from "../../../constants/api";
import callApi from "../../../utils/apiCall";
import Types from  "../../../constants/ActionTypes";

export const getUserManagement = (params) => async dispatch => {
    const api = API.USER.getUserManagement();
    dispatch({ type: Types.GETTING_USER});
    const { response, error } = await callApi({ ...api, params });
    if(!error && response.status === 200 && response.data.success === true ) {
        console.log(response.data)
        dispatch({
            type: Types.GET_USER_SUCCESS,
            payload: response.data
        })
    }
    else {
        dispatch({
            type: Types.GET_USER_FAILURE
        })
    }
  }


  export const updateStatusUser = (payload, meta) => async (dispatch) => {
    const api = API.USER.updateStatusUser();
    dispatch({ type: Types.UPDATTING_STATUS_USER });
    const { response, error } = await callApi({ ...api, payload });
    if(!error && response.status === 200 && response.data.success === true) {
        dispatch({
            type: Types.CHANGE_STATUS_USER_SUCCESS,
            payload: response.data.data
        })
        if (meta && meta.onSuccess) {
            meta.onSuccess()
        }
    }
    else {
        dispatch({ type: Types.CHANGE_STATUS_USER_FAILURE })
        if (meta && meta.onError) {
            meta.onError()
        }
    }
}




