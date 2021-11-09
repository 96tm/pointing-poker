import React from 'react';
import { connect } from 'react-redux';
import { appActions } from '../redux/slices/app/app-slice';
import { AppDispatch, RootState } from '../redux/store';
import { InfoMessage, TInfoMessageType } from '../redux/types/info-message';

type TErrorBoundaryProps = React.PropsWithChildren<React.ReactNode> &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

class ErrorBoundary extends React.Component<TErrorBoundaryProps> {
  componentDidCatch(): void {
    this.props.showErrorMessage('Something went wrong, sorry about that...');
  }

  render(): JSX.Element {
    return <>{this.props.children}</>;
  }
}

function mapStateToProps(state: RootState) {
  return { currentUser: state.currentUser };
}

function mapDispatchToProps(dispatch: AppDispatch) {
  return {
    showErrorMessage: (message: string) =>
      dispatch(
        appActions.addOneInfoMessage(
          new InfoMessage(message, TInfoMessageType.error).toObject()
        )
      ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorBoundary);
