import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import AuthForm from "../AuthForm/AuthForm";
import FormInput from "../FormInput/FormInput";
import mainApi from "../../utils/MainApi";
import { MESSAGE_ERROR401, MESSAGE_ERROR } from '../../utils/constants';

function Login(props) {
    const [errMessage, setErrMessage] = useState('');
    const [errMessageClass, setErrMessageClass] = useState('visually-hidden');
    const [inputEmailValid, setInputEmailValid] = useState(false);
    const [inputPasswordValid, setInputPasswordValid] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [inputDisabled, setInputDisabled] = useState(false);
    const [btnStatus, setBtnStatus] = useState(true);
    const [btnText, setBtnText] = useState('Войти');
    const [btnClass, setBtnClass] = useState('form__btn_inactive');
    const history = useHistory();

    function setBtnInactive() {
        setBtnStatus(true);
        setBtnClass('form__btn_inactive');
    }

    function setBtnActive() {
        setBtnStatus(false);
        setBtnClass('');
    }

    function handleSubmit(e) {
        e.preventDefault();
        setBtnText('Вход...');
        setBtnInactive()
        setInputDisabled(true);
        mainApi.postLogin(email, password)
            .then((data) => {
                props.setLoggedIn(true);
                setEmail('');
                setPassword('');
                setInputDisabled(false);
                setBtnText('Войти');
                history.push('/movies');
                return data;
            })
            .catch((err) => {
                setErrMessageClass('form__err-message');
                setBtnText('Войти');
                setInputDisabled(false);
                if (err.code === 401) setErrMessage(MESSAGE_ERROR401)
                else setErrMessage(MESSAGE_ERROR);
                props.setLoggedIn(false);
                return;
            });
    }

    useEffect(() => {
        if (inputEmailValid && inputPasswordValid) {
            setBtnActive()
            setErrMessageClass('visually-hidden');
        } else {
            setBtnInactive()
        }
    }, [inputEmailValid, inputPasswordValid, email, password]);

    return (
        <AuthForm errMessage={errMessage} errMessageClass={errMessageClass} onSubmit={handleSubmit} link="/signup" linkText="Регистрация" questionText="Ещё не зарегистрированы?" title="Рады видеть!" name="register" btn={btnText} btnClass={btnClass} btnStatus={btnStatus} children={
            <>
                <FormInput disabled={inputDisabled} setInputValue={setEmail} inputValue={email} setInputValid={setInputEmailValid} type="email" text="E-mail" />
                <FormInput disabled={inputDisabled} setInputValue={setPassword} inputValue={password} setInputValid={setInputPasswordValid} type="password" text="Пароль" />
            </>}
        />
    )
}
export default Login;