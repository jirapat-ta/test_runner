import { $ } from '@wdio/globals'

class LoginScreen {
    /**
     * define selectors using getter methods
     */
    get loginTab () {
        return $('~Login');
    }

    get inputEmail () {
        return $('~input-email');
    }

    get inputPassword () {
        return $('~input-password');
    }

    get btnLogin () {
        return $('~button-LOGIN');
    }

    get alertTitle () {
        return $('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/androidx.appcompat.widget.LinearLayoutCompat/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.TextView');
    }

    get alertMessage () {
        return $('//android.widget.TextView[@resource-id="android:id/message"]');
    }

    get alertOkBtn () {
        return $('//android.widget.Button[@resource-id="android:id/button1"]');
    }
    
    // Alternative for Success alert
    get successAlertTitle() {
        return $('//android.widget.TextView[@text="Success"]');
    }

    get emailError () {
        return $('//android.widget.TextView[@text="Please enter a valid email address"]');
    }

    get passwordError () {
        return $('//android.widget.TextView[@text="Please enter at least 8 characters"]');
    }

    /**
     * Wait for app to be ready and in a stable state
     */
    async waitForAppReady() {
        // Wait for any of the main screen elements to be displayed
        await browser.waitUntil(
            async () => {
                try {
                    const loginTab = await this.loginTab.isDisplayed();
                    return loginTab;
                } catch {
                    return false;
                }
            },
            { timeout: 30000, timeoutMsg: 'App did not load in time' }
        );
    }

    /**
     * Actions
     */
    async goToLoginScreen () {
        await this.waitForAppReady();
        await this.loginTab.waitForDisplayed({ timeout: 30000 });
        await this.loginTab.click();
        // Wait for login screen elements to be ready after clicking the tab
        await this.inputEmail.waitForDisplayed({ timeout: 10000 });
    }

    async login (email: string, password: string) {
        await this.inputEmail.waitForDisplayed({ timeout: 10000 });
        await this.inputEmail.setValue(email);
        await this.inputPassword.setValue(password);
        await this.btnLogin.click();
    }
}

export default new LoginScreen();
