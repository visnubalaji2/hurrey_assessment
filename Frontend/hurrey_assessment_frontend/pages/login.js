import { useState } from 'react';
import Link from 'next/link'; 
import styles from '../styles/Login.module.css';
import Router, { useRouter } from 'next/router';
import UserContext from "@/context/UserContext";
import React, { useContext } from 'react';
export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const router=useRouter();
  const {saveToken}=useContext(UserContext)
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Loading...');

    try {


      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('Login successful!');
        localStorage.setItem('token',data.token)
        saveToken(data.token)
        router.push('/detection')

        
      } else {
        setMessage(data.msg || 'Login failed');
      }
    } catch (error) {
      setMessage('Server error ❌');
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.card}>
        <h2>Login</h2>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
        <p className={styles.message}>{message}</p>
        <p className={styles.linkText}>
          New here?{' '}
          <Link href="/signup" className={styles.link}>
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}
