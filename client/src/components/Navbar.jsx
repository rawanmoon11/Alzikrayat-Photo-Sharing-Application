
import { Link, useLocation } from 'react-router-dom';

function Navbar({ user, onlogout }) {
    const location = useLocation();
    const isHome = location.pathname === "/";

    return (
        <nav
            id="navbar"
            className={`navbar navbar-expand-lg ${isHome ? 'home-navbar' : ''}`}
        >
            <div id="navbar-container" className="container-fluid">

                <Link id="navbar-brand" className="navbar-brand" to="/">
                    Alzikrayat
                </Link>

                <ul id="navbar-links" className="navbar-nav ms-auto">

                    <li id="gallery-item" className="nav-item">
                        <Link className="nav-link" to="/gallery">
                            Gallery
                        </Link>
                    </li>

                    {user ? (
                        <>
                            <li id="user-item" className="nav-item">
                                <span className="nav-link">
                                    Hi {user.firstName}
                                </span>
                            </li>

                            <li id="logout-item" className="nav-item">
                                <button
                                    id="logout"
                                    type="button"
                                    className="nav-link"
                                    onClick={onlogout}
                                >
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li id="login-item" className="nav-item">
                                <Link className="nav-link" to="/login">
                                    Login
                                </Link>
                            </li>

                            <li id="register-item" className="nav-item">
                                <Link className="nav-link" to="/register">
                                    Register
                                </Link>
                            </li>
                        </>
                    )}

                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
