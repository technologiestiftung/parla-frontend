import { NextRequest, NextResponse } from "next/server";

export const config = {
	matcher: ["/", "/index"],
};

export function middleware(req: NextRequest) {
	const url = req.nextUrl;
	url.pathname = "/api/auth";
	const credentials = process.env.BASIC_AUTH_CREDENTIALS;
	if (!credentials) {
		return NextResponse.rewrite(url);
	}

	const basicAuth = req.headers.get("authorization");
	const [envUser, envPwd] = credentials.split(":");
	if (basicAuth) {
		const authValue = basicAuth.split(" ")[1];
		const [user, pwd] = atob(authValue).split(":");

		if (user === envUser && pwd === envPwd) {
			return NextResponse.next();
		}
	}

	return NextResponse.rewrite(url);
}
