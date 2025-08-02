import { useContext } from 'react';
import { Outlet } from "react-router";
import { Fragment } from "react/jsx-runtime";
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { UserContext } from '../../contexts/user.context';
import { signOutUser } from '../../util/firebase/firebase.utils';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { CartContext } from '../../contexts/cart.context';
import { LogoContainer, NavigationContainer, NavLink, NavLinks } from './navigation.styles';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { showCartDropdown } = useContext(CartContext);

  const signOutHandler = async () => {
    await signOutUser();
  };

  return (
    <Fragment>
        <NavigationContainer>
            <LogoContainer to="/">
                <Logo className="logo" />
            </LogoContainer>
            <NavLinks>
              <NavLink to="/shop">Shop</NavLink>
              {currentUser ?
                <NavLink as='span' onClick={signOutHandler}>Sign Out</NavLink> :
                <NavLink to="/auth">Sign In</NavLink>
              }
              <CartIcon />
            </NavLinks>
            {showCartDropdown && <CartDropdown />}
        </NavigationContainer>
        <Outlet />
    </Fragment>
  );
}

export default Navigation;