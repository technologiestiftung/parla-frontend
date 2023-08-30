// middleware.ts
import { createNextAuthMiddleware } from "nextjs-basic-auth-middleware";

export const middleware = createNextAuthMiddleware();

export const config = {
	matcher: ["/(.*)"], // Replace this with your own matcher logic
};
