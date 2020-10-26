// import  Types from '../../../constants/ActionTypes';
// import callApi from '../../../utils/apiCaller';

// export const actFetchStoreHouseRequest = () => {
//     return (dispatch: any) => {
//         return callApi('store', 'GET', null).then((res: any) => {
//             dispatch(actFetchStoreHouse(res.data));
//         });
//     };
// }

// export const actFetchStoreHouse = (storeHouses: any) => {
//     return {
//         type : Types.FETCH_STOREHOUSE,
//         storeHouses
//     }
// }

// export const actDeleteStoreHouseRequest = (id: number) => {
//     return (dispatch: any) => {
//         return callApi(`store/${id}`, 'DELETE', null).then(res =>{
//             dispatch(actDeleteStoreHouse(id));
//         })
//     }
// }

// export const actDeleteStoreHouse = (id: number) => {
//     return {
//         type : Types.DELETE_STOREHOUSE,
//         id
//     }
// }

// export const actAddStoreHouseRequest = (store: any) => {
//     return (dispatch: any) => {
//         return callApi('store', 'POST', store).then((res: any) => {
//             dispatch(actAddStoreHouse(res.data));
//         });
//     }
// }

// export const actAddStoreHouse = (store: any) => {
//     return {
//         type : Types.ADD_STOREHOUSE,
//         store
//     }
// }

// export const actGetStoreHouseRequest = (id: number) => {
//     return (dispatch: any) => {
//         return callApi(`store/${id}`, 'GET', null).then((res: any) => {
//             dispatch(actGetStoreHouse(res.data));
//         });
//     }
// }

// export const actGetStoreHouse = (store: any) => {
//     return {
//         type : Types.EDIT_STOREHOUSE,
//         store
//     }
// }

// export const actUpdateStoreHouseRequest = (store: any) => {
//     return (dispatch: any) => {
//         return callApi(`store/${store.id}`, 'PUT', store).then((res: any) => {
//             dispatch(actUpdateStoreHouse(res.data));
//         });
//     }
// }

// export const actUpdateStoreHouse = (store: any) => {
//     return {
//         type : Types.UPDATE_STOREHOUSE,
//         store
//     }
// }
