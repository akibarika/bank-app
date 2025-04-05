import { sanitizeInput } from '@/app/utils/sanitizeInput';

describe('sanitizeInput', () => {
  it('should trim strings and coerce non-strings', () => {
    const result = sanitizeInput({
      nickname: '   My Account   ',
      accountType: 'savings',
      savingsGoal: '   50000   ',
    });

    expect(result).toEqual({
      nickname: 'My Account',
      accountType: 'savings',
      savingsGoal: '50000',
    });
  });

  it('should convert non-string savingsGoal to string and trim', () => {
    const result = sanitizeInput({
      nickname: 'Acc',
      accountType: 'savings',
      savingsGoal: 12345,
    });

    expect(result.savingsGoal).toBe('12345');
  });

  it('should fallback to empty string if nickname is invalid', () => {
    const result = sanitizeInput({
      nickname: 123,
      accountType: 'everyday',
      savingsGoal: undefined,
    });

    expect(result.nickname).toBe('');
  });

  it('should default to "everyday" if accountType is invalid', () => {
    const result = sanitizeInput({
      nickname: 'Nick',
      accountType: 'business',
      savingsGoal: '100',
    });

    expect(result.accountType).toBe('everyday');
  });
});
