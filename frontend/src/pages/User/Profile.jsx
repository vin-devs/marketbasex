import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";
import { useProfileMutation } from "../../redux/api/usersApiSlice";
import { FaUser, FaEnvelope, FaLock, FaHistory } from "react-icons/fa";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setUsername(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.username]);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully");
        setPassword("");
        setConfirmPassword("");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    }
  };

  return (
    <div className="bg-[#0a0a0c] min-h-screen text-white pb-32">
      <div className="container mx-auto px-5 flex justify-center items-start pt-10 md:pt-24 lg:pt-32">
        <div className="w-full max-w-2xl bg-slate-900/60 border border-slate-800 p-8 md:p-12 rounded-[2.5rem] backdrop-blur-xl shadow-2xl relative">
          {/* --- Avatar Header --- */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2">
            <div className="h-24 w-24 rounded-3xl bg-gradient-to-br from-indigo-600 to-pink-600 flex items-center justify-center text-3xl font-black text-white shadow-2xl shadow-indigo-500/20 border-4 border-[#0a0a0c]">
              {userInfo.username.charAt(0).toUpperCase()}
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between mb-12 mt-8 md:mt-4 gap-4">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-black tracking-tight text-white uppercase">
                Profile <span className="text-indigo-500">Settings</span>
              </h2>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-[3px] mt-1">
                Manage your identity
              </p>
            </div>

            <Link
              to="/user-orders"
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-300 hover:text-indigo-400 hover:border-indigo-500/50 transition-all"
            >
              <FaHistory /> Order History
            </Link>
          </div>

          <form onSubmit={submitHandler} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Username - Added text-white explicitly */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
                  Full Name
                </label>
                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    className="w-full bg-slate-800/50 border border-slate-700/50 p-3.5 pl-12 rounded-2xl text-white placeholder:text-slate-600 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm font-medium"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>

              {/* Email - Added text-white explicitly */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
                  Email Address
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    className="w-full bg-slate-800/50 border border-slate-700/50 p-3.5 pl-12 rounded-2xl text-white placeholder:text-slate-600 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm font-medium"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Password - Added text-white explicitly */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
                  New Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="password"
                    placeholder="Leave blank to keep current"
                    className="w-full bg-slate-800/50 border border-slate-700/50 p-3.5 pl-12 rounded-2xl text-white placeholder:text-slate-700 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm font-medium"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {/* Confirm Password - Added text-white explicitly */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    className="w-full bg-slate-800/50 border border-slate-700/50 p-3.5 pl-12 rounded-2xl text-white placeholder:text-slate-700 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm font-medium"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="pt-8">
              <button
                type="submit"
                disabled={loadingUpdateProfile}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-2xl font-black uppercase tracking-[3px] text-[10px] shadow-2xl shadow-indigo-600/30 transition-all active:scale-95 disabled:opacity-50"
              >
                {loadingUpdateProfile
                  ? "Processing Changes..."
                  : "Update Profile Now"}
              </button>
            </div>
          </form>

          {loadingUpdateProfile && (
            <div className="absolute inset-0 bg-[#0a0a0c]/60 backdrop-blur-md rounded-[2.5rem] flex justify-center items-center z-50">
              <Loader />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
