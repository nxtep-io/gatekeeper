import { connect } from 'react-redux';
import { UserSchema } from 'gatekeeper-sdk';
import { getSessionSelector } from '../app/reducers';
import { usersCreate } from '../app/actions';
import { SignUp } from '../views';

const mapStateToProps = (state: Object) => getSessionSelector(state);
const mapDispatchToProps = (dispatch: Function) => ({
  usersCreate: (user: UserSchema) => dispatch(usersCreate(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp as any);
