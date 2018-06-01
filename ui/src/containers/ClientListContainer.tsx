import { connect } from 'react-redux';
import { ClientList } from '../views';
import { clientsFetchList } from '../app/actions';
import { getSessionSelector, getClientsSelector } from '../app/reducers';

const mapStateToProps = (state: Object) => ({
  ...getSessionSelector(state),
  ...getClientsSelector(state),
});

const mapDispatchToProps = (dispatch: Function) => ({
  clientsFetchList: () => dispatch(clientsFetchList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientList as any);
