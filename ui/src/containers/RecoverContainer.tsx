import { connect } from 'react-redux';
import { UserSchema } from 'gatekeeper-sdk';
import { getSessionSelector } from '../app/reducers';
import { usersResetPassword } from '../app/actions';
import { Recover } from '../views';

const mapStateToProps = (state: Object) => getSessionSelector(state);
const mapDispatchToProps = (dispatch: Function) => ({
  usersResetPassword: (email: string) => dispatch(usersResetPassword(email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Recover as any);
