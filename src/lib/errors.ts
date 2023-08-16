export class ApplicationError extends Error {
	constructor(message: string, public data: Record<string, any> = {}) {
		super(message);
	}
}
// export class AuthError extends Error {}

export class UserError extends ApplicationError {}

/**
 * Does pretty hadnling of messages
 */
export class EnvError extends Error {
	constructor(message: string) {
		super(`Env variable "${message}" is not defined`);
	}
}
