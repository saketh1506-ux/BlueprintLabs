# BlueprintLabs

BlueprintLabs is an architectural design and floor-plan planning platform. This repository contains the complete project code, including the automated Android APK generation pipeline following official submission criteria.

---

## 1. Project Overview & Repository Structure

- `android-webview/` – Native Kotlin Android application using an Empty Views Activity and fullscreen Android WebView that renders the interactive Figma prototype.
- `mobile/` – Full React Native / Expo Android mobile design application (9 core wireframe screens).
- `server/` – Express, TypeScript & Socket.IO real-time backend API.
- `prisma/` – MySQL database schema, migrations, and seed scripts.
- `.github/workflows/` – Automated GitHub Actions CI/CD pipeline for building `app-debug.apk` and versioned GitHub Releases.

---

## 2. Professor's Official Android APK Submission Deliverable

The submission requirements dictate a native Android application built in Kotlin that wraps the verified Figma prototype inside a responsive Android WebView:
- **Application Name:** BlueprintLabs
- **Package Identifier:** `com.blueprintlabs.app`
- **Language:** Kotlin
- **Activity Template:** Empty Views Activity (XML Layouts, no Compose)
- **Minimum SDK:** API 26 (Android 8.0 Oreo)
- **Target SDK:** API 34 (Android 14)
- **Permissions:** `android.permission.INTERNET`, `android.permission.ACCESS_NETWORK_STATE`
- **Primary Deliverables:**
  - `app-debug.apk` (Installable Android APK)
  - `BlueprintLabs_Submission.zip` (Submission ZIP package containing `app-debug.apk`)

---

## 3. Automated GitHub Actions CI/CD Pipeline

Every push to `master` / `main` and version tags triggers the automated build workflow:
[`.github/workflows/android-apk.yml`](.github/workflows/android-apk.yml)

### Workflow Steps:
1. **Checks out code** and configures **Java 17 (Temurin)**.
2. **Executes Gradle:** `./gradlew assembleDebug`.
3. **Validates APK existence & non-zero file size**.
4. **Packages `BlueprintLabs_Submission.zip`** with `app-debug.apk` inside.
5. **Uploads CI Artifacts** (`app-debug` and `BlueprintLabs_Submission`).
6. **Creates GitHub Releases (on tag push e.g. `v1.0.0`)**:
   Automatically attaches `app-debug.apk` and `BlueprintLabs_Submission.zip` with generated release notes.

---

## 4. How to Create a Versioned Release

To release a new version with automated APK compilation and release asset publishing:

```bash
# 1. Tag your commit (e.g., v1.0.0)
git tag v1.0.0

# 2. Push tag to GitHub
git push origin v1.0.0
```

GitHub Actions will automatically run the build, verify the APK, and publish the release under the **Releases** tab on GitHub.

---

## 5. How to Build Locally

### Option A: Using Android Studio GUI
1. Open Android Studio.
2. Select **Open** and choose the `android-webview` folder.
3. Allow Gradle sync to complete.
4. Go to **Build** $\rightarrow$ **Build Bundle(s) / APK(s)** $\rightarrow$ **Build APK(s)**.
5. Locate the APK at:
   `android-webview/app/build/outputs/apk/debug/app-debug.apk`

### Option B: Using Gradle CLI
```bash
cd android-webview
./gradlew assembleDebug
```

---

## 6. How to Install on Pixel 6 (Android 14, API 34)

1. Launch your Pixel 6 emulator (API 34, Android 14, x86_64).
2. Install the APK via ADB:
   ```bash
   adb install -r android-webview/app/build/outputs/apk/debug/app-debug.apk
   ```
3. Open **BlueprintLabs** from the app launcher.
4. The interactive Figma prototype will load full-screen with touch navigation enabled.
