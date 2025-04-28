import React from 'react';
import Carousel from './components/Carousel';
import { AuthProvider } from './components/AuthContext';
import { useAuth } from './components/AuthContext'; // ✅ Correct import
import Login from './components/Login';

function AppContent() {
  const { isLogin } = useAuth(); // ✅ use custom hook here

  return (
    <div>
      {isLogin ? (
        <>
          <h1 style={{ textAlign: 'center' }}>Swiper Carousel Demo</h1>
          <Carousel />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
