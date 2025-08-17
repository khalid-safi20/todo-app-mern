import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadUser } from './redux/slices/authSlice';
import setAuthToken from './utils/setAuthToken';
import Header from './components/common/Header';
import PrivateRoute from './components/common/PrivateRoute';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import LoadingSpinner from './components/common/LoadingSpinner';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check for token in localStorage
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    // Load user
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <div className="min-h-screen transition-colors duration-200 bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="container px-4 py-8 mx-auto">
        <React.Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/dashboard"
              element={<PrivateRoute component={Dashboard} />}
            />
            <Route
              path="/profile"
              element={<PrivateRoute component={Profile} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </React.Suspense>
      </main>
    </div>
  );
}

export default App;