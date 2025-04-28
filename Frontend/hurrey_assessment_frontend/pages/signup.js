import { useState } from 'react';
import styles from '../styles/Signup.module.css';
import Router, { useRouter } from 'next/router';
export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const router=useRouter();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Loading...');

    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('Signup successful! ✅');
        setTimeout(()=>{
          router.push('/login')
        },2000)
        
        
      } else {
        setMessage(data.msg || 'Signup failed ❌');
      }
    } catch (error) {
      setMessage('Server error ❌');
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.card}>
        <h2>Signup</h2>
        <input
          name="name"
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
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
        <button type="submit">Create Account</button>
        <p className={styles.message}>{message}</p>
      </form>
    </div>
  );
}
