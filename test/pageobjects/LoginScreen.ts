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
     * Actions
     */
    async goToLoginScreen () {
        await this.loginTab.waitForDisplayed();
        await this.loginTab.click();
    }

    async login (email: string, password: string) {
        await this.inputEmail.setValue(email);
        await this.inputPassword.setValue(password);
        await this.btnLogin.click();
    }
}

export default new LoginScreen();
