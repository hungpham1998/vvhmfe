import Types from './ActionTypes';
const alert = (state = {}, action: any)=> {
    switch (action.Types) {
      case Types.SUCCESS:
        return {
          type: 'alert-success',
          message: action.message
        };
      case Types.ERROR:
        return {
          type: 'alert-danger',
          message: action.message
        };
      case Types.CLEAR:
        return {};
      default:
        return state
    }
  }

export default alert;
