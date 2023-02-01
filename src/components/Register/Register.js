import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import AuthForm from "../AuthForm/AuthForm";
import FormInput from "../FormInput/FormInput";
import mainApi from "../../utils/MainApi";
import { MESSAGE_ERROR409, MESSAGE_ERROR } from '../../utils/constants';


function Register(props) {
    const [errMessage, setErrMessage] = useState('');
    const [errMessageClass, setErrMessageClass] = useState('visually-hidden');
    const [inputNameValid, setInputNameValid] = useState(false);
    const [inputEmailValid, setInputEmailValid] = useState(false);
    const [inputPasswordValid, setInputPasswordValid] = useState(false);
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [inputDisabled, setInputDisabled] = useState(false);
    const [btnText, setBtnText] = useState('Зарегистрироваться');
    const [btnStatus, setBtnStatus] = useState(true);
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
        setBtnText('Регистрация...');
        setBtnInactive();
        setInputDisabled(true);
        mainApi.postRegister(email, password, userName)
            .then((data) => {
                console.log(data);
                props.setCurrentUser({ email: email, name: userName });
                setEmail('');
                setPassword('');
                setUserName('');
                setInputDisabled(false);
                setBtnText('Зарегистрироваться');
                mainApi.postLogin(email, password)
                    .then((data) => {
                        props.setLoggedIn(true);
                        history.push('/movies');
                        return data;
                    })
                return data;
            })
            .catch((err) => {
                if (err.code === 409) setErrMessage(MESSAGE_ERROR409)
                else {
                    setErrMessage(MESSAGE_ERROR);
                    setBtnActive()
                }
                props.setLoggedIn(false);
                setErrMessageClass('form__err-message');
                setBtnText('Зарегистрироваться');
                setInputDisabled(false);
                return;
            });
    }

    useEffect(() => {
        if (inputNameValid && inputEmailValid && inputPasswordValid) {
            setBtnActive()
            setErrMessageClass('visually-hidden');
        } else {
            setBtnInactive()
        }
    }, [inputNameValid, inputEmailValid, inputPasswordValid, userName, email, password]);

    return (
        <AuthForm errMessage={errMessage} errMessageClass={errMessageClass} onSubmit={handleSubmit} link="/signin" linkText="Войти" questionText="Уже зарегистрированы?" title="Добро пожаловать!" name="register" btn={btnText} btnClass={btnClass} btnStatus={btnStatus} children={
            <>
                <FormInput disabled={inputDisabled} setInputValue={setUserName} inputValue={userName} setInputValid={setInputNameValid} text="Имя" />
                <FormInput disabled={inputDisabled} setInputValue={setEmail} inputValue={email} setInputValid={setInputEmailValid} type="email" text="E-mail" />
                <FormInput disabled={inputDisabled} setInputValue={setPassword} inputValue={password} setInputValid={setInputPasswordValid} type="password" text="Пароль" />
            </>}
        />
    )
}
export default Register;