export class InputValidator {
  constructor(setInputClass, setErrorMessageClass, setErrMessage, setInputStatus) {
    this._setInputClass = setInputClass;
    this._setErrorMessageClass = setErrorMessageClass;
    this._setErrMessage = setErrMessage;
    this._setInputStatus = setInputStatus;
  }

  _showInputError(errorMessage) {
    this._setInputClass('form-input__input form-input__input_type_error');
    this._setErrorMessageClass('form-input__err-message');
    this._setErrMessage(errorMessage);
  };

  hideInputError() {
    this._setInputClass('form-input__input');
    this._setErrorMessageClass('visually-hidden');
    this._setErrMessage('');
  };

  isValid(e) {
    if (!e.target.validity.valid) {
      this._showInputError(e.target.validationMessage);
      this._setInputStatus(false);
    } else {
      this.hideInputError();
      this._setInputStatus(true);
    }
  };
}


