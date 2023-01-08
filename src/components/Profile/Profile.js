import { Link } from "react-router-dom";

import AuthInput from "../FormInput/FormInput";

const currentUser = { name: "Виталий", email: "pochta@yandex.ru" };


function Profile(props) {
    return (
        <main className="content profile">
            <div className="profile__container profile__container_margin">
                <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>
                <ul className="profile__info">
                    <li className="profile__info-item">
                        <p className="profile__text">Имя</p>
                        <p className="profile__text">{currentUser.name}</p>
                    </li>
                    <li className="profile__info-item">
                        <p className="profile__text">E-mail</p>
                        <p className="profile__text">{currentUser.email}</p>
                    </li>
                </ul>
                <form validate="false" className="profile__form visually-hidden" name="profile" onSubmit={props.onSubmit}>
                    <AuthInput errMessageClass="visually-hidden" text="Имя" errMessage="Что-то пошло не так..." />
                    <AuthInput errMessageClass="visually-hidden" type="email" text="E-mail" errMessage="Что-то пошло не так..." />
                </form>
            </div>
            <div className="profile__container">
                <button disabled={props.btnStatus} className="btn profile__form-btn" type="submit" aria-label={props.btn ? "Сохранить" : "Редактировать"}>{props.btn ? "Сохранить" : "Редактировать"}</button>
                <button disabled={props.btnStatus} className="btn profile__form-btn" type="button" aria-label="выход">
                    <Link to="/signin" className="profile__link link">Выйти из аккаунта</Link >
                </button>
            </div>
        </main>
    )
}
export default Profile;