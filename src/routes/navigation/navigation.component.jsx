import './navigation.styles.scss';
import { useContext } from 'react';
import { Link, Outlet } from "react-router";
import { Fragment } from "react/jsx-runtime";
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { UserContext } from '../../contexts/user.context';
import { signOutUser } from '../../util/firebase/firebase.utils';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { CartContext } from '../../contexts/cart.context';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { showCartDropdown } = useContext(CartContext);

  const signOutHandler = async () => {
    await signOutUser();
  };

  return (
    <Fragment>
        <div className="navigation">
            <Link className="logo-container" to="/">
                <Logo className="logo" />
            </Link>
            <div className="nav-links-container">
              <Link className="nav-link" to="/shop">Shop</Link>
              {currentUser ?
                <span className="nav-link" onClick={signOutHandler}>Sign Out</span> :
                <Link className="nav-link" to="/auth">Sign In</Link>
              }
              <CartIcon />
            </div>
            {showCartDropdown && <CartDropdown />}
        </div>
        <Outlet />
    </Fragment>
  );
}

export default Navigation;