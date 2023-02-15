import {NextRequest, NextResponse} from "next/server";

export default function middleware(req: NextRequest) {
    let verify = req.cookies.get("loggedin");
    let url = req.url
    console.log('middleware'); //todo: remove debug
    if (!verify && !url.includes('/login')) {
        console.log('redirect'); //todo: remove debug
        return NextResponse.redirect("http://localhost:3000/login");
    }
}

export const config = {
    matcher: [
        "/",
        "/workload/:path*"
    ],
};