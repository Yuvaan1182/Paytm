import { useState } from 'react';
import GlassCard from './GlassCard';
import { CircleUserRound } from 'lucide-react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const user = useSelector(state => state.profile.user);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleUpdate = async e => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');
    try {
      // TODO: Replace with real API call
      await new Promise(res => setTimeout(res, 1000));
      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <GlassCard className="p-4 text-4xl dark:text-white">Settings</GlassCard>
      <GlassCard className="flex w-fit flex-col gap-10 p-10">
        <GlassCard className="flex items-center gap-4 p-10">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-gray-300 object-cover dark:text-white">
            <CircleUserRound size={80} />
          </div>
          <div>
            <h1 className="text-3xl font-semibold text-gray-700 capitalize dark:text-white">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-gray-500 dark:text-gray-300">{user.email}</p>
          </div>
        </GlassCard>
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-white">Profile Settings</h2>
          <p className="text-gray-600 dark:text-gray-300">Manage your profile settings here.</p>
          <form className="mt-4 flex max-w-md flex-col gap-4" onSubmit={handleUpdate}>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="mb-1 block text-gray-700 dark:text-gray-200">First Name</label>
                <input
                  type="text"
                  value={user.firstName}
                  disabled
                  className="w-full cursor-not-allowed rounded border bg-gray-100 px-3 py-2 text-gray-800 capitalize dark:bg-gray-800 dark:text-white"
                />
              </div>
              <div className="flex-1">
                <label className="mb-1 block text-gray-700 dark:text-gray-200">Last Name</label>
                <input
                  type="text"
                  value={user.lastName}
                  disabled
                  className="w-full cursor-not-allowed rounded border bg-gray-100 px-3 py-2 text-gray-800 capitalize dark:bg-gray-800 dark:text-white"
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-gray-700 dark:text-gray-200">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full rounded border px-3 py-2 text-gray-800 dark:bg-gray-800 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-gray-700 dark:text-gray-200">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full rounded border px-3 py-2 text-gray-800 dark:bg-gray-800 dark:text-white"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  className="absolute top-2 right-2 text-sm text-gray-500"
                  onClick={() => setShowPassword(v => !v)}
                  tabIndex={-1}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
            {success && <p className="text-green-600">{success}</p>}
            {error && <p className="text-red-600">{error}</p>}
          </form>
        </div>
      </GlassCard>
    </div>
  );
};

export default Profile;
