function Form(props) {

    return (
        <form onSubmit={props.onSubmit} validate="false" className={props.formClass ? props.formClass : 'form'} name={props.name}>
            <div className="form__container">
                {props.formElement}
            </div>
            <div className="form__container">
                <span className={props.errMessageClass}>{props.errMessage}</span>
                <button disabled={props.btnStatus} className={`btn form__btn ${props.btnClass}`} type="submit" aria-label={props.btn}>{props.btn}</button>
                {props.linkElement}
            </div>
        </form>
    );
}

export default Form;