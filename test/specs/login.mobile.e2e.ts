import { expect } from '@wdio/globals'
import LoginScreen from '../pageobjects/LoginScreen'

describe('WDIO Demo App - Login Test', () => {
    beforeEach(async () => {
        // Go to Login screen before each test
        await LoginScreen.goToLoginScreen();
    });

    it('should login successfully with valid credentials (Happy Case)', async () => {
        const validEmail = 'test@example.com';
        const validPassword = 'Password123';

        await LoginScreen.login(validEmail, validPassword);

        // Check for success alert
        await LoginScreen.successAlertTitle.waitForDisplayed();
        await expect(LoginScreen.successAlertTitle).toHaveText('Success');
        await expect(LoginScreen.alertMessage).toHaveText('You are logged in!');

        // Close the alert
        await LoginScreen.alertOkBtn.click();
    });

    it('should show validation errors with invalid credentials (Fail Case)', async () => {
        const invalidEmail = 'invalid-email';
        const shortPassword = '123';

        await LoginScreen.login(invalidEmail, shortPassword);

        // Check for validation errors below the fields
        await expect(LoginScreen.emailError).toBeDisplayed();
        await expect(LoginScreen.passwordError).toBeDisplayed();
    });
});
