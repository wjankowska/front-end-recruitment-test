/**
 * Class representing single validate field.
 */
export default class ValidatedField {
  /**
   * Creating a ValidatedField.
   * @param {HTMLElement} element - Container for a field, containing the input
   *                                and the '.validation-message' elements.
   * @param {function[]} validators - Array of functions validating a field.
   */
  constructor(element, validators) {
    this.element = element;
    this.validators = validators;

    this.input = this.element.querySelector('input');
    this.validationMsg = this.element.querySelector('.validation-message');
  }
  /**
   * Function returning 'true' value when the field is valid
   * and 'false' when the field is invalid.
   * @return {boolean} Information if field is valid.
   */
  isFieldValid() {
    if (!this.validateAndStyle()) {
      return false;
    }

    return true;
  }
  /**
   * Function called to validate a field when input lost focus.
   * Removing styles informing about error when focus.
   */
  addValidationListener() {
    this.input.addEventListener('focusout', () => {
      this.validateAndStyle();
    });

    this.input.addEventListener('focus', () => {
      this.element.classList.remove('checkout-invalid');
      this.validationMsg.innerHTML = '';
    });
  }
  /**
   * When the input is invalid this function adds a class
   * 'checkout-invalid' and sets the proper message.
   * When the input is correct, removes a class and clearing
   * the message.
   * @return {boolean} True if field is valid.
   */
  validateAndStyle() {
    const BreakException = {};
    let result = {};

    try {
      this.validators.forEach((validator) => {
        if (typeof validator === 'function') {
          result = validator(this.input);
          if (!result.valid) {
            throw BreakException;
          }
        } else if (
          typeof validator.validator === 'function' &&
          validator.param
        ) {
          result = validator.validator(this.input, validator.param);
          if (!result.valid) {
            throw BreakException;
          }
        }
      });

      this.element.classList.remove('checkout-invalid');
      this.validationMsg.innerHTML = '';
      return true;
    } catch (e) {
      if (e !== BreakException) {
        throw e;
      } else {
        if (!this.element.classList.contains('checkout-invalid')) {
          this.element.classList.add('checkout-invalid');
        }

        this.validationMsg.innerHTML = result.message;
        return false;
      }
    }
  }
}
