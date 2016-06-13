import React, {PropTypes} from 'react';

import Header from './common/Header';
import FirebaseContainer from '../modules/firebase/FirebaseContainer';


const App = (props) => {
  return (
    <div className="container">
      <FirebaseContainer />
      <Header />
      <hr/>
      {props.children}
    </div>
  );
};

App.propTypes = {
  children: PropTypes.element
};

export default App;
