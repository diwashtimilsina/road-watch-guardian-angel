
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, MapPin, MessageSquare, Settings } from "lucide-react";

import PanelNavigation from '../components/layout/PanelNavigation';
import { Vehicle } from '../types';

// Mock driver data
const mockDriver = {
  id: "driver-001",
  name: "John Driver",
  vehicle: "V-001",
  status: "On Duty",
  licenseNumber: "DL-9876543",
  contact: "+1 555-1234",
  shift: "Morning (6 AM - 2 PM)",
  rating: 4.8
};

const DriverPanel: React.FC = () => {
  const { toast } = useToast();
  const [status, setStatus] = useState("active");
  const [reportMessage, setReportMessage] = useState("");
  
  const handleStatusChange = (value: string) => {
    setStatus(value);
    toast({
      title: "Status Updated",
      description: `Vehicle status changed to ${value}`,
    });
  };
  
  const handleLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Location Updated",
      description: "Your current location has been manually updated",
    });
  };
  
  const handleReportSubmit = () => {
    if (reportMessage.trim()) {
      toast({
        title: "Incident Reported",
        description: "Your incident report has been submitted",
      });
      setReportMessage("");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <PanelNavigation />
      
      <div className="p-4 flex-1 overflow-auto">
        <h1 className="text-2xl font-bold mb-6">Driver Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Driver Profile Section */}
          <Card>
            <CardHeader>
              <CardTitle>Driver Profile</CardTitle>
              <CardDescription>Your driver information and status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-3xl text-blue-700 font-bold">
                  {mockDriver.name.charAt(0)}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-sm text-gray-500">Driver Name</p>
                  <p className="font-medium">{mockDriver.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">License Number</p>
                  <p className="font-medium">{mockDriver.licenseNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Vehicle ID</p>
                  <p className="font-medium">{mockDriver.vehicle}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Contact</p>
                  <p className="font-medium">{mockDriver.contact}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Shift</p>
                  <p className="font-medium">{mockDriver.shift}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Rating</p>
                  <p className="font-medium">{mockDriver.rating}/5.0</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => toast({
                  title: "Profile Update",
                  description: "This would allow you to update your profile",
                })}
              >
                <Settings className="mr-2 h-4 w-4" />
                Update Profile
              </Button>
            </CardFooter>
          </Card>
          
          {/* Vehicle Status Section */}
          <Card>
            <CardHeader>
              <CardTitle>Vehicle Status</CardTitle>
              <CardDescription>Update your vehicle's current status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Current Status</label>
                <Select defaultValue={status} onValueChange={handleStatusChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="idle">Idle</SelectItem>
                    <SelectItem value="maintenance">Maintenance Required</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <form onSubmit={handleLocationSubmit} className="space-y-2">
                  <label className="text-sm font-medium">Manual Location Update</label>
                  <div className="flex space-x-2">
                    <Input placeholder="Latitude" type="text" />
                    <Input placeholder="Longitude" type="text" />
                  </div>
                  <Button type="submit" variant="outline" className="w-full">
                    <MapPin className="mr-2 h-4 w-4" />
                    Update Location
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
          
          {/* Incident Reporting Section */}
          <Card>
            <CardHeader>
              <CardTitle>Incident Reporting</CardTitle>
              <CardDescription>Report accidents, maintenance issues or other incidents</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Incident Type</label>
                <Select defaultValue="maintenance">
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="accident">Accident</SelectItem>
                    <SelectItem value="maintenance">Maintenance Issue</SelectItem>
                    <SelectItem value="alert">Security Alert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Severity</label>
                <Select defaultValue="low">
                  <SelectTrigger>
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea 
                  placeholder="Describe the incident..." 
                  value={reportMessage}
                  onChange={(e) => setReportMessage(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleReportSubmit}>
                <AlertCircle className="mr-2 h-4 w-4" />
                Submit Report
              </Button>
            </CardFooter>
          </Card>
          
          {/* Communication Section */}
          <Card>
            <CardHeader>
              <CardTitle>Communication Center</CardTitle>
              <CardDescription>Messages and notifications from dispatch</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                <div className="bg-blue-50 p-3 rounded-md">
                  <p className="text-sm text-gray-500">Today, 10:15 AM</p>
                  <p className="font-medium">Route Update</p>
                  <p className="text-sm">Please take alternate route due to construction on Main St.</p>
                </div>
                <div className="bg-yellow-50 p-3 rounded-md">
                  <p className="text-sm text-gray-500">Today, 9:30 AM</p>
                  <p className="font-medium">Weather Advisory</p>
                  <p className="text-sm">Rain expected in your area. Drive safely.</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-sm text-gray-500">Yesterday, 4:45 PM</p>
                  <p className="font-medium">Schedule Update</p>
                  <p className="text-sm">Your shift tomorrow has been confirmed for 8 AM.</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Input placeholder="Type message..." className="mr-2" />
              <Button variant="outline">
                <MessageSquare className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DriverPanel;
