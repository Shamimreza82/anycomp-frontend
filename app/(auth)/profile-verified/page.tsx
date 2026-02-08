"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

const ProfileVerifiedPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <Card className="max-w-md w-full shadow-lg border border-slate-200">
        <CardHeader className="flex flex-col items-center justify-center gap-2">
          <CheckCircle2 className="w-16 h-16 text-green-500" />
          <CardTitle className="text-2xl font-bold text-center">Account Verified!</CardTitle>
          <CardDescription className="text-center text-slate-600">
            Your account has been verified successfully. You can now access all features.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center mt-4">
          <Link href="/login">
            <Button className="bg-green-500 hover:bg-green-600 text-white">
              Login
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileVerifiedPage;
