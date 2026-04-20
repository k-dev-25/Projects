const AUTH_ERROR_MESSAGES = {
  "auth/email-already-in-use": "This email is already registered. Try logging in instead.",
  "auth/invalid-email": "Please enter a valid email address.",
  "auth/missing-email": "Email is required.",
  "auth/missing-password": "Password is required.",
  "auth/weak-password": "Password must be at least 6 characters.",
  "auth/user-disabled": "This account has been disabled.",
  "auth/user-not-found": "No account found with this email.",
  "auth/wrong-password": "Incorrect password. Please try again.",
  "auth/invalid-credential": "Invalid email or password.",
  "auth/too-many-requests": "Too many attempts. Please wait and try again.",
  "auth/network-request-failed": "Network error. Check your connection and try again.",
};

export function getAuthErrorMessage(error) {
  const code = error?.code;

  if (code && AUTH_ERROR_MESSAGES[code]) {
    return AUTH_ERROR_MESSAGES[code];
  }

  if (error?.message) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
}
