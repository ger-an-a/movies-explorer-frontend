import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

function Navigation(props) {
    const [visible, setVisible] = useState(false);

    function handleClick() {
        setVisible(!visible)
    }

    if (props.loggedIn)
        return (
            <nav className="navigation">
                <ul className={`${props.loggedIn ? "navigation__menu" : "visually-hidden"} ${visible ? "navigation__sidebar-menu" : "visually-hidden"}`}>
                    <li>
                        <NavLink to="/" className="link navigation__link navigation__link_type_menu navigation__link_type_main">Главная</NavLink>
                    </li>
                    <li>
                        <NavLink to="/movies" className="link navigation__link navigation__link_type_menu navigation__link_type_films" activeClassName="navigation__link_active">Фильмы</NavLink>
                    </li>
                    <li>
                        <NavLink to="/saved-movies" className="link navigation__link navigation__link_type_menu navigation__link_type_films" activeClassName="navigation__link_active">Сохранённые фильмы</NavLink>
                    </li>
                    <li>
                        <NavLink to="/profile" className="link navigation__link navigation__link_type_profile" >Аккаунт</NavLink>
                    </li>
                </ul>
                <button onClick={handleClick} className={`btn navigation__menu-btn ${visible ? "navigation__menu-btn_close" : ""}`} />
            </nav>
        )
    else return (
        <ul className="navigation__authbar">
            <li>
                <Link to="/signup" className="link navigation__link">Регистрация</Link>
            </li>
            <li>
                <Link to="/signin" className="link navigation__link navigation__link_type_signin">Войти</Link>
            </li>
        </ul>
    )
}

export default Navigation;