import { API } from "../../../constants/api";
import callApi from "../../../utils/apiCall";
import Types from  "../../../constants/ActionTypes";

export const getUserSystem = (params) => async dispatch => {
    const api = API.USERSYSTEM.getUserSystem();
    dispatch({ type: Types.GETTING_USERSYSTEM});
    const { response, error } = await callApi({ ...api, params });
    if(!error && response.status === 200 && response.data.success === true ) {
        console.log(response.data)
        dispatch({
            type: Types.GET_USERSYSTEM_SUCCESS,
            payload: response.data
        })
    }
    else {
        dispatch({
            type: Types.GET_USERSYSTEM_FAILURE
        })
    }
  }


  export const updateStatus = (payload, meta) => async (dispatch) => {
    const api = API.USERSYSTEM.updateStatus();
    dispatch({ type: Types.UPDATTING_STATUS_USERSYSTEM });
    const { response, error } = await callApi({ ...api, payload });
    if(!error && response.status === 200 && response.data.success === true) {
        dispatch({
            type: Types.CHANGE_STATUS_USERSYSTEM_SUCCESS,
            payload: response.data.data
        })
        if (meta && meta.onSuccess) {
            meta.onSuccess()
        }
    }
    else {
        dispatch({ type: Types.CHANGE_STATUS_USERSYSTEM_FAILURE })
        if (meta && meta.onError) {
            meta.onError()
        }
    }
}

export const addUserSystem = (payload, meta) => async (dispatch) => {
    const api = API.USERSYSTEM.addUserSystem();
    const { response, error } = await callApi({ ...api, payload });
    if(!error && response.status === 200 && response.data.success === true) {
        dispatch({
            type: Types.ADD_USERSYSTEM_SUCCESS,
            payload: response.data.data
        })
        if (meta && meta.onSuccess) {
            meta.onSuccess()
        }
    }
    else {
        dispatch({ type: Types.ADD_USERSYSTEM_FAILURE })
        if (meta && meta.onError) {
            meta.onError(error)
        }
    }
}


export const updateUserSystem = (payload, meta) =>async(dispatch) => {

    const api = API.USERSYSTEM.updateUserSystem();
    dispatch({ type: Types.UPDATE_USERSYSTEM });
    const { response, error } = await callApi({ ...api, payload });
    if(!error && response.status === 200 && response.data.success === true) {
        dispatch({
            type: Types.UPDATE_USERSYSTEM_SUCCESS,
            payload: response.data.data
        })
        if (meta && meta.onSuccess) {
            meta.onSuccess()
        }
    }
    else {
        dispatch({ type: Types.UPDATE_USERSYSTEM_FAILURE })
        if (meta && meta.onError) {
            meta.onError(error)
        }
    }
}

export const deleteUserSystem = (params, meta) => async (dispatch) => {
    dispatch({ type: Types.DELETE_USERSYSTEM });
    const api = API.USERSYSTEM.deleteUserSystem();
    const { response, error } = await callApi({ ...api, params });
    if(!error && response.status === 200 && response.data.success === true) {
        dispatch({
            type: Types.DELETE_USERSYSTEM_SUCCESS
        })
        if (meta && meta.onSuccess) {
            meta.onSuccess()
        }
    }
    else {
        dispatch({ type: Types.DELETE_USERSYSTEM_FAILURE })
        if (meta && meta.onError) {
            meta.onError(error)
        }
    }
}
