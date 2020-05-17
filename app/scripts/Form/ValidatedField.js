export default class ValidatedField {
  constructor(element, validators) {
    this.element = element;
    this.validators = validators;

    this.input = this.element.querySelector('input');
    this.validationMsg = this.element.querySelector('.validation-message')
  }

  isFieldValid() {
    if(!this.validateAndStyle()) {
      return false;
    }

    return true;
  }

  addValidationListener() {
    this.input.addEventListener('focusout', () => {
      this.validateAndStyle();
    });

    this.input.addEventListener('focus', () => {
      this.element.classList.remove('checkout-invalid');
      this.validationMsg.innerHTML = '';
    })
  }

  validateAndStyle() {
    const BreakException = {};
    let result = {};

    try {
      this.validators.forEach(validator => {
        if(typeof validator === 'function') {
          result = validator(this.input);
          if(!result.valid) {
            throw BreakException;
          }
        } else if(typeof validator.validator === 'function' && validator.param) {
          result = validator.validator(this.input, validator.param);
          if(!result.valid) {
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
        if(!this.element.classList.contains('checkout-invalid')) {
          this.element.classList.add('checkout-invalid');
        }

        this.validationMsg.innerHTML = result.message;
        return false;
      }
    }
  }
}