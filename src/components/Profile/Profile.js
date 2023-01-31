import { useHistory } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';

import FormInput from '../FormInput/FormInput';
import mainApi from '../../utils/MainApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Form from '../Form/Form';
import { MESSAGE_ERROR_EXIT, MESSAGE_ERROR409, MESSAGE_ERROR } from '../../utils/constants'

function Profile(props) {
    const [errMessage, setErrMessage] = useState('');
    const [errMessageClass, setErrMessageClass] = useState('visually-hidden');
    const [formClassName, setFormClassName] = useState('visually-hidden');
    const [profileClassName, setProfileClassName] = useState('profile__info');
    const [inputEmailValid, setInputEmailValid] = useState(true);
    const [inputNameValid, setInputNameValid] = useState(true);
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [inputDisabled, setInputDisabled] = useState(false);
    const [btnStatus, setBtnStatus] = useState(true);
    const [btnClass, setBtnClass] = useState('form__btn_inactive');
    const [disabledEditBtn, setDisabledEditBtn] = useState(false);
    const currentUser = useContext(CurrentUserContext);
    const history = useHistory();
    const [signOutBtnText, setSignOutBtnText] = useState('Выйти из аккаунта');
    const [submitBtnText, setSubmitBtnText] = useState('Сохранить');
    const [isEdit, setIsEdit] = useState(false);

    function setBtnInactive() {
        setBtnStatus(true);
        setBtnClass('form__btn_inactive');
    }

    function setBtnActive() {
        setBtnStatus(false);
        setBtnClass('');
    }

    function setAllInactive() {
        setBtnInactive()
        setDisabledEditBtn(true);
        setInputDisabled(true);
    }

    function setAllActive() {
        setBtnActive()
        setDisabledEditBtn(false);
        setInputDisabled(false);
    }

    function showError(message) {
        setErrMessage(message);
        setErrMessageClass('form__err-message');
    }

    function hideError() {
        setErrMessageClass('visually-hidden');
    }

    function onSignOut() {
        setSignOutBtnText('Выход...');
        setAllInactive();
        mainApi.postLogout()
            .then(() => {
                setSignOutBtnText('Выйти из аккаунта');
                props.setCurrentUser({});
                props.setLoggedIn(false);
                localStorage.clear();
                history.push('./');
                setAllActive();
            })
            .catch(() => {
                setSignOutBtnText(MESSAGE_ERROR_EXIT);
                setAllActive();
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
        setSignOutBtnText('Выйти из аккаунта');
        setBtnInactive()
        setUserName(currentUser.name);
        setEmail(currentUser.email);
        setIsEdit(!isEdit);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setSubmitBtnText('Сохрнение...');
        setAllInactive()
        mainApi.updateInfo(userName, email)
            .then((newUserData) => {
                if (newUserData.message) {
                    showError(MESSAGE_ERROR409);
                } else {
                    switchView();
                    props.setCurrentUser(newUserData.data);
                    setBtnActive();
                }
                setSubmitBtnText('Сохрнить');
                setAllActive();
            })
            .catch(() => {
                showError(MESSAGE_ERROR);
                setAllActive();
                setSubmitBtnText('Сохрнить');
            })
    }

    useEffect(() => {
        if ((userName !== currentUser.name || email !== currentUser.email) && (inputEmailValid && inputNameValid)) {
            setBtnActive();
            hideError()
        } else setBtnInactive();
    }, [userName, email]);

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
                <Form formClass={formClassName} onSubmit={handleSubmit} validate="false" className={formClassName} name="edit"
                    errMessage={errMessage} errMessageClass={errMessageClass}
                    btnStatus={btnStatus} btnClass={btnClass} btn={submitBtnText}
                    formElement={
                        <>
                            <FormInput isOpen={isEdit} disabled={inputDisabled} setInputValue={setUserName} inputValue={userName} setInputValid={setInputNameValid} text="Имя" />
                            <FormInput isOpen={isEdit} disabled={inputDisabled} setInputValue={setEmail} inputValue={email} setInputValid={setInputEmailValid} type="email" text="E-mail" />
                        </>
                    }
                />
                <div className={isEdit ? 'profile__container profile__container_edit' : 'profile__container'}>
                    <button disabled={disabledEditBtn} onClick={switchView} className="btn profile__form-btn" type="submit" aria-label={isEdit ? "Отмена" : "Редактировать"}>{isEdit ? "Отмена" : "Редактировать"}</button>
                    <button onClick={onSignOut} className="btn profile__form-btn profile__btn-signout" type="button" aria-label="выход">{signOutBtnText}</button >
                </div>
            </div>
        </main>
    )
}
export default Profile;