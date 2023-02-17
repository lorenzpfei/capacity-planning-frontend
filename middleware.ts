import {NextRequest, NextResponse} from "next/server";

export default function middleware(req: NextRequest) {
    const isLoggedIn = req.cookies.get('user');
    let url = req.url;
    if (!isLoggedIn && !url.includes('/login')) {
        return NextResponse.redirect("http://localhost:3000/login");
    }
    if (isLoggedIn && url.includes('/login')) {
        return NextResponse.redirect("http://localhost:3000/");
    }
}

export const config = {
    matcher: [
        "/",
        "/workload/:path*"
    ],
};