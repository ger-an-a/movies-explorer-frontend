import headerLogo from '../../images/logo.svg';
import React from 'react';
import { Link } from 'react-router-dom';

import Navigation from '../Navigation/Navigation';

function Header(props) {
    return (
        <header className={`header ${props.loggedIn ? "header_loggedIn" : ""}`}>
            <div className="header__container content">
                <Link to="/" className="link header__link">
                    <img src={headerLogo} alt="Логотип." className="header__logo" />
                </Link>
                <Navigation loggedIn={props.loggedIn} />
            </div>
        </header>
    )
}
export default Header;