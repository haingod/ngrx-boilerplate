import { fromJS } from 'immutable';
import { AJAX_SUFFIXES } from '../reduxConstants';

const {
  BEGIN_AJAX_CALL_SUFFIX,
  AJAX_CALL_SUCCEEDED_SUFFIX,
  AJAX_CALL_FAILED_SUFFIX,
  AJAX_CALL_CANCELED_SUFFIX
} = AJAX_SUFFIXES;

function reducer(state = fromJS({}), action: any): any {
  const indexOfDelimiter = action.type.lastIndexOf('_');
  const ajaxName = action.type.substring(0, indexOfDelimiter);
  const ajaxStatus = action.type.substring(indexOfDelimiter);

  switch (ajaxStatus) {
    case BEGIN_AJAX_CALL_SUFFIX:
      return state.set(ajaxName, (state.get(ajaxName) || 0) + 1);
    case AJAX_CALL_SUCCEEDED_SUFFIX:
    case AJAX_CALL_FAILED_SUFFIX:
      if (state.has(ajaxName)) {
        return state.set(ajaxName, (state.get(ajaxName) || 0) - 1);
      }
      return state;
    case AJAX_CALL_CANCELED_SUFFIX:
      if (state.has(ajaxName)) {
        return state.set(ajaxName, 0);
      }
      return state;
    default:
      return state;
  }
}

export default {
  ajax: reducer
};
