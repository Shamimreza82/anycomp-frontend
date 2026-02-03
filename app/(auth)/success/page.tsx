import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function EmailSentSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <Card className="w-full max-w-md rounded-2xl shadow-lg">
        <CardHeader className="text-center space-y-3">
          <div className="flex justify-center">
            <CheckCircle className="h-14 w-14 text-green-500" />
          </div>
          <CardTitle className="text-2xl font-semibold">
            Email Sent Successfully
          </CardTitle>
        </CardHeader>

        <CardContent className="text-center space-y-6">
          <p className="text-sm text-muted-foreground">
            We’ve sent a confirmation email to your inbox. Please check your
            email and follow the instructions.
          </p>

          <div className="flex flex-col gap-3">
            <Button asChild className="w-full">
              <Link href="/login">Go to Login</Link>
            </Button>

            <Button asChild variant="outline" className="w-full">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
