/**
 * Validate if an element is not empty.
 * @param {HTMLInputElement} element - Element to be validated.
 * @return {{valid, message}} Valid is set to true when the field was
 *                            validated correctly. Message contains
 *                            the information about the invalid format.
 */
function emptyValidator(element) {
  if (element && element.value && element.value !== '') {
    return {
      valid: true,
      message: '',
    };
  }

  return {
    valid: false,
    message: 'Value cannot be empty',
  };
}

/**
 * Validate if an element is a correct e-mail.
 * @param {HTMLInputElement} element - Element to be validated.
 * @return {{valid, message}} Valid is set to true when the field was
 *                            validated correctly. Message contains
 *                            the information about the invalid format.
 */
function emailValidator(element) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(element.value)) {
    return {
      valid: true,
      message: '',
    };
  }

  return {
    valid: false,
    message: 'This is not a valid email',
  };
}

/**
 * Validate if an element is a correct phone number.
 * @param {HTMLInputElement} element - Element to be validated.
 * @return {{valid, message}} Valid is set to true when the field was
 *                            validated correctly. Message contains
 *                            the information about the invalid format.
 */
function phoneNumberValidator(element) {
  if (
    !/^\+?\(?([0-9]{2,3})\)?[-. ]?([0-9]+[. -]?[0-9]+)+$/.test(element.value)
  ) {
    return {
      valid: false,
      message: 'This is not a valid phone number',
    };
  }

  if (element.value.length < 5) {
    return {
      valid: false,
      message: 'Phone number is too short',
    };
  }

  return {
    valid: true,
    message: '',
  };
}

/**
 * Validate if an element is a correct credit card number.
 * @param {HTMLInputElement} element - Element to be validated.
 * @return {{valid, message}} Valid is set to true when the field was
 *                            validated correctly. Message contains
 *                            the information about the invalid format.
 */
function creditCardValidator(element) {
  if (
    /^([0-9]{4})[-. ]?([0-9]{4})[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/.test(
      element.value
    )
  ) {
    return {
      valid: true,
      message: '',
    };
  }

  return {
    valid: false,
    message: 'This is not a valid credit card number',
  };
}

/**
 * Validate if an element is a correct expiration date on a credit card.
 * @param {HTMLInputElement} element - Element to be validated.
 * @return {{valid, message}} Valid is set to true when the field was
 *                            validated correctly. Message contains
 *                            the information about the invalid format.
 */
function expirationDateValidator(element) {
  if (
    /^([0-9]{1})([0-9]{1})?[-.\/]([0-9]{1})([0-9]{1})?$/.test(element.value)
  ) {
    return {
      valid: true,
      message: '',
    };
  }

  return {
    valid: false,
    message: 'This is not a valid expiration date format',
  };
}

/**
 * Validate if an element has a correct length.
 * @param {HTMLInputElement} element - Element to be validated.
 * @param {Int} length - Desired length of an element.
 * @return {{valid, message}} Valid is set to true when the field was
 *                            validated correctly. Message contains
 *                            the information about the invalid format.
 */
function exactLengthValidator(element, length) {
  if (element.value.length === length) {
    return {
      valid: true,
      message: '',
    };
  }

  return {
    valid: false,
    message: `This field should be exactly ${length} characters long`,
  };
}

export {
  emptyValidator,
  emailValidator,
  phoneNumberValidator,
  creditCardValidator,
  expirationDateValidator,
  exactLengthValidator,
};
