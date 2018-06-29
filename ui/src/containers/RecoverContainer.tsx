import { connect } from 'react-redux';
import { UserSchema } from 'gatekeeper-sdk';
import { getSessionSelector, getUsersSelector } from '../app/reducers';
import { usersRecoverPassword } from '../app/actions';
import { Recover } from '../views';

const mapStateToProps = (state: Object) => ({
  ...getSessionSelector(state),
  ...getUsersSelector(state),
});

const mapDispatchToProps = (dispatch: Function) => ({
  usersRecoverPassword: (email: string) => dispatch(usersRecoverPassword(email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Recover as any);
