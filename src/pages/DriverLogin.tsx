
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Car, KeyRound, LogIn } from "lucide-react";
import PanelNavigation from '../components/layout/PanelNavigation';

// Form schema for validation
const formSchema = z.object({
  licenseId: z.string().min(5, { message: "License ID must be at least 5 characters." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

const DriverLogin: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      licenseId: "",
      password: "",
    },
  });
  
  // Handle form submission
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    // Mock authentication - would connect to a real backend in production
    setTimeout(() => {
      // For demo, hardcode a valid license/password
      if (values.licenseId === "DL-9876543" && values.password === "password123") {
        toast({
          title: "Login successful",
          description: "Welcome back, driver",
        });
        
        // Store login state in localStorage (for demo purposes)
        localStorage.setItem('driverLoggedIn', 'true');
        localStorage.setItem('driverLicenseId', values.licenseId);
        
        navigate('/driver');
      } else {
        toast({
          title: "Login failed",
          description: "Invalid license ID or password",
          variant: "destructive",
        });
      }
      
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PanelNavigation />
      
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Car className="h-8 w-8 text-blue-700" />
            </div>
            <CardTitle>Driver Login</CardTitle>
            <CardDescription>
              Enter your license ID and password to access the driver panel
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="licenseId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>License ID</FormLabel>
                      <FormControl>
                        <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                          <KeyRound className="ml-2 h-5 w-5 text-gray-400" />
                          <Input className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0" placeholder="Enter your license ID" {...field} />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Your driver license identification number
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormDescription>
                        Your secure password
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Logging in...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <LogIn className="mr-2 h-5 w-5" />
                      Login
                    </span>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
          
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <Link to="/driver-register" className="text-blue-600 hover:underline">
                Register here
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default DriverLogin;
