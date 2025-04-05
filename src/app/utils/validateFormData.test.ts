import { validateFormData } from '@/app/utils/validateFormData';

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
    expect(result.errors.nickname).toBe(
      'Account nickname must be between 5 and 30 characters'
    );
  });

  it('should return error if savingsGoal is required but missing', () => {
    const result = validateFormData({
      nickname: 'My Savings',
      accountType: 'savings',
      savingsGoal: '',
    });

    expect(result.isValid).toBe(false);
    expect(result.errors.savingsGoal).toBe(
      'Savings goal is required for savings accounts'
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
      'Savings goal cannot exceed $1,000,000'
    );
  });
});
