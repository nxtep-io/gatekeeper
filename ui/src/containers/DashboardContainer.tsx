import { connect } from 'react-redux';
import { Dashboard } from '../views';
import { getSessionSelector } from '../app/reducers';

const mapStateToProps = (state: Object) => getSessionSelector(state);

const mapDispatchToProps = (dispatch: Function) => ({ });

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard as any);
