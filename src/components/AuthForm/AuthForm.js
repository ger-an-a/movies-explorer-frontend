import { Link } from "react-router-dom";

import logo from '../../images/logo.svg';

function AuthForm(props) {
    return (
        <div className="auth-form">
            <form validate="false" className="auth-form__form" name={props.name} onSubmit={props.onSubmit}>
                <div className="auth-form__container">
                    <Link to="/" className="link">
                        <img src={logo} alt="Логотип." className="auth-form__logo" />
                    </Link>
                    <h1 className="auth-form__title">{props.title}</h1>
                    {props.children}
                </div>
                <div className="auth-form__container">
                    <button disabled={props.btnStatus} className="btn auth-form__btn" type="submit" aria-label={props.btn}>{props.btn}</button>
                    <span className='auth-form__text'>{props.questionText} <Link to={props.link} className="auth-form__text auth-form__link link">{props.linkText}</Link></span>
                </div>
            </form>
        </div>
    );
}

export default AuthForm;