import AuthForm from "../AuthForm/AuthForm";
import FormInput from "../FormInput/FormInput";


function Login() {
    return (
        <AuthForm link="/signup" linkText="Регистрация" questionText="Ещё не зарегистрированы?" title="Рады видеть!" name="register" btn="Войти" btnClass="" btnStatus="" children={
            <>
                <FormInput errMessageClass="visually-hidden" type="email" text="E-mail" errMessage="Что-то пошло не так..." />
                <FormInput errMessageClass="form-input__err-message" type="password" text="Пароль" errMessage="Что-то пошло не так..." />
            </>}
        />
    )
}
export default Login;