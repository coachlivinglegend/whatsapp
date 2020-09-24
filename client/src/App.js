import React from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Chat from './components/Chat/Chat'
import './App.css'

function App() {
  return (
    <div className="app">
      <div className="app__body">
        <Sidebar/>
        <Chat/>
      </div>
    </div>
  );
}

export default App;
