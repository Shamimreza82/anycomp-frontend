"use client";

import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function GoogleBtn() {


    const router = useRouter()

    return (
        <GoogleLogin
            onSuccess={(res) => {
                fetch("http://localhost:8000/api/v1/auth/oauth/google", {
                    method: "POST",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        idToken: res.credential,
                    }),
                })
                    .then((r) => r.json())
                    .then((data) => {
                        if (data.status) {
                            toast.success("Login successful")
                            console.log(data)
                            router.push('/dashboard')
                        } else {
                            console.log(data)
                            toast.error(data.message || "Login failed")
                        }

                    });
            }}
            onError={() => console.log("Login Failed")}
        />
    );
}

