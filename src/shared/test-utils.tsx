import React, { ReactNode } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  configureStore,
  PreloadedState,
  EnhancedStore,
  AnyAction,
} from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import {
  render as testingRender,
  RenderResult,
  RenderOptions,
} from '@testing-library/react';
import { rootReducer } from '../redux/slices';
import { RootState } from '../redux/store';

interface IDefaultProps {
  children?: ReactNode;
}

const render = (
  ui: React.ReactElement,
  {
    route = '/',
    preloadedState = {},
    store = configureStore({ reducer: rootReducer, preloadedState }),
    ...renderOptions
  }: RenderOptions & {
    route?: string;
    preloadedState?: PreloadedState<Partial<RootState>>;
    store?: EnhancedStore<RootState, AnyAction>;
  } = {}
): RenderResult => {
  const Wrapper = ({ children = undefined }: IDefaultProps): JSX.Element => (
    <Router>
      <Provider store={store}>{children}</Provider>
    </Router>
  );
  Wrapper.defaultProps = { children: undefined };
  window.history.pushState({}, 'Test page', route);
  return testingRender(ui, { wrapper: Wrapper, ...renderOptions });
};

export * from '@testing-library/react';
export { render };
