# B-Ticket Automation Test Suite

This repository contains automated test cases for the B-Ticket application using Playwright, a modern cross-browser testing framework. The test suite covers coupon management, user registration, and sign-in functionalities.

## Table of Contents

- [Project Overview](#project-overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Test Structure](#test-structure)
- [Project Scripts](#project-scripts)
- [Troubleshooting](#troubleshooting)

## Project Overview

The B-Ticket automation test suite provides comprehensive testing coverage for:

- **Coupon Management**: Create, delete, filter, and validate coupons with various discount types
- **Registration**: Test user registration flow and validations
- **Sign In**: Test login functionality and validation scenarios

### Test Modules

- `CouponManagement/` - Tests for coupon creation, submission, deletion, filtering, and search operations
- `Registration/` - User registration validation tests
- `SignIn/` - Login and sign-in validation tests
- `helpers/` - Reusable test utilities (Login, Date filtering helpers)
- `assets/` - Test assets including images and files used during test execution

## Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js**: Version 14.0 or higher
- **npm**: Comes with Node.js (version 6.0 or higher)
- **Git**: For cloning and version control

To verify your installations, run:

```powershell
node --version
npm --version
git --version
```

## Installation

Follow these steps to set up the project:

### 1. Clone the Repository

```powershell
git clone https://github.com/testusernamelei/B-ticketAutomation.git
cd B-ticket
```

### 2. Install Dependencies

Install the required npm packages, including Playwright:

```powershell
npm install
```

This will install:

- `@playwright/test` - The Playwright testing framework
- `@types/node` - TypeScript type definitions for Node.js

### 3. Install Playwright Browsers

After installing dependencies, install the browser binaries for cross-browser testing:

```powershell
npx playwright install
```

This downloads and installs Chromium, Firefox, and WebKit browsers.

## Configuration

### Playwright Configuration

The project is configured via `playwright.config.ts` with the following settings:

- **Test Directory**: `./tests` - All test files should be placed here
- **Parallel Execution**: Tests run in parallel for faster execution (can be disabled)
- **Reporters**: HTML report generation for test results
- **Browsers**: Configured to run tests across Chromium, Firefox, and WebKit
- **Trace Collection**: Traces are captured on the first test retry for debugging
- **Retries**: 
  - CI environment: 2 retries
  - Local environment: No retries

### Environment Variables (Optional)

If you need to configure environment-specific settings, create a `.env` file in the project root:

```
# Example environment variables
BASE_URL=http://localhost:3000
TEST_USER_EMAIL=testuser@example.com
TEST_USER_PASSWORD=password123
```

To use environment variables, uncomment the dotenv import in `playwright.config.ts`:

```typescript
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });
```

## Running Tests

### Run All Tests

Execute all tests across all configured browsers:

```powershell
npx playwright test
```

### Run Tests in a Specific Browser

Run tests in a single browser:

```powershell
# Chromium
npx playwright test --project=chromium

# Firefox
npx playwright test --project=firefox

# WebKit (Safari)
npx playwright test --project=webkit
```

### Run Specific Test File

Run a single test file:

```powershell
npx playwright test tests/CouponManagement/Submit-Coupon-Fixed.spec.ts
```

### Run Tests with Pattern Matching

Run tests matching a specific pattern:

```powershell
npx playwright test --grep "Coupon"
```

### Run Tests in Debug Mode

Run tests with the Playwright Inspector for step-by-step debugging:

```powershell
npx playwright test --debug
```

### Run Tests with UI Mode

Run tests in an interactive UI mode where you can see the browser in action:

```powershell
npx playwright test --ui
```

### View Test Report

After running tests, view the generated HTML report:

```powershell
npx playwright show-report
```

## Test Structure

### Test Naming Convention

Tests are organized by feature/module:

```
tests/
├── CouponManagement/
│   ├── Submit-Coupon-Fixed.spec.ts      # Fixed discount coupon submission
│   ├── Submit-Coupon-Free.spec.ts       # Free coupon submission
│   ├── Delete-Coupon.spec.ts            # Coupon deletion tests
│   ├── Draft-Coupon.spec.ts             # Draft coupon handling
│   ├── Filter-Date.spec.ts              # Date filter validations
│   ├── Filter-Discount-Validations.spec.ts # Discount filter tests
│   ├── Filter-Status-Validations.spec.ts   # Status filter tests
│   └── Search-Validations.spec.ts       # Coupon search functionality
├── Registration/
│   └── RegistrationValidations.spec.ts  # Registration flow tests
├── SignIn/
│   └── Login-Validations.spec.ts        # Login validation tests
├── helpers/
│   ├── Login.ts                         # Reusable login helper
│   └── Date-Filter.ts                   # Date filtering utilities
└── assets/
    └── [Test images and files]          # Test assets
```

### Example Test Structure

```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../helpers/Login';

test('Test Case Name', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.login();
  
  // Test actions here
  await page.getByRole('button', { name: 'Action' }).click();
  
  // Assertions
  await expect(page.getByText('Expected Text')).toBeVisible();
});
```

## Project Scripts

Add these scripts to your `package.json` for convenient test execution:

```json
{
  "scripts": {
    "test": "playwright test",
    "test:chrome": "playwright test --project=chromium",
    "test:firefox": "playwright test --project=firefox",
    "test:webkit": "playwright test --project=webkit",
    "test:debug": "playwright test --debug",
    "test:ui": "playwright test --ui",
    "report": "playwright show-report",
    "test:coupon": "playwright test tests/CouponManagement",
    "test:auth": "playwright test tests/SignIn tests/Registration"
  }
}
```

Then run tests using:

```powershell
npm run test
npm run test:chrome
npm run test:debug
npm run report
```

## Troubleshooting

### Browser Installation Issues

If Playwright browsers fail to install, try:

```powershell
npx playwright install chromium firefox webkit
```

### Tests Not Finding Elements

- Ensure the application is running and accessible
- Check that selectors in the test match the current UI structure
- Use `--debug` mode to inspect elements in real-time

### Permission Denied Errors (Windows)

If you encounter permission issues:

```powershell
# Run PowerShell as Administrator
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Clear Test Artifacts

To remove test results and cached data:

```powershell
Remove-Item -Path "test-results" -Recurse -Force
Remove-Item -Path "playwright-report" -Recurse -Force
```

### Debugging Failed Tests

- Check the HTML report in `playwright-report/index.html`
- Review error context in `test-results/` for failed test details
- Use `npx playwright codegen` to record new test steps

## Additional Resources

- [Playwright Documentation](https://playwright.dev)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Playwright Debugging](https://playwright.dev/docs/debug)
- [Playwright Inspector](https://playwright.dev/docs/inspector)

## Contributing

When adding new tests:

1. Follow the existing naming convention
2. Use the `LoginPage` helper for authentication tests
3. Add test assets to the `assets/` directory
4. Document test purpose with descriptive names
5. Ensure tests are idempotent (can run multiple times without side effects)

## License

ISC

## Support

For issues or questions, refer to the Playwright documentation or check the test report for detailed error information.
