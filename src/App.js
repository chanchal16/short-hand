import React,{useState} from 'react'
import 'firebase/auth';
import './App.css';
import Dashboard from './components/Dashboard'
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Auth from './pages/Auth';



export default function App(){
  // const {user,setUser} = Auth();
  const [user,setUser] = useState();



  return(
    <div className='App'>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Auth user={user} setUser={setUser}/>
          </Route>

          <Route path='/dashboard'>
            <Dashboard user={user} setUser={setUser} />
          </Route>
        </Switch>
      </Router>
    </div>
    
  )
}
