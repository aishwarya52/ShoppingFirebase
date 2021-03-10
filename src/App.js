import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import {Link} from 'react-router-dom';
import HomePage from './homepage.component';
import SignIn from '././component/sign-in/sign-in.component';
import {auth} from './firebase/firebase.utils';
  import Header from './component/header/header.component';
 

const MenuPage =() =>(
  <div>
    <ul>
      <li>
        <Link to='/signIn'>SignIn</Link>
      </li>
    </ul>
  </div>
)
class App extends React.Component {
   constructor(){
     super()
     this.state={
       currentUser: null
     }
   }

   unsubscribeFromAuth = null;

   componentDidMount(){
     this.unsubscribeFromAuth = auth.onAuthStateChanged(user =>{
       this.setState({ currentUser: user});

       console.log('p',user);
     })
   }

 componentWillUnmount(){
   this.unsubscribeFromAuth();
 }
  render(){
    return (
      <div>
        <Header currentUser = {this.state.currentUser}/>
        <Switch>
        <Route exact path='/' component={MenuPage} />
          <Route exact path='/home' component={HomePage} />
          <Route path='/signin' component={SignIn} />
        </Switch>
      </div>
    );

  }
}

export default App;