
import React, { useState, useEffect } from 'react';
import Dashboard from '../components/Dashboard';
import { generateMockVehicles, generateMockIncidents } from '../services/mockData';

const Index: React.FC = () => {
  const [initialVehicles, setInitialVehicles] = useState([]);
  const [initialIncidents, setInitialIncidents] = useState([]);

  useEffect(() => {
    const vehicles = generateMockVehicles(12);
    const incidents = generateMockIncidents(vehicles, 5);
    
    setInitialVehicles(vehicles);
    setInitialIncidents(incidents);
  }, []);

  return <Dashboard />;
};

export default Index;
