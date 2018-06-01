import { connect } from 'react-redux';
import { ClientList } from '../views';
import { getSessionSelector } from '../app/reducers';

const mapStateToProps = (state: Object) => getSessionSelector(state);

const mapDispatchToProps = (dispatch: Function) => ({ });

export default connect(mapStateToProps, mapDispatchToProps)(ClientList as any);
