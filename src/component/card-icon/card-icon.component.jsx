import React from 'react';

import { ReactComponent as ShoppingIcon } from '../../assert/crown.svg';

import './card-icon.styles.scss';

const CartIcon = () => (
    <div className='cart-icon'>
        <ShoppingIcon/>
        <span className='item-count'>0</span>
    </div>
)
export default CartIcon;