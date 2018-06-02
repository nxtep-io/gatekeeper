import { connect } from 'react-redux';
import { UserSchema } from 'gatekeeper-sdk';
import { Account } from '../views';
import { getSessionSelector, getUsersSelector } from '../app/reducers';
import { sessionLoginEmail, usersUpdate } from '../app/actions';

const mapStateToProps = (state: Object) => ({
  ...getSessionSelector(state),
  ...getUsersSelector(state),
});

const mapDispatchToProps = (dispatch: Function) => ({
  usersUpdate: (id: string, user: UserSchema) => dispatch(usersUpdate(id, user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Account as any);
