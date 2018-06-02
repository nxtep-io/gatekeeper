import { connect } from 'react-redux';
import { Account } from '../views';
import { getSessionSelector } from '../app/reducers';
import { sessionLoginEmail } from '../app/actions';

const mapStateToProps = (state: Object) => getSessionSelector(state);
const mapDispatchToProps = (dispatch: Function) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Account as any);
