import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <h2>Hi There</h2>
      </header>
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <p>
        To Sign in with Google,{' '}
        <a href='/auth/google'>Click Here</a><br/>
        
      </p>
    </div>
  );
}

export default App;
