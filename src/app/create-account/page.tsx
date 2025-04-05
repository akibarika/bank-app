'use client';

import Link from 'next/link';
import { ChangeEvent, useState } from 'react';

// Define types for form data
type AccountType = 'everyday' | 'savings';

type FormDataType = {
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
  const [formData, setFormData] = useState<FormDataType>(initialFormData);
  const [errors, setErrors] = useState<ValidationErrorsType>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validate form data
  const validateForm = (): boolean => {
    const newErrors: ValidationErrorsType = {};

    // Account nickname validation (5-30 characters)
    if (formData.nickname.length < 5 || formData.nickname.length > 30) {
      newErrors.nickname =
        'Account nickname must be between 5 and 30 characters';
    }

    // Savings goal validation for savings account
    if (formData.accountType === 'savings') {
      if (!formData.savingsGoal) {
        newErrors.savingsGoal = 'Savings goal is required for savings accounts';
      } else {
        const savingsGoalAmount = parseFloat(formData.savingsGoal);
        if (isNaN(savingsGoalAmount)) {
          newErrors.savingsGoal = 'Savings goal must be a valid number';
        } else if (savingsGoalAmount > 1000000) {
          newErrors.savingsGoal = 'Savings goal cannot exceed $1,000,000';
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) return;

    setIsSubmitting(true);
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
              value={formData.nickname}
              onChange={onChange}
              className="w-full rounded-md border border-neutral-500 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="e.g., My Primary Account"
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
                type="number"
                id="savingsGoal"
                name="savingsGoal"
                value={formData.savingsGoal}
                onChange={onChange}
                className="w-full rounded-md border border-neutral-500 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter amount up to $1,000,000"
                // Note: Native validation attributes are commented out to allow testing custom error messages.
                // min={0}
                // max={1000000}
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
              {isSubmitting ? 'Creating...' : 'Create Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
