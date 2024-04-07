import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LoadingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/schedule');
    }, 10000);

    return () => clearTimeout(timer); // This will clear the timer when the component unmounts.
  }, [navigate]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <h1>Generating Your Perfect Schedule...</h1>
      {/* You can add more loading indicators here */}
    </div>
  );
  
}

export default LoadingPage;
