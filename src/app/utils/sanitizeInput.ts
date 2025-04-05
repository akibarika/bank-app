import { FormDataType } from '../create-account/page';

export type SanitizedFormData = Omit<FormDataType, 'savingsGoal'> & {
  savingsGoal?: string;
};

// Sanitize input data for the API call
export const sanitizeInput = (input: {
  nickname: unknown;
  accountType: unknown;
  savingsGoal?: unknown;
}): SanitizedFormData => {
  return {
    nickname: typeof input.nickname === 'string' ? input.nickname.trim() : '',
    accountType:
      input.accountType === 'savings' || input.accountType === 'everyday'
        ? input.accountType
        : 'everyday',
    savingsGoal:
      typeof input.savingsGoal === 'string'
        ? input.savingsGoal.trim()
        : input.savingsGoal !== undefined
          ? String(input.savingsGoal).trim()
          : undefined,
  };
};
