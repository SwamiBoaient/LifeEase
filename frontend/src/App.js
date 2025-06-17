import React, { useState, useContext, createContext, useEffect } from 'react';
import './App.css';

// Auth Context
const AuthContext = createContext();

// Mock data storage (in production, this would be a proper backend)
const mockStorage = {
  users: [],
  profiles: [],
  sessions: {}
};

// Main App Component
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentView, setCurrentView] = useState('welcome');
  const [registrationData, setRegistrationData] = useState({});
  const [otpSent, setOtpSent] = useState(false);
  const [deviceBound, setDeviceBound] = useState(false);

  return (
    <AuthContext.Provider value={{
      currentUser,
      setCurrentUser,
      currentView,
      setCurrentView,
      registrationData,
      setRegistrationData,
      otpSent,
      setOtpSent,
      deviceBound,
      setDeviceBound
    }}>
      <div className="App">
        {currentView === 'welcome' && <WelcomeScreen />}
        {currentView === 'register' && <RegistrationScreen />}
        {currentView === 'otp-verify' && <OTPVerificationScreen />}
        {currentView === 'create-credentials' && <CreateCredentialsScreen />}
        {currentView === 'login' && <LoginScreen />}
        {currentView === 'profiles' && <ProfilesScreen />}
        {currentView === 'add-elderly' && <AddElderlyScreen />}
        {currentView === 'face-setup' && <FaceRecognitionSetup />}
        {currentView === 'elderly-login' && <ElderlyLoginScreen />}
      </div>
    </AuthContext.Provider>
  );
}

// Welcome Screen
const WelcomeScreen = () => {
  const { setCurrentView } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-500 rounded-full mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Welcome to <span className="text-blue-500">LifeEase</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Caring made simple. Connect caregivers and elderly loved ones with intelligent assistance and peace of mind.
            </p>
          </div>

          {/* Hero Image */}
          <div className="mb-10">
            <img 
              src="https://images.pexels.com/photos/5257343/pexels-photo-5257343.jpeg" 
              alt="Elderly people using technology together"
              className="w-full max-w-md mx-auto rounded-2xl shadow-lg"
            />
          </div>

          {/* Action Buttons */}
          <div className="space-y-4 md:space-y-0 md:space-x-6 md:flex md:justify-center">
            <button
              onClick={() => setCurrentView('register')}
              className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all transform hover:scale-105 shadow-lg"
            >
              Get Started - Register
            </button>
            <button
              onClick={() => setCurrentView('login')}
              className="w-full md:w-auto border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-semibold py-4 px-8 rounded-full text-lg transition-all transform hover:scale-105"
            >
              Already Have Account - Login
            </button>
          </div>

          {/* Features Preview */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800">Easy Setup</h3>
              <p className="text-sm text-gray-600">Simple registration for caregivers and elderly profiles</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800">Face Recognition</h3>
              <p className="text-sm text-gray-600">Secure and easy login for elderly users</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800">Peace of Mind</h3>
              <p className="text-sm text-gray-600">Monitor and assist your loved ones safely</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Registration Screen
const RegistrationScreen = () => {
  const { setCurrentView, setRegistrationData } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    city: '',
    country: '',
    email: '',
    phone: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setRegistrationData(formData);
    setCurrentView('otp-verify');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-2xl mx-auto py-8">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Your LifeEase Account</h1>
            <p className="text-gray-600">Set up care for your loved one</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
              <input
                type="date"
                required
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Country *</label>
                <select
                  required
                  value={formData.country}
                  onChange={(e) => setFormData({...formData, country: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                >
                  <option value="">Select Country</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="AU">Australia</option>
                  <option value="IN">India</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setCurrentView('welcome')}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-all"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-105"
              >
                Continue to Verification
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// OTP Verification Screen
const OTPVerificationScreen = () => {
  const { setCurrentView, registrationData, setOtpSent } = useContext(AuthContext);
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSentLocal] = useState(false);

  const sendOTP = () => {
    // Simulate OTP sending
    setOtpSentLocal(true);
    setOtpSent(true);
    // In real app, this would call backend API
  };

  const verifyOTP = (e) => {
    e.preventDefault();
    // Mock verification - in real app, verify with backend
    if (otp === '123456' || otp.length === 6) {
      setCurrentView('create-credentials');
    } else {
      alert('Invalid OTP. For demo, use "123456" or any 6-digit code.');
    }
  };

  useEffect(() => {
    sendOTP();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-md mx-auto py-16">
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-4">Verify Your Identity</h1>
          <p className="text-gray-600 mb-6">
            We've sent verification codes to:<br/>
            <strong>{registrationData.email}</strong><br/>
            <strong>{registrationData.phone}</strong>
          </p>

          {otpSent && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-green-700 text-sm">Verification codes sent successfully!</span>
              </div>
            </div>
          )}

          <form onSubmit={verifyOTP} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Enter 6-Digit Code</label>
              <input
                type="text"
                required
                maxLength="6"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-2xl text-center tracking-widest"
                placeholder="123456"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-4 px-6 rounded-lg transition-all transform hover:scale-105"
            >
              Verify & Continue
            </button>

            <button
              type="button"
              onClick={sendOTP}
              className="w-full text-purple-500 hover:text-purple-600 font-medium py-2"
            >
              Resend Verification Code
            </button>
          </form>

          <div className="mt-6 text-sm text-gray-500">
            <strong>Demo Note:</strong> Use "123456" or any 6-digit code to proceed
          </div>
        </div>
      </div>
    </div>
  );
};

// Create Credentials Screen
const CreateCredentialsScreen = () => {
  const { setCurrentView, registrationData, setCurrentUser } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.password !== credentials.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Create user account
    const newUser = {
      id: Date.now(),
      ...registrationData,
      ...credentials,
      role: 'caregiver',
      profiles: []
    };

    mockStorage.users.push(newUser);
    setCurrentUser(newUser);
    setCurrentView('profiles');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-cyan-50 p-4">
      <div className="max-w-md mx-auto py-16">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v-2H7v-2H4a1 1 0 01-1-1v-4a1 1 0 011-1h3.243l2.474-2.474A6 6 0 0121 9z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Create Login Credentials</h1>
            <p className="text-gray-600">Set up your secure access</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input
                type="text"
                required
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg"
                placeholder="Choose a unique username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                required
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg"
                placeholder="Create a strong password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <input
                type="password"
                required
                value={credentials.confirmPassword}
                onChange={(e) => setCredentials({...credentials, confirmPassword: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg"
                placeholder="Confirm your password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-4 px-6 rounded-lg transition-all transform hover:scale-105"
            >
              Create Account & Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Login Screen
const LoginScreen = () => {
  const { setCurrentView, setCurrentUser } = useContext(AuthContext);
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock login - in real app, verify with backend
    const user = mockStorage.users.find(u => 
      u.username === loginData.username && u.password === loginData.password
    );

    if (user || loginData.username === 'demo' && loginData.password === 'demo') {
      const demoUser = user || {
        id: 1,
        firstName: 'Demo',
        lastName: 'Caregiver',
        username: 'demo',
        role: 'caregiver',
        profiles: [
          {
            id: 1,
            name: 'Grandma Rose',
            age: 78,
            relationship: 'Grandmother',
            avatar: 'https://images.pexels.com/photos/3768131/pexels-photo-3768131.jpeg',
            deviceBound: false
          }
        ]
      };
      setCurrentUser(demoUser);
      setCurrentView('profiles');
    } else {
      alert('Invalid credentials. For demo, use username: "demo" and password: "demo"');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-md mx-auto py-16">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your LifeEase account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username or Email</label>
              <input
                type="text"
                required
                value={loginData.username}
                onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                required
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                checked={loginData.rememberMe}
                onChange={(e) => setLoginData({...loginData, rememberMe: e.target.checked})}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-6 rounded-lg transition-all transform hover:scale-105"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setCurrentView('register')}
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              Don't have an account? Register here
            </button>
          </div>

          <div className="mt-6 text-sm text-gray-500 text-center">
            <strong>Demo Credentials:</strong><br/>
            Username: demo | Password: demo
          </div>
        </div>
      </div>
    </div>
  );
};

// Profiles Screen (Netflix-style)
const ProfilesScreen = () => {
  const { currentUser, setCurrentView } = useContext(AuthContext);

  const handleProfileSelect = (profile) => {
    if (profile.role === 'caregiver') {
      // Caregiver can manage profiles, view dashboard
      alert('Caregiver Dashboard - Full access to manage all profiles and settings');
    } else {
      // Elderly profile selected
      if (profile.deviceBound) {
        setCurrentView('elderly-login');
      } else {
        setCurrentView('face-setup');
      }
    }
  };

  const profiles = [
    {
      id: 'caregiver',
      name: `${currentUser?.firstName || 'Demo'} (Caregiver)`,
      role: 'caregiver',
      avatar: 'https://images.pexels.com/photos/3791664/pexels-photo-3791664.jpeg',
      isCaregiver: true
    },
    ...(currentUser?.profiles || [
      {
        id: 1,
        name: 'Grandma Rose',
        age: 78,
        relationship: 'Grandmother',
        avatar: 'https://images.pexels.com/photos/3768131/pexels-photo-3768131.jpeg',
        deviceBound: false
      }
    ])
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4">
      <div className="max-w-6xl mx-auto py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Who's using LifeEase?</h1>
          <p className="text-xl text-gray-300">Select your profile to continue</p>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
          {profiles.map((profile) => (
            <div key={profile.id} className="text-center group cursor-pointer" onClick={() => handleProfileSelect(profile)}>
              <div className="relative mb-4 transform group-hover:scale-110 transition-transform duration-300">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-32 h-32 rounded-2xl mx-auto object-cover shadow-2xl border-4 border-transparent group-hover:border-white"
                />
                {profile.isCaregiver && (
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                )}
              </div>
              <h3 className="text-xl font-semibold text-white mb-1">{profile.name}</h3>
              {profile.age && (
                <p className="text-gray-400">Age {profile.age} • {profile.relationship}</p>
              )}
              {profile.isCaregiver && (
                <p className="text-blue-400 text-sm">Administrator Access</p>
              )}
            </div>
          ))}

          {/* Add Profile Button */}
          <div className="text-center group cursor-pointer" onClick={() => setCurrentView('add-elderly')}>
            <div className="relative mb-4 transform group-hover:scale-110 transition-transform duration-300">
              <div className="w-32 h-32 rounded-2xl mx-auto bg-gray-700 border-4 border-dashed border-gray-500 group-hover:border-white flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-white mb-1">Add Elderly Profile</h3>
            <p className="text-gray-400 text-sm">Set up care for another loved one</p>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => {
              setCurrentView('welcome');
            }}
            className="text-gray-400 hover:text-white font-medium transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};

// Add Elderly Profile Screen
const AddElderlyScreen = () => {
  const { setCurrentView } = useContext(AuthContext);
  const [elderlyData, setElderlyData] = useState({
    name: '',
    age: '',
    relationship: '',
    medicalConditions: '',
    emergencyContact: '',
    preferences: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add to profiles
    alert('Elderly profile created successfully! Next: Set up face recognition for easy access.');
    setCurrentView('face-setup');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 p-4">
      <div className="max-w-2xl mx-auto py-8">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <img 
              src="https://images.pexels.com/photos/8437019/pexels-photo-8437019.jpeg" 
              alt="Healthcare app interface"
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
            />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Add Elderly Profile</h1>
            <p className="text-gray-600">Tell us about your loved one to personalize their care</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
              <input
                type="text"
                required
                value={elderlyData.name}
                onChange={(e) => setElderlyData({...elderlyData, name: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-lg"
                placeholder="e.g., Rose Johnson"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age *</label>
                <input
                  type="number"
                  required
                  value={elderlyData.age}
                  onChange={(e) => setElderlyData({...elderlyData, age: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-lg"
                  placeholder="78"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Relationship *</label>
                <select
                  required
                  value={elderlyData.relationship}
                  onChange={(e) => setElderlyData({...elderlyData, relationship: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-lg"
                >
                  <option value="">Select relationship</option>
                  <option value="Mother">Mother</option>
                  <option value="Father">Father</option>
                  <option value="Grandmother">Grandmother</option>
                  <option value="Grandfather">Grandfather</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Medical Conditions</label>
              <textarea
                value={elderlyData.medicalConditions}
                onChange={(e) => setElderlyData({...elderlyData, medicalConditions: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-lg"
                rows="3"
                placeholder="Any medical conditions, allergies, or medications we should know about..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact</label>
              <input
                type="text"
                value={elderlyData.emergencyContact}
                onChange={(e) => setElderlyData({...elderlyData, emergencyContact: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-lg"
                placeholder="Doctor or emergency contact information"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preferences & Notes</label>
              <textarea
                value={elderlyData.preferences}
                onChange={(e) => setElderlyData({...elderlyData, preferences: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-lg"
                rows="3"
                placeholder="Any preferences, habits, or important notes..."
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setCurrentView('profiles')}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-all"
              >
                Back to Profiles
              </button>
              <button
                type="submit"
                className="flex-1 bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-105"
              >
                Create Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Face Recognition Setup
const FaceRecognitionSetup = () => {
  const { setCurrentView, setDeviceBound } = useContext(AuthContext);
  const [step, setStep] = useState('intro');
  const [scanning, setScanning] = useState(false);

  const startFaceSetup = () => {
    setStep('scanning');
    setScanning(true);
    
    // Simulate face scanning process
    setTimeout(() => {
      setScanning(false);
      setStep('success');
    }, 3000);
  };

  const completeFaceSetup = () => {
    setDeviceBound(true);
    setCurrentView('profiles');
  };

  if (step === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
        <div className="max-w-md mx-auto py-16">
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>

            <h1 className="text-2xl font-bold text-gray-800 mb-4">Set Up Face Recognition</h1>
            <p className="text-gray-600 mb-8">
              Make login easier and more secure for your loved one with face recognition technology.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-800 mb-2">Benefits:</h3>
              <ul className="text-sm text-blue-700 text-left space-y-1">
                <li>• No need to remember passwords</li>
                <li>• Quick and secure access</li>
                <li>• Automatic device binding</li>
                <li>• Fallback options available</li>
              </ul>
            </div>

            <button
              onClick={startFaceSetup}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-4 px-6 rounded-lg transition-all transform hover:scale-105 mb-4"
            >
              Start Face Recognition Setup
            </button>

            <button
              onClick={() => setCurrentView('profiles')}
              className="w-full text-gray-500 hover:text-gray-700 font-medium py-2"
            >
              Skip for Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'scanning') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 p-4">
        <div className="max-w-md mx-auto py-16">
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
            <div className="relative mb-8">
              <div className="w-48 h-48 mx-auto border-4 border-blue-500 rounded-full flex items-center justify-center relative overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                  <svg className="w-24 h-24 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                
                {scanning && (
                  <div className="absolute inset-0 border-4 border-green-500 rounded-full animate-pulse"></div>
                )}
                
                {/* Scanning animation overlay */}
                {scanning && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-1 bg-green-500 animate-pulse"></div>
                  </div>
                )}
              </div>
            </div>

            <h1 className="text-2xl font-bold text-gray-800 mb-4">Scanning Face...</h1>
            <p className="text-gray-600 mb-6">
              Please look directly at the camera and keep your face centered.
            </p>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center">
                <div className="animate-spin mr-3">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <span className="text-green-700 text-sm">Processing facial features...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
        <div className="max-w-md mx-auto py-16">
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h1 className="text-2xl font-bold text-gray-800 mb-4">Face Recognition Setup Complete!</h1>
            <p className="text-gray-600 mb-8">
              This device is now bound to the elderly user profile. They can now login securely using face recognition.
            </p>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-green-800 mb-2">What's Next:</h3>
              <ul className="text-sm text-green-700 text-left space-y-1">
                <li>• Device automatically recognizes the user</li>
                <li>• Face login will be the primary method</li>
                <li>• Caregiver assistance available if needed</li>
                <li>• Profile switching prevented for security</li>
              </ul>
            </div>

            <button
              onClick={completeFaceSetup}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-lg transition-all transform hover:scale-105"
            >
              Complete Setup
            </button>
          </div>
        </div>
      </div>
    );
  }
};

// Elderly Login Screen
const ElderlyLoginScreen = () => {
  const { setCurrentView } = useContext(AuthContext);
  const [loginMethod, setLoginMethod] = useState('face');
  const [faceRecognizing, setFaceRecognizing] = useState(false);
  const [recognitionStatus, setRecognitionStatus] = useState('');

  const startFaceLogin = () => {
    setFaceRecognizing(true);
    setRecognitionStatus('Looking for face...');
    
    setTimeout(() => {
      setRecognitionStatus('Face detected, verifying...');
      setTimeout(() => {
        setRecognitionStatus('Welcome back, Grandma Rose!');
        setTimeout(() => {
          alert('Login successful! Welcome to your LifeEase dashboard.');
          // In a real app, this would navigate to elderly dashboard
        }, 1500);
      }, 2000);
    }, 1500);
  };

  useEffect(() => {
    // Auto-start face recognition for bound devices
    startFaceLogin();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 p-4">
      <div className="max-w-md mx-auto py-8">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <img 
              src="https://images.pexels.com/photos/3768131/pexels-photo-3768131.jpeg" 
              alt="Grandma Rose"
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-pink-200"
            />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back!</h1>
            <p className="text-gray-600 text-lg">Let's get you signed in securely</p>
          </div>

          {loginMethod === 'face' && (
            <div className="space-y-6">
              <div className="relative">
                <div className="w-64 h-48 mx-auto border-4 border-pink-300 rounded-2xl flex items-center justify-center bg-gradient-to-br from-pink-50 to-orange-50 relative overflow-hidden">
                  {!faceRecognizing ? (
                    <div className="text-center">
                      <svg className="w-16 h-16 text-pink-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <p className="text-sm text-pink-600">Camera Ready</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="w-20 h-20 bg-pink-200 rounded-full flex items-center justify-center mx-auto mb-2 animate-pulse">
                        <svg className="w-10 h-10 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <p className="text-sm text-pink-700">{recognitionStatus}</p>
                    </div>
                  )}
                  
                  {faceRecognizing && (
                    <div className="absolute inset-0 border-4 border-green-400 rounded-2xl animate-pulse"></div>
                  )}
                </div>
              </div>

              <div className="text-center space-y-4">
                <button
                  onClick={startFaceLogin}
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-4 px-6 rounded-full text-xl transition-all transform hover:scale-105"
                  disabled={faceRecognizing}
                >
                  {faceRecognizing ? 'Recognizing...' : 'Start Face Login'}
                </button>

                <button
                  onClick={() => setLoginMethod('password')}
                  className="w-full text-pink-600 hover:text-pink-700 font-medium py-2 text-lg"
                >
                  Use Password Instead
                </button>

                <button
                  onClick={() => alert('Caregiver will be notified to assist with login')}
                  className="w-full text-gray-500 hover:text-gray-600 font-medium py-2"
                >
                  Need Help? Contact Caregiver
                </button>
              </div>
            </div>
          )}

          {loginMethod === 'password' && (
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-3">Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-xl"
                  placeholder="Enter your password"
                />
              </div>

              <button
                className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-4 px-6 rounded-full text-xl transition-all transform hover:scale-105"
              >
                Sign In with Password
              </button>

              <button
                onClick={() => setLoginMethod('face')}
                className="w-full text-pink-600 hover:text-pink-700 font-medium py-2 text-lg"
              >
                Use Face Recognition Instead
              </button>
            </div>
          )}

          <div className="mt-8 text-center">
            <button
              onClick={() => setCurrentView('profiles')}
              className="text-gray-400 hover:text-gray-600 font-medium"
            >
              Back to Profile Selection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;