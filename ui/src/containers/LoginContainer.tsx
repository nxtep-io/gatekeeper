import { connect } from 'react-redux';
import { Login } from '../views';
import { getSessionSelector } from '../app/reducers';
import { sessionLoginEmail } from '../app/actions';

const mapStateToProps = (state: Object) => getSessionSelector(state);

const mapDispatchToProps = (dispatch: Function) => ({
  loginAccountEmail: (email, password) => dispatch(sessionLoginEmail(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login as any);
