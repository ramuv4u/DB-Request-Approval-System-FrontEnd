import React from 'react';
import './App.css';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import EventsPage from './pages/events'
import MainNavigation from './components/NavigationBar/mainNavigation'
import Assignment from './pages/assignment'


function App() {
  return (
    <BrowserRouter >
    <MainNavigation/>
    <switch>
   
    <Route path='/events' component={EventsPage}/>
    <Route path='/assignment' component={Assignment}/>
    </switch>
    </BrowserRouter>
  );
}

export default App;
