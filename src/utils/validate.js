// regex for email addresses
const RE_EMAIL = /^\S+@\S+\.\S+$/;
// regex for Twitter handles
const RE_TWITTER = /^@[\S]{1,15}$/;

/**
 * Returns whether the supplied email matches the basic format of a valid email address
 * @param value The email to check
 * @returns {boolean} Whether the supplied email validates
 */
function isValidEmail(value) {
  return RE_EMAIL.test(value);
}

/**
 * Returns whether the supplied handle the basic format of a Twitter account
 * @param value The Twitter handle to check
 * @returns {boolean} Whether the Twitter handle validates
 */
function isValidTwitter(value) {
  return RE_TWITTER.test(value);
}

function validate(value, settings) {
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
    let min = settings.minLength;
    if (value.length === 0) {
      return {
        valid: false,
        error: 'This field is required.'
      };
    } else if (value.length < min) {
      return {
        valid: false,
        error: `Must be at least ${min} characters.`
      };
    }
  }

  // check for max-length
  if (settings.minLength) {
    let max = settings.maxLength;
    if (value.length > max) {
      return {
        valid: false,
        error: `Must be no more than ${max} characters.`
      };
    }
  }

  // check for formatting requirements
  if (settings.format) {
    let format = settings.format.trim().toLowerCase();

    // email address
    if (format === 'email') {
      if (!isValidEmail(value)) {
        return {
          valid: false,
          error: 'Must be a valid email address.'
        };
      }
    }

    // twitter handle
    if (format === 'twitter') {
      if (!isValidTwitter(value)) {
        return {
          valid: false,
          error: 'Must be a valid Twitter handle.'
        };
      }
    }
  }

  return {valid: true, error: ''};
}

export default validate;
