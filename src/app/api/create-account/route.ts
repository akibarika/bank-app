import { SanitizedFormData, sanitizeInput } from '@/app/utils/sanitizeInput';
import { VALIDATION_MESSAGES } from '@/constants/messages';
import { NextResponse } from 'next/server';

const validateRequest = (data: SanitizedFormData) => {
  const { nickname, accountType, savingsGoal } = data;

  if (!nickname || nickname.length < 5 || nickname.length > 30)
    return VALIDATION_MESSAGES.NICKNAME_LENGTH;

  if (accountType !== 'everyday' && accountType !== 'savings')
    return VALIDATION_MESSAGES.ACCOUNT_TYPE_INVALID;

  if (accountType === 'savings') {
    if (!savingsGoal) return VALIDATION_MESSAGES.SAVINGS_GOAL_REQUIRED;

    const savingsGoalNum = +savingsGoal;

    if (Number.isNaN(savingsGoalNum))
      return VALIDATION_MESSAGES.SAVINGS_GOAL_INVALID;

    if (savingsGoalNum > 1_000_000) return VALIDATION_MESSAGES.SAVINGS_GOAL_MAX;
  }

  return null;
};

const isFormDataType = (data: unknown): data is SanitizedFormData => {
  if (typeof data !== 'object' || data === null) return false;
  const d = data as Record<string, unknown>;
  return (
    typeof d.nickname === 'string' &&
    (d.accountType === 'everyday' || d.accountType === 'savings')
  );
};

export async function POST(request: Request) {
  try {
    const raw = await request.json();
    const body = sanitizeInput(raw);

    // Validate the request data type
    if (!isFormDataType(body)) {
      return NextResponse.json(
        { error: 'Invalid request data' },
        { status: 400 }
      );
    }

    // Validate the request data
    // It's redundant with frontend validation, but it's a good practice in a real app. (Backend validation)
    const validationError = validateRequest(body);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const { nickname, accountType, savingsGoal } = body;

    // In this assignment, we'll just mock a successful creation to simulate the API response.
    // Delay the response to simulate a real API response
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Return a success response
    return NextResponse.json(
      {
        success: true,
        message: 'Account created successfully',
        account: {
          id: crypto.randomUUID(),
          nickname,
          accountType,
          createdAt: new Date().toISOString(),
          ...(accountType === 'savings' && { savingsGoal: +savingsGoal! }),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Failed to create account:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
