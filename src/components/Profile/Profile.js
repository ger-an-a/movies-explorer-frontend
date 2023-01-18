import { useHistory } from "react-router-dom";
import { useState, useContext, useEffect } from "react";

import FormInput from "../FormInput/FormInput";
import mainApi from "../../utils/MainApi";
import { FormValidator } from "../../utils/FormValidator";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile(props) {
    const [formClassName, setFormClassName] = useState('visually-hidden');
    const [profileClassName, setProfileClassName] = useState('profile__info');
    const [inputEmailStatus, setInputEmailStatus] = useState(true);
    const [inputNameStatus, setInputNameStatus] = useState(true);
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [inputDisabled, setInputDisabled] = useState(false);
    const [btnStatus, setBtnStatus] = useState(true);
    const [btnClass, setBtnClass] = useState('auth-form__btn_inactive');
    const currentUser = useContext(CurrentUserContext);
    const history = useHistory();
    const [signOutBtnText, setSignOutBtnText] = useState('Выйти из аккаунта');
    const [submitBtnText, setSubmitBtnText] = useState('Сохранить');
    const [isEdit, setIsEdit] = useState(false);

    function onSignOut() {
        mainApi.postLogout()
            .then(() => {
                setSignOutBtnText('Выйти из аккаунта');
                props.setCurrentUser({});
                props.setLoggedIn(false);
                localStorage.clear();
                history.push('./');
            })
            .catch(() => {
                setSignOutBtnText('Не удалось выйти. Повторить?')
            })
    }

    function switchView() {
        if (!isEdit) {
            setFormClassName('profile__form');
            setProfileClassName('visually-hidden');
        } else {
            setFormClassName('visually-hidden');
            setProfileClassName('profile__info');
        }
        setBtnStatus(false);
        setIsEdit(!isEdit);
        setUserName(currentUser.name);
        setEmail(currentUser.email);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setInputDisabled(true);
        setSubmitBtnText('Сохрнение...');
        setBtnStatus(false);
        mainApi.updateInfo(userName, email)
            .then((newUserData) => {
                props.setCurrentUser(newUserData.data);
                setSubmitBtnText('Сохрнить');
                setBtnStatus(false);
                switchView();
                setInputDisabled(false);
            })
            .catch(() => {
                setSubmitBtnText('Произошла ошибка. Попробовать снова.');
                setBtnStatus(false);
                setInputDisabled(false);
            })
    }

    useEffect(() => {
        console.log('ca');
        setBtnStatus(true);
        setBtnClass('auth-form__btn_inactive');
    }, [isEdit]);

    useEffect(() => {

    }, [userName, email]);

    useEffect(() => {
        if (inputNameStatus && inputEmailStatus) {
            setBtnStatus(false);
            setBtnClass('');
        } else if (!inputNameStatus || !inputEmailStatus) {
            setBtnStatus(true);
            setBtnClass('auth-form__btn_inactive');
        }
    }, [inputNameStatus, inputEmailStatus, userName, email]);

    return (
        <main className="content profile">
            <div className="profile__container profile__container_margin">
                <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>
                <ul className={profileClassName}>
                    <li className="profile__info-item">
                        <p className="profile__text">Имя</p>
                        <p className="profile__text">{currentUser.name}</p>
                    </li>
                    <li className="profile__info-item">
                        <p className="profile__text">E-mail</p>
                        <p className="profile__text">{currentUser.email}</p>
                    </li>
                </ul>
                <form onSubmit={handleSubmit} validate="false" className={formClassName} name="edit">
                    <FormInput disabled={inputDisabled} setInputValue={setUserName} inputValue={userName} setInputStatus={setInputNameStatus} text="Имя" />
                    <FormInput disabled={inputDisabled} setInputValue={setEmail} inputValue={email} setInputStatus={setInputEmailStatus} type="email" text="E-mail" />
                    <button disabled={btnStatus} className={`btn auth-form__btn ${btnClass}`} type="submit" aria-label="Сохранить">{submitBtnText}</button >
                </form>
            </div>
            <div className="profile__container">
                <button onClick={switchView} className="btn profile__form-btn" type="submit" aria-label={isEdit ? "Отмена" : "Редактировать"}>{isEdit ? "Отмена" : "Редактировать"}</button>
                <button onClick={onSignOut} className="btn profile__form-btn profile__btn-signout" type="button" aria-label="выход">{signOutBtnText}</button >
            </div>
        </main>
    )
}
export default Profile;