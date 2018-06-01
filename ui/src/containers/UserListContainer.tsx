import { connect } from 'react-redux';
import { UserList } from '../views';
import { getSessionSelector } from '../app/reducers';

const mapStateToProps = (state: Object) => getSessionSelector(state);

const mapDispatchToProps = (dispatch: Function) => ({ });

export default connect(mapStateToProps, mapDispatchToProps)(UserList as any);
