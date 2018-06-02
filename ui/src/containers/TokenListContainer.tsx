import { connect } from 'react-redux';
import { TokenList } from '../views';
import { tokensFetchList } from '../app/actions';
import { getSessionSelector, getTokensSelector } from '../app/reducers';

const mapStateToProps = (state: Object) => ({
  ...getSessionSelector(state),
  ...getTokensSelector(state),
});

const mapDispatchToProps = (dispatch: Function) => ({
  tokensFetchList: query => dispatch(tokensFetchList(query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TokenList as any);
