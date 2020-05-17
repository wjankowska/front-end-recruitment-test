import ValidatedField from './ValidatedField';

/**
 * Class holding all of the validated fields.
 */
export default class ValidatorHandler {
  /**
   * Creating a ValidatorHandler.
   */
  constructor() {
    this.validatedFields = [];
  }
  /**
   * Adding a new field to the list of all validated fields.
   * @param {HTMLElement} element - HTML Element of a field, containing input
   *                                and the '.validation-message' elements.
   * @param {function[]} validators - Array of functions validating a field.
   */
  addFieldToValidate(element, validators) {
    const fieldToValidate = new ValidatedField(element, validators);
    fieldToValidate.addValidationListener();

    this.validatedFields.push(fieldToValidate);
  }
  /**
   * Validating all fields from the list.
   * @return {boolean} True if all of the fields are valid.
   */
  validateAllFields() {
    let validAll = true;

    this.validatedFields.forEach((field) => {
      if (!field.isFieldValid()) {
        validAll = false;
      }
    });

    return validAll;
  }
}
