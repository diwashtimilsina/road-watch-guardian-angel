
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DriverPanel from './DriverPanel';

const DriverPanelAuth: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('driverLoggedIn') === 'true';
    
    if (!isLoggedIn) {
      navigate('/driver-login');
    }
  }, [navigate]);

  // If we get here, the user is logged in, so render the DriverPanel
  return <DriverPanel />;
};

export default DriverPanelAuth;
