'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
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
