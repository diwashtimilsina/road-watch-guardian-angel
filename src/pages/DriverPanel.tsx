
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, MapPin, MessageSquare, Settings, LogOut, Check, Send } from "lucide-react";

import PanelNavigation from '../components/layout/PanelNavigation';
import { Vehicle } from '../types';

const DriverPanel: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [status, setStatus] = useState("active");
  const [reportMessage, setReportMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      time: "Today, 10:15 AM",
      title: "Route Update",
      content: "Please take alternate route due to construction on Main St.",
      read: false
    },
    {
      time: "Today, 9:30 AM",
      title: "Weather Advisory",
      content: "Rain expected in your area. Drive safely.",
      read: false
    },
    {
      time: "Yesterday, 4:45 PM",
      title: "Schedule Update",
      content: "Your shift tomorrow has been confirmed for 8 AM.",
      read: true
    }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [driverName, setDriverName] = useState("");
  
  useEffect(() => {
    // Get the license ID from localStorage
    const licenseId = localStorage.getItem('driverLicenseId');
    
    // Mock driver data - in a real app, you would fetch this from a backend
    if (licenseId === "DL-9876543") {
      setDriverName("John Driver");
    }
    
  }, []);
  
  const handleStatusChange = (value: string) => {
    setStatus(value);
    toast({
      title: "Status Updated",
      description: `Vehicle status changed to ${value}`,
    });
  };
  
  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('driverLoggedIn');
    localStorage.removeItem('driverLicenseId');
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    
    // Redirect to home page
    navigate('/');
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
    } else {
      toast({
        title: "Cannot Submit",
        description: "Please provide a description of the incident",
        variant: "destructive"
      });
    }
  };
  
  const markAsRead = (index: number) => {
    const updatedMessages = [...messages];
    updatedMessages[index].read = true;
    setMessages(updatedMessages);
    
    toast({
      title: "Message Marked as Read",
      description: "Message has been marked as read",
    });
  };
  
  const sendMessage = () => {
    if (newMessage.trim()) {
      toast({
        title: "Message Sent",
        description: "Your message has been sent to dispatch",
      });
      setNewMessage("");
    }
  };

  // Mock driver data
  const mockDriver = {
    id: "driver-001",
    name: driverName || "John Driver",
    vehicle: "V-001",
    status: "On Duty",
    licenseNumber: "DL-9876543",
    contact: "+1 555-1234",
    shift: "Morning (6 AM - 2 PM)",
    rating: 4.8
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <PanelNavigation />
      
      <div className="p-4 flex-1 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Driver Dashboard</h1>
          <Button 
            variant="outline" 
            className="flex items-center text-red-500 hover:text-red-700 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Driver Profile Section */}
          <Card className="hover:shadow-lg transition-shadow">
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
                  <div className="flex items-center">
                    <p className="font-medium">{mockDriver.rating}/5.0</p>
                    <div className="ml-2 flex text-yellow-400">
                      {"★".repeat(Math.floor(mockDriver.rating))}
                      {"☆".repeat(5 - Math.floor(mockDriver.rating))}
                    </div>
                  </div>
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
          <Card className="hover:shadow-lg transition-shadow">
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
                    <SelectItem value="active">
                      <div className="flex items-center">
                        <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                        Active
                      </div>
                    </SelectItem>
                    <SelectItem value="idle">
                      <div className="flex items-center">
                        <span className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
                        Idle
                      </div>
                    </SelectItem>
                    <SelectItem value="maintenance">
                      <div className="flex items-center">
                        <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                        Maintenance Required
                      </div>
                    </SelectItem>
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
          <Card className="hover:shadow-lg transition-shadow">
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
                    <SelectItem value="accident">
                      <div className="flex items-center">
                        <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                        Accident
                      </div>
                    </SelectItem>
                    <SelectItem value="maintenance">
                      <div className="flex items-center">
                        <span className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
                        Maintenance Issue
                      </div>
                    </SelectItem>
                    <SelectItem value="alert">
                      <div className="flex items-center">
                        <span className="w-3 h-3 rounded-full bg-orange-500 mr-2"></span>
                        Security Alert
                      </div>
                    </SelectItem>
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
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Communication Center</CardTitle>
              <CardDescription>Messages and notifications from dispatch</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {messages.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`${msg.read ? 'bg-gray-50' : 'bg-blue-50'} p-3 rounded-md relative`}
                  >
                    <p className="text-sm text-gray-500">{msg.time}</p>
                    <p className="font-medium">{msg.title}</p>
                    <p className="text-sm">{msg.content}</p>
                    {!msg.read && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="absolute top-2 right-2" 
                        onClick={() => markAsRead(index)}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Input 
                placeholder="Type message..." 
                className="mr-2"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              />
              <Button variant="outline" onClick={sendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DriverPanel;
