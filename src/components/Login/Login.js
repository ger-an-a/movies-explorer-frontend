import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import AuthForm from "../AuthForm/AuthForm";
import FormInput from "../FormInput/FormInput";
import { FormValidator } from "../../utils/FormValidator";
import mainApi from "../../utils/MainApi";

function Login(props) {
    const [errMessageClass, setErrMessageClass] = useState('visually-hidden');
    const [inputEmailStatus, setInputEmailStatus] = useState(false);
    const [inputPasswordStatus, setInputPasswordStatus] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [inputDisabled, setInputDisabled] = useState(false);
    const [btnStatus, setBtnStatus] = useState(true);
    const [btnText, setBtnText] = useState('Войти');
    const [btnClass, setBtnClass] = useState('btn auth-form__btn auth-form__btn_inactive');
    const formValidator = new FormValidator([inputEmailStatus, inputPasswordStatus], setBtnStatus, setBtnClass);
    const history = useHistory();

    function handleSubmit(e) {
        e.preventDefault();
        setBtnText('Вход...');
        setBtnStatus(false);
        setInputDisabled(true);
        setBtnClass('btn auth-form__btn auth-form__btn_inactive');
        mainApi.postLogin(email, password)
            .then((data) => {
                props.setLoggedIn(true);
                // props.setUserEmail(email);
                setEmail('');
                setPassword('');
                setInputDisabled(false);
                setBtnText('Войти');

                //props.setCurrentUser({ email, name: data.name });
                history.push('/movies');
                return data;
            })
            .catch(() => {
                setErrMessageClass('auth-form__err-message');
                //props.setLoggedIn(false);
                //formValidator.disabledButtonState();
                setBtnText('Войти');
                setInputDisabled(false);
                return;
            });
    }

    useEffect(() => {
        formValidator.isValid();
        setErrMessageClass('visually-hidden');
    }, [inputEmailStatus, inputPasswordStatus]);

    return (
        <AuthForm errMessageClass={errMessageClass} onSubmit={handleSubmit} link="/signup" linkText="Регистрация" questionText="Ещё не зарегистрированы?" title="Рады видеть!" name="register" btn={btnText} btnClass={btnClass} btnStatus={btnStatus} children={
            <>
                <FormInput disabled={inputDisabled} setFormErrClass={setErrMessageClass} setInputValue={setEmail} inputValue={email} setInputStatus={setInputEmailStatus} type="email" text="E-mail" />
                <FormInput disabled={inputDisabled} setFormErrClass={setErrMessageClass} setInputValue={setPassword} inputValue={password} setInputStatus={setInputPasswordStatus} type="password" text="Пароль" />
            </>}
        />
    )
}
export default Login;