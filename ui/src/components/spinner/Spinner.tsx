import * as React from 'react';
import { RingLoader } from 'react-spinners';

import './Spinner.scss';

export interface SpinnerProps {
  visible: boolean;
  color?: string;
}

export interface SpinnerState {
}

export default class Spinner extends React.Component<SpinnerProps, SpinnerState> {
  static defaultProps = { color: '#1A3790' };
  state = {};

  render() {
    const { color, visible } = this.props;

    if (!visible) {
      return null;
    }

    return (
      <div className="dimmer">
        <div className="spinner">
          <RingLoader color={color} loading={visible} />
        </div>
      </div>
    );
  }
}
