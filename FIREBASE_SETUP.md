# Firebase Setup Required Before Launch

The code validates Firebase configuration at startup, but Firebase services must also be enabled in the Firebase Console.

## Required services

1. Enable Authentication:
   - Open Firebase Console > Authentication > Sign-in method.
   - Enable Email/Password.
   - Create the admin user.
   - Copy the admin user's UID.

2. Update security rules:
   - Replace `REPLACE_WITH_ADMIN_UID` in `firestore.rules` and `storage.rules` with the real admin UID.
   - Deploy rules with:
     ```bash
     firebase deploy --only firestore:rules,storage
     ```

3. Enable Storage:
   - Open Firebase Console > Storage.
   - Click Get Started.
   - Use the default bucket.

4. Verify:
   ```bash
   npm run build
   firebase deploy --only firestore:rules --dry-run
   firebase deploy --only storage --dry-run
   ```
