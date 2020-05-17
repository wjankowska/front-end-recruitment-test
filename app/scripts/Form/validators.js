function emptyValidator(element) {
  if(element && element.value && element.value !== '') {
    return {
      valid: true,
      message: ''
    }
  }

  return {
    valid: false,
    message: 'Value cannot be empty'
  }
}

function emailValidator(element) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(element.value)) {
    return {
      valid: true,
      message: ''
    }
  }

  return {
    valid: false,
    message: 'This is not a valid email'
  }
}

function phoneNumberValidator(element) {
  if(!/^\+?\(?([0-9]{2,3})\)?[-. ]?([0-9]+[. -]?[0-9]+)+$/.test(element.value)) {
    return {
      valid: false,
      message: 'This is not a valid phone number'
    }
  }

  if(element.value.length < 5) {
    return {
      valid: false,
      message: 'Phone number is too short'
    }
  }

  return {
    valid: true,
    message: ''
  }
}

function creditCardValidator(element) {
  if(/^([0-9]{4})[-. ]?([0-9]{4})[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/.test(element.value)) {
    return {
      valid: true,
      message: ''
    }
  }

  return {
    valid: false,
    message: 'This is not a valid credit card number'
  }
}

function expirationDateValidator(element) {
  if(/^([0-9]{1})([0-9]{1})?[-.\/]?([0-9]{1})([0-9]{1})?$/.test(element.value)) {
    return {
      valid: true,
      message: ''
    }
  }

  return {
    valid: false,
    message: 'This is not a valid expiration date format'
  }
}

function exactLengthValidator(element, length) {
  if(element.value.length === length) {
    return {
      valid: true,
      message: ''
    }
  }

  return {
    valid: false,
    message: `This field should be exactly ${length} characters long`
  }
}

export { emptyValidator, emailValidator, phoneNumberValidator, creditCardValidator, expirationDateValidator, exactLengthValidator };