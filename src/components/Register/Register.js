import AuthForm from "../AuthForm/AuthForm";
import FormInput from "../FormInput/FormInput";


function Register() {
    return (
        <AuthForm link="/signin" linkText="Войти" questionText="Уже зарегистрированы?" title="Добро пожаловать!" name="register" btn="Зарегистрироваться" btnClass="" btnStatus="" children={
            <>
                <FormInput errMessageClass="visually-hidden" text="Имя" errMessage="Что-то пошло не так..." />
                <FormInput errMessageClass="visually-hidden" type="email" text="E-mail" errMessage="Что-то пошло не так..." />
                <FormInput errMessageClass="form-input__err-message" type="password" text="Пароль" errMessage="Что-то пошло не так..." />
            </>}
        />
    )
}
export default Register;