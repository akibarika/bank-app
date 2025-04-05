# Bank Account Application

A simple React app built with **Next.js 15** and **React 19** that allows users to open bank accounts.  
This demo demonstrates form handling, validation, conditional rendering, API simulation, and testing in best practices.

## Features

- Homepage with a link to open a new bank account
- Account creation form:
  - Account nickname input
  - Account type selection (everyday / savings)
  - Conditional savings goal field for savings accounts
- Custom form validation:
  - Nickname must be 5–30 characters
  - Savings goal is required for savings accounts
  - Goal cannot exceed $1,000,000
  - Real-time error messages that disappear on correction
- API simulation using a dummy POST request
- Redirect with success or failure message

---

## Tech Stack

- **Next.js 15 (App Router)**
- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **Jest** for unit & integration tests
- **Cypress** for end-to-end testing

---

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing

Unit and integration testing are implemented using Jest. To run these tests:

```bash
# Run Unit & Integration Tests (Jest)
npm run test
```

End-to-end tests are implemented using Cypress. To run the tests:

```bash
# Start the dev server in one terminal
npm run dev

# Run Cypress tests in another terminal
npm run cypress:open
```

The tests cover the happy paths for creating both everyday and savings accounts.

## Project Structure

```bash
src/
├── app/
│   ├── create-account/        # Account creation page (client component)
│   ├── api/create-account/    # Dummy API route (POST handler)
│   ├── utils/                 # Form logic (validation, sanitization)
│   └── __tests__/             # Unit & integration tests
├── constants/                 # Messages constants
cypress/                       # End-to-end test
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
