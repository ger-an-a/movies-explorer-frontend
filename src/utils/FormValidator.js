export class FormValidator {
    constructor(inputsStatus = [], setBtnStatus, setBtnClass) {
        this._inputsStatus = inputsStatus;
        this._setBtnStatus = setBtnStatus;
        this._setBtnClass = setBtnClass;
    }

    disabledButtonState() {
        this._setBtnStatus(true);
        this._setBtnClass('btn auth-form__btn auth-form__btn_inactive');
    }

    _activeButtonState() {
        this._setBtnStatus(false);
        this._setBtnClass('btn auth-form__btn');
    }

    isValid() {
        if (this._inputsStatus.includes(false)) {
            this.disabledButtonState();
        } else {
            this._activeButtonState()
        }
    };
}