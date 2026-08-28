import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">✓</span>
          </div>
          <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
          <p className="text-white/70 text-sm mt-1">Log in to manage your tasks</p>
        </div>

        {error && (
          <p className="bg-red-500/20 border border-red-400/40 text-red-100 text-sm mb-4 text-center py-2 rounded-lg">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white/20 text-white placeholder-white/60 border border-white/30 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-white/50"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white/20 text-white placeholder-white/60 border border-white/30 rounded-lg p-3 mb-6 focus:outline-none focus:ring-2 focus:ring-white/50"
            required
          />

          <button
            type="submit"
            className="w-full bg-white text-purple-700 font-semibold py-3 rounded-lg hover:bg-white/90 transition shadow-lg"
          >
            Log In
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-white/80">
          Don't have an account?{' '}
          <Link to="/register" className="text-white font-semibold hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;