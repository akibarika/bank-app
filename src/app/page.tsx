'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  const searchParams = useSearchParams();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Show success message if success param is true
    if (searchParams.get('success') === 'true') {
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 5000);
      return () => clearTimeout(timer);
    }

    // Show error message if error param is true
    if (searchParams.get('error') === 'true') {
      const message =
        searchParams.get('message') ||
        'An error occurred while creating your account.';
      setErrorMessage(message);
      setShowError(true);
      const timer = setTimeout(() => setShowError(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      {showSuccess && (
        <div className="mb-6 rounded-md bg-green-100 p-4 text-green-800">
          Your account was successfully created!
        </div>
      )}
      {showError && (
        <div className="mb-6 rounded-md bg-red-100 p-4 text-red-800">
          {errorMessage}
        </div>
      )}
      <h1 className="mb-6 text-3xl font-bold">Welcome to Our Bank</h1>
      <Link
        href="/create-account"
        className="cursor-pointer rounded-4xl bg-fuchsia-950 px-4 py-2 font-bold text-white transition-colors duration-300 hover:bg-fuchsia-800"
      >
        Open a bank account
      </Link>
    </div>
  );
}
