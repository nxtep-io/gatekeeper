import { connect } from 'react-redux';
import { UserSchema } from 'gatekeeper-sdk';
import { getSessionSelector, getUsersSelector } from '../app/reducers';
import { usersSetPassword } from '../app/actions';
import { Password } from '../views';

const mapStateToProps = (state: Object) => ({
  ...getSessionSelector(state),
  ...getUsersSelector(state),
});

const mapDispatchToProps = (dispatch: Function) => ({
  usersSetPassword: (data: { token: string, password: string }) =>
    dispatch(usersSetPassword(data.token, data.password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Password as any);
