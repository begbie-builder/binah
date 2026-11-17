# Deploy Binah with Cloudflare Pages and Google sign-in

Checked against the official documentation on **16 November 2026**. Provider dashboards can rename navigation items. The repository is ready; you still need to create/connect your own Cloudflare and Firebase projects.

## 1. Deploy the working guest app first

1. Open [Cloudflare Dashboard](https://dash.cloudflare.com/) and sign in.
2. Go to **Workers & Pages → Create application → Pages → Connect to Git** (some layouts say **Import an existing Git repository**).
3. Connect GitHub and grant access to `begbie-builder/binah`.
4. Select `binah`, production branch **main**. Choose **Pages**, not a Worker-only deployment wizard.
5. Use these settings:

| Setting | Value |
| --- | --- |
| Framework preset | None |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | Empty / repository root |
| Environment variable | `NODE_VERSION` = `22` |

6. Save and deploy. Open the actual `https://YOUR_PROJECT.pages.dev` address Cloudflare returns; do not assume `binah.pages.dev` is available.
7. Complete the first lesson, refresh, and confirm its completion and XP remain. Guest mode is already fully usable.

Every later push to `main` triggers a Pages deployment. No secret or API token is needed for Git-based deployment. The app is static: no Pages Functions or Worker database bindings are required. Hash navigation means `/`, `/#letters`, `/#review`, and `/#settings` need no special server rewrite.

Official instructions: [Git integration](https://developers.cloudflare.com/pages/get-started/git-integration/) and [Static HTML](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/).

## 2. Create the free Google/Firebase backend

You want **Firebase Authentication**, which handles Google login, plus **Cloud Firestore**, which saves progress. Google login alone does not save lessons across devices.

1. Open [Firebase Console](https://console.firebase.google.com/) and create a project, for example `binah-learning`. The project ID must be globally unique.
2. Keep the **Spark / no-cost plan**. Analytics is unnecessary; leave it off if you want this implementation's no-analytics behavior. Do not link a billing account or accept a trial upgrade just for Binah.
3. Add a **Web app** (the `</>` icon) in Project overview. Register it as Binah. Firebase Hosting is not needed.
4. Copy the app's `firebaseConfig` object from **Project settings → General → Your apps**. This is the public web configuration, not a service-account credential.
5. Open **Authentication → Get started → Sign-in method → Google**. Enable it, pick the required support email, and save.
6. Open **Authentication → Settings → Authorized domains**. Add your exact Cloudflare hostname, e.g. `YOUR_PROJECT.pages.dev`, without `https://` and without a path. Add your custom domain too if you use one. For local testing, add `localhost` if absent. Newer projects may not add it automatically.
7. Open **Firestore Database → Create database**. Choose **Standard edition**, default database, a suitable region, and **production mode**. Do not leave the database in public test mode. Region selection is a long-lived project decision; choose near your expected learners.
8. Go to Firestore **Rules**, replace the entire rules editor with the exact contents of [`../firestore.rules`](../firestore.rules), and press **Publish**. Authentication alone does not protect a database.

The rules permit a signed-in learner to get, create, update, or delete only their own `users/{uid}` document. Collection listing and other paths are denied. They validate top-level progress shape and bounds; they are not a competitive anti-cheat system.

## 3. Connect the web configuration

Edit `public/config.js` in GitHub and replace `null` with your actual configuration:

```js
window.BINAH_FIREBASE_CONFIG = {
  apiKey: 'YOUR_WEB_API_KEY',
  authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
  projectId: 'YOUR_PROJECT_ID',
  appId: 'YOUR_WEB_APP_ID'
};
```

You may retain other generated public fields such as `messagingSenderId` and `storageBucket`; this app does not use Storage. Keep the generated `firebaseapp.com` **authDomain**. Do not substitute your Pages hostname for it. Popup sign-in uses Firebase's auth helper on that domain. This project deliberately uses popup sign-in, avoiding cross-site redirect persistence issues on Pages.

Commit this change to `main`. Cloudflare automatically rebuilds. You do **not** need environment variables for these fields in this build, and you do not need to create a separate Google Cloud OAuth client for the normal Firebase Google-provider flow. If Google requests a consent-screen configuration, follow the console's instructions for the same Firebase project; if the OAuth application is in Testing, add the intended test users or complete its publishing steps as appropriate.

The web config is designed to be public. Never put a Firebase Admin SDK JSON file, service-account private key, Google client secret, Cloudflare token, or personal GitHub token in this repository. Access control comes from Firebase Authentication and the published Firestore rules. See [Firebase web configuration](https://firebase.google.com/docs/projects/learn-more#config-files-objects).

## 4. Verify sign-in and sync before inviting people

1. In the deployed app, finish a lesson as guest.
2. Open **Your space → Continue with Google**, complete the popup, and confirm the account card displays your account.
3. Wait for **Synced with your account**, or press **Sync now**. In Firestore, verify a `users/{your UID}` record exists with a `progress` map.
4. Open the deployed app in another browser/device, sign into the same Google account, and confirm the completed lesson appears.
5. Sign out, then choose another Google account. Its profile must stay separate. Your original guest profile stays on its original browser.
6. Disconnect from the network, complete a lesson, reconnect, and check sync resumes. Offline guests work after the first successful shell download; Google sign-in requires a network.
7. Use the Firebase Rules Playground to confirm: unauthenticated reads fail; user A reading/writing user B's record fails; user A reading/writing their own valid record succeeds; malformed progress fails. Live Firebase end-to-end testing cannot be completed before your configuration exists.

Sync uses a Firestore transaction to merge a remote record before writing. It keeps lesson completions from either device and uses the newest review-card timestamp. For a shared calendar date, XP is the larger total, not the sum; this avoids duplicating backups but can undercount independent activity on two devices. Settings use the latest client timestamp. It is not a real-time collaborative state system. Refresh or use Sync now when moving between active devices.

## 5. What “free” means here

| Service | Relevant free allowance / behavior |
| --- | --- |
| Cloudflare Pages Free | 500 builds/month, one build at a time; 20,000 files; 25 MiB maximum per asset |
| Firebase Google sign-in | Social authentication is available without charge under the applicable plan limits; optional Identity Platform upgrades have distinct daily/monthly limits |
| Cloud Firestore free quota | One free database; 1 GiB storage; 50,000 reads/day; 20,000 writes/day; 20,000 deletes/day; 10 GiB outbound/month |
| Guest mode | Browser localStorage; no Firebase quota consumption |

This is suitable for a small launch, not an unlimited free service. Each sync transaction reads and writes a document, and contention can cause retries. The app debounces saves instead of writing for every pen movement. Monitor Firestore Usage and the Authentication limits for your actual project configuration. Stay on Spark to avoid pay-as-you-go billing; hitting a limit can interrupt cloud features. Local progress remains usable.

Official sources: [Pages limits](https://developers.cloudflare.com/pages/platform/limits/), [Firebase plans](https://firebase.google.com/docs/projects/billing/firebase-pricing-plans), [Auth limits](https://firebase.google.com/docs/auth/limits), [Firestore quotas](https://firebase.google.com/docs/firestore/quotas).

## Troubleshooting

| Symptom | Check |
| --- | --- |
| Cloudflare says output directory missing | Build command must be `npm run build`, output `dist`, root repository root. Inspect build logs. |
| Blank page on a local computer | Run the HTTP server; ES modules do not work reliably from `file://`. |
| Google isn't available message | Replace `null` in `public/config.js`, commit, and wait for the deployment. Confirm all four required fields. |
| `auth/unauthorized-domain` | Add the exact current hostname in Firebase authorized domains. Preview hosts need explicit authorization; do not authorize arbitrary wildcard sites. |
| Popup closes or is blocked | Allow the popup for this site and click Google again. Avoid launching the sign-in action from a delayed background callback. |
| Google says app is in testing | Configure allowed test users or publish the consent configuration in the matching Google Cloud project. |
| Signed in but sync fails | Create the default Firestore database and publish the provided rules. Check Spark quotas and network connectivity; check that `projectId` and `authDomain` belong to the same project. |
| Hebrew audio does not play | Install a Hebrew system speech voice. Binah intentionally does not fall back to an English voice reading Hebrew. |
| Old app after deployment | Refresh. If a shell update is pending, close old Binah tabs and reopen. Increment the service-worker cache version when changing shell contents in future releases. |
| Guest progress disappeared | It belongs to the exact browser profile and origin. Changing domains, private browsing, clearing site data, or browser eviction can remove it. Import a backup or use Google sync. |

For custom domains, add the domain through Cloudflare Pages first, then authorize that exact hostname in Firebase. Progress stored on `pages.dev` does not automatically move to a custom origin: export/import or sign into Google before changing domains.

## Add Binah to an iPhone or iPad Home Screen

Open the deployed site in Safari, tap **Share → Add to Home Screen**, keep **Open as Web App** enabled if offered, and tap **Add**. Binah provides an opaque 180 × 180 Apple touch icon exported from the exact favicon SVG, a standalone manifest with 192/512 PNGs, an app title, and safe-area-aware layouts. Installation help is also in **Your space**.

The website cannot silently add itself to iOS Home Screens; Safari handles the installation. Home Screen app state and ordinary Safari state can be separate. Google sync or an exported progress backup lets a learner move progress across those contexts. The icon PNGs are committed and copied by the normal build; Cloudflare needs no image-processing dependency.

Official references: [Apple's iPhone instructions](https://support.apple.com/en-ca/guide/iphone/iphea86e5236/27/ios/27), [WebKit Home Screen app behavior](https://webkit.org/blog/13878/), and [WebKit safe-area guidance](https://webkit.org/blog/7929/designing-websites-for-iphone-x/).
