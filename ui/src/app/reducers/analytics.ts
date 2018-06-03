import {
  ANALYTICS_FETCH_ACTIVE,
  ANALYTICS_FETCH_ACTIVE_ERROR,
  ANALYTICS_FETCH_ACTIVE_REQUEST,
  ANALYTICS_FETCH_ACTIVE_RESPONSE,
} from '../actions/types';

const initialState = {
  active: false,
  error: false,
  isLoading: false,
};

export const getAnalyticsSelector = (state: any) => ({
  error: state.analytics.error,
  isLoading: state.analytics.isLoading,
  active: state.analytics.active,
});

const analyticsReducer = (state: any = initialState, action: any) => {

  switch (action.type) {
    // Fetch the active information
    case ANALYTICS_FETCH_ACTIVE:
      return {
        ...state,
        active: false,
      };
    // Handles the requesting state
    case ANALYTICS_FETCH_ACTIVE_REQUEST:
      return {
        ...state,
        error: false,
        isLoading: true,
      };
    // Handles the analytics fetch response
    case ANALYTICS_FETCH_ACTIVE_RESPONSE:
      return {
        ...state,
        active: action.payload,
        error: false,
        isLoading: false,
      };
    // Handles the analytics fetch error
    case ANALYTICS_FETCH_ACTIVE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default analyticsReducer;
