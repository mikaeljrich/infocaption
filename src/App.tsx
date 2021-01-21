import React from 'react';
import MainView from './Views/MainView';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

const App: React.FC = () => {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <MainView />
    </MuiPickersUtilsProvider>
  );
};

export default App;
