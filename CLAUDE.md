# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

WebdriverIO + Appium mobile automation testing project for Android applications. Uses TypeScript, Mocha (BDD), and the Page Object Model pattern.

## Commands

```bash
# Install dependencies
npm ci

# Run all tests
npm test

# Run tests with wdio directly
npm run wdio

# Install Appium driver (required once)
appium driver install uiautomator2
```

## Architecture

### Test Structure
- `test/specs/*.ts` - Test specifications (Mocha BDD style with `describe`/`it`)
- `test/pageobjects/*.ts` - Page Object Model classes for UI screens
- `wdio.conf.ts` - WebdriverIO configuration

### Page Object Pattern
Each Page Object class:
- Uses getter methods for element selectors (`get elementName()`)
- Accessibility ID selectors preferred: `$('~accessibility-id')`
- XPath for complex queries: `$('//android.widget.TextView[@text="value"]')`
- Export as singleton: `export default new ScreenClass()`

### Element Selectors
- Accessibility ID: `$('~button-LOGIN')`
- XPath by resource-id: `$('//android.widget.TextView[@resource-id="android:id/message"]')`
- XPath by text: `$('//android.widget.TextView[@text="Success"]')`

### Configuration (wdio.conf.ts)
- Runner: local Appium server on port 4723
- Platform: Android emulator (`emulator-5554`)
- App path: `./apps/app.apk` (Git LFS)
- Framework: Mocha with 60s timeout
- Wait timeout: 10 seconds

## APK Management

The APK file is stored in Git LFS:
- Location: `apps/app.apk`
- Git LFS tracked via `.gitattributes`
- CI pulls with `git lfs pull`

## CI/CD Pipeline

GitHub Actions workflow (`.github/workflows/blank.yml`):
1. Boots Android emulator (API 33, Pixel 5, x86_64)
2. Installs APK from `./apps/app.apk`
3. Runs `npm test` with `APP_PATH` env var
4. Uploads `screenshots/` and `allure-results/` artifacts

## TypeScript

- Target: ES2022
- Module: CommonJS
- No emit (`noEmit: true`) - TypeScript used for type checking only