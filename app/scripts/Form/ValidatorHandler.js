import ValidatedField from './ValidatedField';

export default class ValidatorHandler {
  constructor() {
    this.validatedFields = [];
  }

  addFieldToValidate(element, validators) {
    const fieldToValidate = new ValidatedField(element, validators);
    fieldToValidate.addValidationListener();

    this.validatedFields.push(fieldToValidate);
  }

  validateAllFields() {
    let validAll = true;

    this.validatedFields.forEach(field => {
      if(!field.isFieldValid()) {
        validAll = false;
      }
    });

    return validAll;
  }
}
