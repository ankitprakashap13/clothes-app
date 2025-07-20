import { Link, Outlet } from "react-router";
import { Fragment } from "react/jsx-runtime";
import './navigation.styles.scss';
import { ReactComponent as Logo } from '../../assets/crown.svg';

const Navigation = () => {
  return (
    <Fragment>
        <div className="navigation">
            <Link className="logo-container" to="/">
                <Logo className="logo" />
            </Link>
            <div className="nav-links-container">
              <Link className="nav-link" to="/shop">Shop</Link>
              <Link className="nav-link" to="/sign-in">Sign in</Link>
            </div>
        </div>
        <Outlet />
    </Fragment>
  );
}

export default Navigation;