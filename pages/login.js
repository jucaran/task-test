import React, { useState, useContext, useRef } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "./providers/AuthProvider";
import Link from "next/link";
import styles from "./styles/auth.module.css";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, loginWithGoogle } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(emailRef.current.value, passwordRef.current.value);
      router.push("/");
    } catch (err) {
      setError(err?.message);
      console.log(err);
    }
  };

  return (
    <main className={styles.auth_container}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className={styles.auth_form}>
        <label htmlFor="email">Email:</label>
        <input ref={emailRef} type="text" name="email" />
        <label htmlFor="password">Password:</label>
        <input ref={passwordRef} type="password" name="password" />
        <button type="submit">Sign in</button>
        {error && <span style={{ color: "red" }}>{error}</span>}
        <span onClick={loginWithGoogle} className={styles.google_btn}>
          Use Google Account
        </span>
      </form>
      <Link href="/signup">Don't have an account? Sing-Up!</Link>
    </main>
  );
}
