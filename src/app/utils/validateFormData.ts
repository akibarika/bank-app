import { FormDataType } from '../create-account/page';

type ValidationErrorsType = {
  nickname?: string;
  savingsGoal?: string;
};

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
    newErrors.nickname = 'Account nickname must be between 5 and 30 characters';
  }

  if (accountType === 'savings') {
    if (!savingsGoal) {
      newErrors.savingsGoal = 'Savings goal is required for savings accounts';
    } else {
      const amount = parseFloat(savingsGoal);
      if (Number.isNaN(amount)) {
        newErrors.savingsGoal = 'Savings goal must be a valid number';
      } else if (amount > 1_000_000) {
        newErrors.savingsGoal = 'Savings goal cannot exceed $1,000,000';
      }
    }
  }

  return {
    isValid: Object.keys(newErrors).length === 0,
    sanitized,
    errors: newErrors,
  };
};
