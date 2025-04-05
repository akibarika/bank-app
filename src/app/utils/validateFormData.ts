import { VALIDATION_MESSAGES } from '@/constants/messages';
import { FormDataType, ValidationErrorsType } from '../create-account/page';

const sanitizeFormData = (data: FormDataType) => ({
  nickname: data.nickname.trim(),
  accountType: data.accountType,
  savingsGoal: data.savingsGoal.trim(),
});

// Validate form data in the frontend
export const validateFormData = (
  formData: FormDataType
): {
  isValid: boolean;
  sanitized: FormDataType;
  errors: ValidationErrorsType;
} => {
  const newErrors: ValidationErrorsType = {};
  const sanitized = sanitizeFormData(formData);

  const { nickname, accountType, savingsGoal } = sanitized;

  if (nickname.length < 5 || nickname.length > 30) {
    newErrors.nickname = VALIDATION_MESSAGES.NICKNAME_LENGTH;
  }

  if (accountType === 'savings') {
    if (!savingsGoal) {
      newErrors.savingsGoal = VALIDATION_MESSAGES.SAVINGS_GOAL_REQUIRED;
    } else {
      const amount = parseFloat(savingsGoal);
      if (Number.isNaN(amount)) {
        newErrors.savingsGoal = VALIDATION_MESSAGES.SAVINGS_GOAL_INVALID;
      } else if (amount > 1_000_000) {
        newErrors.savingsGoal = VALIDATION_MESSAGES.SAVINGS_GOAL_MAX;
      }
    }
  }

  return {
    isValid: Object.keys(newErrors).length === 0,
    sanitized,
    errors: newErrors,
  };
};
