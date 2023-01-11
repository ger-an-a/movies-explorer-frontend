function FormInput(props) {
    return (
        <div className="form-input">
            <label htmlFor={`${props.type ? props.type : "name"}-input`} className="form-input__title">{props.text}</label>
            <input required className="form-input__input" id={`${props.type ? props.type : "name"}-input`} type={`${props.type ? props.type : "name"}`} minLength="2" maxLength="40" name={`${props.type ? props.type : "userName"}`}
                placeholder={props.text} />
            <span className={props.errMessageClass}>{props.errMessage}</span>
        </div>
    )
}

export default FormInput;