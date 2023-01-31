function ErrorPopup(props) {
    function closePopup() {
        props.setErrorIsVisible(false);
    }

    return (
        <div onClick={closePopup} className={props.isVisible ? 'error-popup' : 'visually-hidden'}>
            <div onClick={(evt) => { evt.stopPropagation(); }} className="error-popup__container">
                <h2 className="error-popup__title">Ошибка. Попробуйте снова.</h2>
                <button className="btn error-popup__btn" type="button" aria-label="закрыть" onClick={closePopup}>Закрыть</button>
            </div>
        </div>
    )
}
export default ErrorPopup;
