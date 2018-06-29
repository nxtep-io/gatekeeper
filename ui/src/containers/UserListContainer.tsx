import { connect } from 'react-redux';
import { UserList } from '../views';
import { usersFetchList } from '../app/actions';
import { getSessionSelector, getUsersSelector } from '../app/reducers';

const mapStateToProps = (state: Object) => ({
  ...getSessionSelector(state),
  ...getUsersSelector(state),
});

const mapDispatchToProps = (dispatch: Function) => ({
  usersFetchList: () => dispatch(usersFetchList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList as any);
