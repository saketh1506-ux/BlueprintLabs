# BlueprintLabs Android APK (Professor's Submission Package)

This is the official native Android application for **BlueprintLabs**, created in Kotlin using the **Empty Views Activity** template and **Android WebView** to display the interactive Figma prototype.

---

## 1. Project Specifications
- **Application Name:** BlueprintLabs
- **Package Identifier:** `com.blueprintlabs.app`
- **Language:** Kotlin
- **UI Architecture:** XML Layouts (`activity_main.xml`) + `MainActivity.kt`
- **Minimum SDK:** API 26 (Android 8.0 Oreo)
- **Target SDK:** API 34 (Android 14)
- **Permissions:** `android.permission.INTERNET`, `android.permission.ACCESS_NETWORK_STATE`

---

## 2. WebView Configuration & Features
- **JavaScript Enabled:** `webView.settings.javaScriptEnabled = true`
- **DOM Storage Enabled:** `webView.settings.domStorageEnabled = true`
- **Viewport & Scaling:** Configured with `loadWithOverviewMode = true` and `useWideViewPort = true` for responsive mobile fitting.
- **Hardware Back Navigation:** Integrated with Android 14 `OnBackPressedCallback` to navigate back through prototype history.
- **Loading & Error Handling:** Built-in centered progress indicator and offline retry layout.

---

## 3. How to Build & Run in Android Studio

1. Open **Android Studio**.
2. Select **File $\rightarrow$ Open...** and navigate to:
   ```
   d:\SEM5\UI_UX\PROTOTYPE\android-webview
   ```
3. Allow Gradle to sync dependencies.
4. Select the target device: **Pixel 6 (Android 14, API 34, x86_64)**.
5. Click **Build $\rightarrow$ Build Bundle(s) / APK(s) $\rightarrow$ Build APK(s)**.
6. The compiled debug APK will be generated at:
   ```
   android-webview/app/build/outputs/apk/debug/app-debug.apk
   ```
7. Package `app-debug.apk` into `BlueprintLabs_Submission.zip` for final university submission.
