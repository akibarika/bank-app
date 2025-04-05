/**
 * This is an integration test for the CreateAccount component.
 * It tests the form submission and redirects to the success page.
 * It also tests the validation errors for invalid nickname.
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';
import CreateAccount from '@/app/create-account/page';

// Mock `useRouter` from Next.js
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('CreateAccount integration test', () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should submit valid form and redirect to success page', async () => {
    // Mock successful API response
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    render(<CreateAccount />);

    // Fill out the form with valid data
    fireEvent.change(screen.getByLabelText(/Account Nickname/i), {
      target: { value: 'My Savings Account' },
    });

    fireEvent.click(screen.getByLabelText(/Savings Account/i));

    fireEvent.change(screen.getByLabelText(/Savings Goal/i), {
      target: { value: '5000' },
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /create account/i }));

    // Verify API call and redirect
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        '/api/create-account',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        })
      );
      expect(pushMock).toHaveBeenCalledWith('/?success=true');
    });
  });

  it('should show validation errors for invalid nickname', async () => {
    render(<CreateAccount />);

    // Enter invalid nickname (too short)
    fireEvent.change(screen.getByLabelText(/Account Nickname/i), {
      target: { value: 'ab' },
    });

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /create account/i }));

    // Verify error message appears
    expect(
      await screen.findByText(/nickname must be between/i)
    ).toBeInTheDocument();
    expect(fetch).not.toHaveBeenCalled();
  });
});
