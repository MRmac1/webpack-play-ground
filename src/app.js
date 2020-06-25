import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { hot } from 'react-hot-loader/root';

import './app.scss';

import Home from './home';

const App = () => {
  return (<>
      <Home />
      <footer>备案信息</footer>
    </>);
}

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root'),
  );
};

// 修改 App 组件不生效，奇怪
render(hot(App));

if(module.hot) {
  module.hot.decline();
  module.hot.accept('./app.js')
}