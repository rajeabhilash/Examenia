import React from "react";
import { SignIn, SignUp, SignedIn, SignedOut } from "@clerk/clerk-react";

export function AuthenticationPage() {
  return (
    <div className="auth-container">
      <SignedIn>
        <h1>Welcome Back!</h1>
        <p>You are already signed in.</p>
      </SignedIn>
      <SignedOut>
        <h1>Sign In or Sign Up</h1>
        <SignIn path="/sign-in" routing="path" signUpUrl="/sign-in" />
        <SignUp path="/sign-up" routing="path" signInUrl="/sign-up" />
      </SignedOut>

    </div>
  );
}