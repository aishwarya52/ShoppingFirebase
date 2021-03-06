import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import './App.css';
import {Link} from 'react-router-dom';
import HomePage from './homepage.component';
import SignIn from '././component/sign-in/sign-in.component';
import {auth, createUserProfileDocument} from './firebase/firebase.utils';
  import Header from './component/header/header.component';
  import { setCurrentUser } from './redux/user/user.action';


class App extends React.Component {
   

   unsubscribeFromAuth = null;

   componentDidMount(){
     const {setCurrentUser} = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }

      setCurrentUser(userAuth);
    });
   }

 componentWillUnmount(){
   this.unsubscribeFromAuth();
 }
  render(){
    return (
      <div>
        <Header/>
        <Switch>
        {/* <Route exact path='/' component={MenuPage} /> */}
          <Route exact path='/home' component={HomePage} />
         <Route
            exact
            path='/signin'
            render={() =>
              this.props.currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignIn />
              )
            }
          />
        </Switch>
      </div>
    );

  }
}

const mapDispactchToProps = dispatch =>({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(null,mapDispactchToProps)(App);