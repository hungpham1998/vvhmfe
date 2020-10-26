// import  Types from '../../../constants/ActionTypes';
// var initialState: any = [];

// var findIndex = (stores: any, id: number) => {
//     var result = -1;
//     stores.forEach((store: any, index: number) => {
//         if (store.id === id) {
//             result = index;
//         }
//     });
//     return result;
// }

// const stores = (state = initialState, action: any) => {
//     var index = -1;
//     var { id, store } = action;
//     switch (action.type) {
//         case Types.FETCH_STOREHOUSE:
//             state = action.stores;
//             return [...state];
//         case Types.DELETE_STOREHOUSE:
//             index = findIndex(state, id);
//             state.splice(index, 1);
//             return [...state];
//         case Types.ADD_STOREHOUSE:
//             state.push(action.store);
//             return [...state];
//         case Types.UPDATE_STOREHOUSE:
//             index = findIndex(state, store.id);
//             state[index] = store;
//             return [...state];
//         default: return [...state];
//     }
// };

// export default stores;
