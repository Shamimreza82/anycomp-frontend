import { NextRequest, NextResponse } from "next/server";

// Define paths that don't need auth
const PUBLIC_PATHS = ["/login", "/register", "/api/public"];

export function middleware(req: NextRequest) {
    // Check cookie for token
    const token = req.cookies.get("token")?.value;

    const { pathname } = req.nextUrl;

    console.log("Middleware is running for path:", pathname);

    // Allow public paths
    if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
        return NextResponse.next();
    }

    // if (!token) {
    //     // Redirect to login if no token
    //     const loginUrl = new URL("/login", req.url);
    //     return NextResponse.redirect(loginUrl);
    // }

    // If token exists, continue
    return NextResponse.next();
}

// Apply middleware only for certain routes
export const config = {
    matcher: ["/dashboard/:path*"], // protect these routes
};
