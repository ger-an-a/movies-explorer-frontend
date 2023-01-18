import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import AuthForm from "../AuthForm/AuthForm";
import FormInput from "../FormInput/FormInput";
import { FormValidator } from "../../utils/FormValidator";
import mainApi from "../../utils/MainApi";


function Register(props) {
    const [errMessageClass, setErrMessageClass] = useState('visually-hidden');
    const [inputNameStatus, setInputNameStatus] = useState(false);
    const [inputEmailStatus, setInputEmailStatus] = useState(false);
    const [inputPasswordStatus, setInputPasswordStatus] = useState(false);
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [inputDisabled, setInputDisabled] = useState(false);
    const [btnText, setBtnText] = useState('Зарегистрироваться');
    const [btnStatus, setBtnStatus] = useState(true);
    const [btnClass, setBtnClass] = useState('btn auth-form__btn auth-form__btn_inactive');
    const formValidator = new FormValidator([inputNameStatus, inputEmailStatus, inputPasswordStatus], setBtnStatus, setBtnClass);
    const history = useHistory();

    function handleSubmit(e) {
        e.preventDefault();
        setBtnText('Регистрация...');
        setBtnStatus(false);
        setBtnClass('btn auth-form__btn auth-form__btn_inactive');
        setInputDisabled(true);
        mainApi.postRegister(email, password, userName)
            .then((data) => {
                props.setLoggedIn(true);
                // props.setUserEmail(email);
                setEmail('');
                setPassword('');
                setUserName('');
                setInputDisabled(false);
                setBtnText('Зарегистрироваться');
                props.setCurrentUser({ email, name: userName });
                history.push('/movies');
                return data;
            })
            .catch(() => {
                setErrMessageClass('auth-form__err-message');
                //props.setLoggedIn(false);
                //formValidator.disabledButtonState();
                setBtnText('Зарегистрироваться');
                setInputDisabled(false);
                return;
            });
    }

    useEffect(() => {
        formValidator.isValid();
        setErrMessageClass('visually-hidden');
    }, [inputNameStatus, inputEmailStatus, inputPasswordStatus]);

    return (
        <AuthForm errMessageClass={errMessageClass} onSubmit={handleSubmit} link="/signin" linkText="Войти" questionText="Уже зарегистрированы?" title="Добро пожаловать!" name="register" btn={btnText} btnClass={btnClass} btnStatus={btnStatus} children={
            <>
                <FormInput disabled={inputDisabled} setFormErrClass={setErrMessageClass} setInputValue={setUserName} inputValue={userName} setInputStatus={setInputNameStatus} text="Имя" />
                <FormInput disabled={inputDisabled} setFormErrClass={setErrMessageClass} setInputValue={setEmail} inputValue={email} setInputStatus={setInputEmailStatus} type="email" text="E-mail" />
                <FormInput disabled={inputDisabled} setFormErrClass={setErrMessageClass} setInputValue={setPassword} inputValue={password} setInputStatus={setInputPasswordStatus} type="password" text="Пароль" />
            </>}
        />
    )
}
export default Register;