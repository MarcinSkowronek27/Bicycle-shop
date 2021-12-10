import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { createTheme, StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

import { store } from './redux/store';

import { MainLayout } from './components/layout/MainLayout/MainLayout';
import { Homepage } from './components/views/Homepage/Homepage';
import { Bicycle} from './components/views/Bicycle/Bicycle';
import { Cart} from './components/views/Cart/Cart';
import { Summary } from './components/views/Summary/Summary';
import { NotFound } from './components/views/NotFound/NotFound';

const theme = createTheme({
  palette: {
    primary: { main: '#2B4C6F' },
  },
});

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MainLayout>
            <Switch>
              <Route exact path='/' component={Homepage} />
              <Route exact path='/bicycle/cart' component={Cart} />
              <Route exact path='/bicycle/summary' component={Summary} />
              <Route exact path='/bicycle/:id' component={Bicycle} />
              <Route path='*' component={NotFound} />
            </Switch>
          </MainLayout>
        </ThemeProvider>
      </StylesProvider>
    </BrowserRouter>
  </Provider>
);

export { App };
