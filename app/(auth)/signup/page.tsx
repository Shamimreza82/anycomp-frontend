/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import GoogleBtn from "@/components/other/GoogleBtn";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SignupInput, signupSchema } from "@/schemas/auth.schema";
import { toast } from "sonner";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";


export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  const { signup } = useAuth()



  const form = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "Reza",
      email: "shamimrezaone@gmail.com",
      password: "123456",
      confirmPassword: "123456",
      terms: true,
    },
  });

  const onSubmit = async (data: SignupInput) => {
    try {
      setLoading(true);


      const res = await signup(data.name, data.email, data.password)


      console.log(res)
      if (res.status) {
        toast.success("Account created successfully! Please check your email for verification.");
        router.push('/success')

      }


    } catch (error: any) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <>

      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Get Started on JobHub</h1>
            <p className="text-muted-foreground">
              Create your account to find your dream job
            </p>
          </div> */}

          <Card className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                {/* Full Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input {...field} className="pl-10" placeholder="John Doe" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input {...field} className="pl-10" placeholder="you@email.com" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input {...field} type="password" className="pl-10" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Confirm Password */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input {...field} type="password" className="pl-10" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Terms */}
                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="flex items-start gap-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        I agree to the{" "}
                        <Link href="#" className="text-primary">Terms</Link> &
                        <Link href="#" className="text-primary"> Privacy</Link>
                      </FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button disabled={loading} className="w-full">
                  {loading ? "Creating..." : "Create Account"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </Form>

            <div className="text-center text-sm text-muted-foreground">
              Or sign up with
            </div>

            <GoogleBtn />

            <p className="text-center mt-6 text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-primary font-semibold">
                Sign in
              </Link>
            </p>
          </Card>

        </div>
      </div>

    </>
  );
}
