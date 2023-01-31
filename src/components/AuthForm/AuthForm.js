import { Link } from "react-router-dom";
import logo from '../../images/logo.svg';

import Form from "../Form/Form";

function AuthForm(props) {

    return (
        <div className="auth-form">
            <Form onSubmit={props.onSubmit} validate="false" name={props.name} errMessageClass={props.errMessageClass}
                errMessage={props.errMessage} btnStatus={props.btnStatus} btnClass={props.btnClass} btn={props.btn}
                formElement={<>
                    <Link to="/" className="link auth-form__logo">
                        <img src={logo} alt="Логотип." className="auth-form__logo" />
                    </Link>
                    <h1 className="auth-form__title">{props.title}</h1>
                    {props.children}
                </>}
                linkElement={
                    <span className='auth-form__text'>{props.questionText} <Link to={props.link} className="auth-form__text auth-form__link link">{props.linkText}</Link></span>
                }
            />
        </div>
    );
}

export default AuthForm;