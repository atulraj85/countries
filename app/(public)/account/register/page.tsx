"use client";

import { useUserService } from "@/app/_services";
import Link from "next/link";
import { useForm } from "react-hook-form";


import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterForm() {
  const userService = useUserService();

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm();

  const registration = false;

  const fields = {
    firstName: register("firstName", {
      required: "First Name is required",
    }),
    lastName: register("lastName", { required: "Last Name is required" }),
    username: register("username", { required: "Username is required" }),
    password: register("password", {
      required: "Password is required",
      minLength: {
        value: 6,
        message: "Password must be at least 6 characters",
      },
    }),
  };

  async function onSubmit(user: any) {
    await userService.register(user);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {registration ? (
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-xl">Sign Up</CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input
                    id="first-name"
                    placeholder="Max"
                    required
                    {...fields.firstName}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input
                    id="last-name"
                    placeholder="Robinson"
                    required
                    {...fields.lastName}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Username"
                  required
                  {...fields.username}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" {...fields.password} />
              </div>
              <Button type="submit" className="w-full">
                Create an account
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?
              <Link href="/account/login" className="underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-xl">Sign Up</CardTitle>
            <CardDescription>Sorry, No RegisterForm.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mt-4 text-center text-sm">
              Already have an account?
              <Link href="/account/login" className="underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </form>
  );
}
