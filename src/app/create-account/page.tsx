'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import { validateFormData } from '../utils/validateFormData';

// Define types for form data
type AccountType = 'everyday' | 'savings';

export type FormDataType = {
  nickname: string;
  accountType: AccountType;
  savingsGoal: string;
};

type ValidationErrorsType = {
  nickname?: string;
  savingsGoal?: string;
};

// Initial form data
const initialFormData = {
  nickname: '',
  accountType: 'everyday',
  savingsGoal: '',
} as const;

export default function CreateAccount() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormDataType>(initialFormData);
  const [errors, setErrors] = useState<ValidationErrorsType>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form with sanitization
    const { isValid, sanitized, errors } = validateFormData(formData);
    if (!isValid) {
      setErrors(errors);
      return;
    }

    setIsSubmitting(true);
    // Clear errors after submission
    setErrors({});

    try {
      // Convert savings goal to number for the API call
      // {nickname: 'My savings account', savingsGoal: 500, accountType: 'savings'}
      const payload = {
        nickname: sanitized.nickname,
        accountType: sanitized.accountType,
        savingsGoal:
          sanitized.accountType === 'savings'
            ? parseFloat(sanitized.savingsGoal)
            : undefined,
      };

      // Make API request
      // TODO: Make API request to create account
      const response = await fetch('/api/create-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        // Note: a simple error message is returned from the API
        const errorMessage = await response.json();
        return router.push(
          `/?error=true&message=${encodeURIComponent(errorMessage.error)}`
        );
      }

      // Redirect back to home with success message
      router.push('/?success=true');
    } catch (error) {
      console.error('Creating account error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="w-full max-w-md rounded-lg border border-stone-300 bg-white p-6 shadow-xl">
        <h1 className="mb-6 text-center text-3xl font-bold">
          Open a Bank Account
        </h1>
        <form onSubmit={onSubmit} className="space-y-4">
          {/* Account Nickname */}
          <div>
            <label
              htmlFor="nickname"
              className="mb-4 block border-b-2 border-rose-700 pb-1.5 text-xl font-medium text-neutral-600"
            >
              Account Nickname
            </label>
            <input
              type="text"
              id="nickname"
              name="nickname"
              className="w-full rounded-md border border-neutral-500 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={formData.nickname}
              onChange={onChange}
              placeholder="Enter a nickname between 5 and 30 characters"
              // Note: Native validation attributes are commented out to allow testing custom error messages.
              //   minLength={5}
              //   maxLength={30}
              //   required
            />
            {errors.nickname && (
              <p className="mt-1 text-red-600">{errors.nickname}</p>
            )}
          </div>

          {/* Account Type */}
          <div>
            <p className="mb-4 block border-b-2 border-rose-700 pb-1.5 text-xl font-medium text-neutral-600">
              Account Type
            </p>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="everyday"
                  name="accountType"
                  value="everyday"
                  checked={formData.accountType === 'everyday'}
                  onChange={onChange}
                  className="h-4 w-4 accent-fuchsia-950 focus:ring-fuchsia-950"
                />
                <label
                  htmlFor="everyday"
                  className="ml-2 font-bold text-neutral-600"
                >
                  Everyday Account
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="savings"
                  name="accountType"
                  value="savings"
                  checked={formData.accountType === 'savings'}
                  onChange={onChange}
                  className="h-4 w-4 accent-fuchsia-950 focus:ring-fuchsia-950"
                />
                <label
                  htmlFor="savings"
                  className="ml-2 font-bold text-neutral-600"
                >
                  Savings Account
                </label>
              </div>
            </div>
          </div>

          {/* Savings Goal */}
          {formData.accountType === 'savings' && (
            <div>
              <label
                htmlFor="savingsGoal"
                className="mb-4 block border-b-2 border-rose-700 pb-1.5 text-xl font-medium text-neutral-600"
              >
                Savings Goal ($)
              </label>
              <input
                inputMode="numeric"
                type="number"
                id="savingsGoal"
                name="savingsGoal"
                className="w-full rounded-md border border-neutral-500 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={formData.savingsGoal}
                onChange={onChange}
                placeholder="Enter a savings goal up to $1,000,000"
                // Note: Native validation attributes are commented out to allow testing custom error messages.
                // min={0}
                // max={1_000_000}
                // step={0.01}
              />
              {errors.savingsGoal && (
                <p className="mt-1 text-red-600">{errors.savingsGoal}</p>
              )}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex items-center justify-between pt-2">
            <Link
              href="/"
              className="font-medium text-fuchsia-950 underline transition-colors hover:text-fuchsia-800"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer rounded-4xl bg-fuchsia-950 px-4 py-2 font-bold text-white transition-colors duration-300 hover:bg-fuchsia-800 disabled:opacity-50"
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
