import { useEffect, useState } from 'react';

import { InputValidator } from '../../utils/InputValidator';
import { REGEX_NAME, REGEX_EMAIL } from '../../utils/constants';


function FormInput(props) {
    const [inputClass, setInputClass] = useState('form-input__input');
    const [errMessageClass, setErrMessageClass] = useState('visually-hidden');
    const [errMessage, setErrMessage] = useState('Что-то пошло не так...');
    const inputValidation = new InputValidator(setInputClass, setErrMessageClass, setErrMessage, props.setInputValid);

    const regex = (!props.type) ? REGEX_NAME : (props.type === 'email') ? REGEX_EMAIL : undefined;

    function handleChange(e) {
        inputValidation.isValid(e);
        props.setInputValue(e.target.value);
        if (props.setFormErrClass) props.setFormErrClass('visually-hidden');
    }

    useEffect(() => {
        inputValidation.hideInputError();
    }, [props.isOpen])

    return (
        <div className="form-input">
            <label htmlFor={`${props.type ? props.type : "name"}-input`} className="form-input__title">{props.text}</label>
            <input disabled={props.disabled} value={props.inputValue} pattern={regex} onChange={handleChange} required className={inputClass} id={`${props.type ? props.type : "name"}-input`} type={`${props.type ? props.type : "text"}`} name={`${props.type ? props.type : "userName"}`}
                placeholder={props.text} />
            <span className={errMessageClass}>{errMessage}</span>
        </div>
    )
}

export default FormInput;