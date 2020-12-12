import React from 'react';

import './App.css';
import MyWidget from './components/MyWidget';
import ErrorBoundary from './components/ErrorBoundary'

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
      <MyWidget />
      </ErrorBoundary>
      
    </div>
  );
}

export default App;
