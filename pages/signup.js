import React, { useContext, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./styles/auth.module.css";
import { AuthContext } from "./providers/AuthProvider";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords must match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      router.push("/");
    } catch (err) {
      setError(err.message);
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <main className={styles.auth_container}>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className={styles.auth_form}>
        <label htmlFor="email">Email:</label>
        <input ref={emailRef} type="text" name="email" />
        <label htmlFor="password">Password:</label>
        <input ref={passwordRef} type="password" name="passwordConfirm" />
        <label htmlFor="password">Confirm password:</label>
        <input ref={passwordConfirmRef} type="password" name="password" />
        {error && <span style={{ color: "red" }}>{error}</span>}
        <button disable={loading.toString()} type="submit">
          Create account
        </button>
        <button disable={loading.toString()} className={styles.google_btn}>
          Use Google Account
        </button>
        <Link href="/login">Already have an account? Sign-In!</Link>
      </form>
    </main>
  );
}
