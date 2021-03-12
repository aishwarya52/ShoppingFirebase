import React from 'react';
import { Link } from 'react-router-dom';
import  {auth} from '../../firebase/firebase.utils';
import { connect} from 'react-redux';
import { ReactComponent as Logo } from '../../assert/crown.svg';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import './header.styles.scss';
import CartIcon from '../card-icon/card-icon.component';

const Header = ({currentUser, hidden}) => (
  <div className='header'>
    <Link className='logo-container' to='/'>
      <Logo className='logo' />
    </Link>
    <div className='options'>
      <Link className='option' to='/home'>
        SHOP
      </Link>
      <Link className='option' to='/shop'>
        CONTACT
      </Link>
      {
          currentUser ? 
          <div className='option' onClick={() => auth.signOut()}>SignOut</div>
          :
          <Link className='option' to='/signIn'>Sign In</Link>
      }
      <CartIcon/>
    </div>
    {
       <CartDropdown/>
    }
  </div>
);

const mapStateToProps = ({user: {currentUser} , cart: {hidden}}) =>({
  currentUser,
  hidden
});


export default connect(mapStateToProps)(Header);