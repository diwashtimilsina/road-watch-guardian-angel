
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Car, Shield, Users, Map as MapIcon, LogIn, UserPlus } from "lucide-react";

import PanelNavigation from '../components/layout/PanelNavigation';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <PanelNavigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Vehicle Tracking System</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real-time monitoring and incident management for your fleet
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-2 border-blue-200 hover:border-blue-500 transition-all">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <MapIcon className="h-6 w-6 text-blue-500" /> 
                Dashboard
              </CardTitle>
              <CardDescription>
                Main tracking dashboard with map view
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-gray-600">
                View all vehicles on map, monitor incidents, and get real-time updates
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link to="/">Access Dashboard</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-2 border-red-200 hover:border-red-500 transition-all">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-red-500" /> 
                Admin Panel
              </CardTitle>
              <CardDescription>
                Fleet management and configuration
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-gray-600">
                Manage your fleet, assign vehicles, resolve incidents, and configure system settings
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link to="/admin">Access Admin Panel</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-2 border-green-200 hover:border-green-500 transition-all">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Car className="h-6 w-6 text-green-500" /> 
                Driver Panel
              </CardTitle>
              <CardDescription>
                For vehicle operators
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-gray-600">
                Update vehicle status, report incidents, and receive dispatch communications
              </p>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button asChild variant="outline" className="w-full">
                <Link to="/driver">Access Driver Portal</Link>
              </Button>
              <div className="grid grid-cols-2 gap-2 w-full">
                <Button asChild variant="ghost" size="sm" className="w-full">
                  <Link to="/driver-login" className="flex items-center">
                    <LogIn className="mr-1 h-4 w-4" /> 
                    Login
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="sm" className="w-full">
                  <Link to="/driver-register" className="flex items-center">
                    <UserPlus className="mr-1 h-4 w-4" /> 
                    Register
                  </Link>
                </Button>
              </div>
            </CardFooter>
          </Card>

          <Card className="border-2 border-purple-200 hover:border-purple-500 transition-all">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-6 w-6 text-purple-500" /> 
                User Portal
              </CardTitle>
              <CardDescription>
                Public transit information
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-gray-600">
                Track public transit, view schedules, and get service alerts
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link to="/user">Access User Portal</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">System Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapIcon className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-lg font-medium mb-2">Real-time Tracking</h3>
              <p className="text-gray-600">Monitor your vehicles with live GPS tracking and status updates</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="text-lg font-medium mb-2">Incident Management</h3>
              <p className="text-gray-600">Detect and respond to incidents rapidly with automated alerts</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="text-lg font-medium mb-2">Role-Based Access</h3>
              <p className="text-gray-600">Customized interfaces for administrators, drivers, and users</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
