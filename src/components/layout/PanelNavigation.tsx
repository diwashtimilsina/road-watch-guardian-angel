
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Car, Shield, Users } from "lucide-react";

const PanelNavigation: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { 
      name: "Admin", 
      path: "/admin", 
      icon: <Shield className="h-5 w-5" /> 
    },
    { 
      name: "Driver", 
      path: "/driver", 
      icon: <Car className="h-5 w-5" /> 
    },
    { 
      name: "User", 
      path: "/user", 
      icon: <Users className="h-5 w-5" /> 
    },
    { 
      name: "Dashboard", 
      path: "/", 
      icon: <span className="h-5 w-5 flex items-center justify-center">🏠</span> 
    }
  ];

  return (
    <div className="bg-white shadow-md">
      <div className="container mx-auto">
        <nav className="flex items-center justify-center sm:justify-start space-x-1 p-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                currentPath === item.path
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <span className="mr-2">{item.icon}</span>
              <span className="hidden sm:inline">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default PanelNavigation;
