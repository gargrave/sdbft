// regex for email testing
const RE_EMAIL = /^\S+@\S+\.\S+$/;

/**
 * Returns whether the supplied email matches the basic format of a valid email address
 * @param email The email to check
 * @returns {boolean} Whether the supplied email validates
 */
function isValidEmail(email) {
  return RE_EMAIL.test(email);
}

export function validate(value, settings) {
  // check for required
  if (settings.required) {
    if (!value.length || value === null || value === undefined) {
      return {
        valid: false,
        error: 'This field is required.'
      };
    }
  }

  // check for min-length
  if (settings.minLength) {
    if (value.length === 0) {
      return {
        valid: false,
        error: 'This field is required.'
      };
    } else if (value.length < settings.minLength) {
      return {
        valid: false,
        error: `Must be at least ${settings.minLength} characters.`
      };
    }
  }

  // check for formatting requirements
  if (settings.format) {
    let format = settings.format.trim().toLowerCase();
    if (format === 'email') {
      if (!isValidEmail(value)) {
        return {
          valid: false,
          error: 'Must be a valid email address.'
        };
      }
    }
  }

  return {valid: true};
}
