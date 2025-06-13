"use client";

import { useState, useEffect } from 'react';
import { IoPersonOutline, IoKeyOutline } from 'react-icons/io5';

interface ProfileData {
  username: string;
  lastLoginAt: string | null;
}

export default function AdminProfileDashboard() {
  const [profileData, setProfileData] = useState<ProfileData>({ username: '', lastLoginAt: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [passwordFormData, setPasswordFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [usernameFormData, setUsernameFormData] = useState({
    newUsername: '',
    currentPassword: '',
  });

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const response = await fetch('/api/auth/me');
      const data = await response.json();

      if (response.ok) {
        setProfileData(data);
        setUsernameFormData(prev => ({ ...prev, newUsername: data.username }));
      } else {
        setError('Failed to fetch profile data');
      }
    } catch (err) {
      setError('An error occurred while fetching profile data');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (passwordFormData.newPassword !== passwordFormData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    try {
      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: passwordFormData.currentPassword,
          newPassword: passwordFormData.newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Password updated successfully');
        setPasswordFormData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
      } else {
        setError(data.error || 'Failed to update password');
      }
    } catch (err) {
      setError('An error occurred while updating password');
    }
  };

  const handleUsernameChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      const response = await fetch('/api/auth/change-username', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          newUsername: usernameFormData.newUsername,
          currentPassword: usernameFormData.currentPassword
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Username updated successfully');
        setProfileData(prev => ({ ...prev, username: usernameFormData.newUsername }));
        setUsernameFormData(prev => ({ ...prev, currentPassword: '' }));
        fetchProfileData();
      } else {
        setError(data.error || 'Failed to update username');
      }
    } catch (err) {
      setError('An error occurred while updating username');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div
      className="max-w-7xl mx-auto p-6 space-y-8 bg-black"
    >
      {/* Dashboard Welcome Section */}
      <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 backdrop-blur-xl p-8 rounded-3xl shadow-lg border border-blue-900/20">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          Welcome back, {profileData.username || 'Admin'}
        </h1>
        <p className="text-gray-400 mt-3 text-lg">
          Here's what's happening with your website today.
        </p>
        {profileData.lastLoginAt && (
          <p className="text-sm text-gray-500 mt-2">
            Last login: {new Date(profileData.lastLoginAt).toLocaleString()}
          </p>
        )}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Username Change Form */}
          <form onSubmit={handleUsernameChange} className="bg-zinc-900 rounded-2xl shadow-xl p-8 border border-blue-900/20">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-md">
                <IoPersonOutline className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Change Username</h3>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Current Username
                </label>
                <p className="px-4 py-3 rounded-xl bg-zinc-800 text-gray-300 border border-zinc-700">
                  {profileData.username}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  New Username
                </label>
                <div className="relative">
                  <IoPersonOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={usernameFormData.newUsername}
                    onChange={(e) => setUsernameFormData({ ...usernameFormData, newUsername: e.target.value })}
                    className="w-full pl-10 px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm text-gray-200"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <IoKeyOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    value={usernameFormData.currentPassword}
                    onChange={(e) => setUsernameFormData({ ...usernameFormData, currentPassword: e.target.value })}
                    className="w-full pl-10 px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm text-gray-200"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:opacity-90 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-md"
              >
                Update Username
              </button>
            </div>
          </form>
        </div>

        {/* Right Column */}
        <div>
          {/* Password Change Form */}
          <form onSubmit={handlePasswordChange} className="bg-zinc-900 rounded-2xl shadow-xl p-8 border border-blue-900/20">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-md">
                <IoKeyOutline className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Change Password</h3>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <IoKeyOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    value={passwordFormData.currentPassword}
                    onChange={(e) => setPasswordFormData({ ...passwordFormData, currentPassword: e.target.value })}
                    className="w-full pl-10 px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm text-gray-200"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <IoKeyOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    value={passwordFormData.newPassword}
                    onChange={(e) => setPasswordFormData({ ...passwordFormData, newPassword: e.target.value })}
                    className="w-full pl-10 px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm text-gray-200"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <IoKeyOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    value={passwordFormData.confirmPassword}
                    onChange={(e) => setPasswordFormData({ ...passwordFormData, confirmPassword: e.target.value })}
                    className="w-full pl-10 px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm text-gray-200"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:opacity-90 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-md"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}