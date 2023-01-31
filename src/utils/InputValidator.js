import { VALIDATION_MESSAGE_NAME, VALIDATION_MESSAGE_EMAIL } from './constants';

export class InputValidator {
  constructor(setInputClass, setErrorMessageClass, setErrMessage, setInputValid) {
    this._setInputClass = setInputClass;
    this._setErrorMessageClass = setErrorMessageClass;
    this._setErrMessage = setErrMessage;
    this._setInputValid = setInputValid;
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
      let message = e.target.validationMessage;
      if (!e.target.validity.valueMissing) {
        if (e.target.name === 'userName') {
          message = VALIDATION_MESSAGE_NAME;
        } else if (e.target.name === 'email') message = VALIDATION_MESSAGE_EMAIL;
      }
      this._showInputError(message);
      this._setInputValid(false);
    } else {
      this.hideInputError();
      this._setInputValid(true);
    }
  };
}


