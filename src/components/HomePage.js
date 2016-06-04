import React from 'react';
import {Link} from 'react-router';

const HomePage = () => {
  return (
    <div>

      <div className="row">
        <div className="column">
          <h1>React Slingshot</h1>
        </div>
      </div>


      <div className="row">
        <div className="column">
          <h2>Get Started</h2>
          <ol>
            <li>Review the <Link to="fuel-savings">demo app</Link></li>
            <li>Remove the demo and start coding: npm run remove-demo</li>
          </ol>
        </div>
      </div>

    </div>
  );
};

export default HomePage;
