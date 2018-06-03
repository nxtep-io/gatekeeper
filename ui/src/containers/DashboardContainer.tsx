import { connect } from 'react-redux';
import { Dashboard } from '../views';
import { getSessionSelector, getAnalyticsSelector } from '../app/reducers';
import { analyticsFetchActive } from '../app/actions';

const mapStateToProps = (state: Object) => ({
  ...getSessionSelector(state),
  ...getAnalyticsSelector(state),
});

const mapDispatchToProps = (dispatch: Function) => ({
  analyticsFetchActive: () => dispatch(analyticsFetchActive()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard as any);
