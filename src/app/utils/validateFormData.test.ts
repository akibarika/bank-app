import { validateFormData } from '@/app/utils/validateFormData';
import { VALIDATION_MESSAGES } from '@/constants/messages';

describe('validateFormData', () => {
  it('should pass with valid everyday account', () => {
    const result = validateFormData({
      nickname: '  Primary  ',
      accountType: 'everyday',
      savingsGoal: '',
    });

    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
    expect(result.sanitized.nickname).toBe('Primary');
  });

  it('should return error if nickname is too short', () => {
    const result = validateFormData({
      nickname: 'abc',
      accountType: 'everyday',
      savingsGoal: '',
    });

    expect(result.isValid).toBe(false);
    expect(result.errors.nickname).toBe(VALIDATION_MESSAGES.NICKNAME_LENGTH);
  });

  it('should return error if savingsGoal is required but missing', () => {
    const result = validateFormData({
      nickname: 'My Savings',
      accountType: 'savings',
      savingsGoal: '',
    });

    expect(result.isValid).toBe(false);
    expect(result.errors.savingsGoal).toBe(
      VALIDATION_MESSAGES.SAVINGS_GOAL_REQUIRED
    );
  });

  it('should validate numeric savings goal within limit', () => {
    const result = validateFormData({
      nickname: 'My Savings',
      accountType: 'savings',
      savingsGoal: '2000000',
    });

    expect(result.isValid).toBe(false);
    expect(result.errors.savingsGoal).toBe(
      VALIDATION_MESSAGES.SAVINGS_GOAL_MAX
    );
  });
});
