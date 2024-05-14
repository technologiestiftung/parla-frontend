export function GET(_request: Request) {
	const res = new Response("Auth Required.", {
		status: 401,
		headers: {
			"WWW-Authenticate": 'Basic realm="Secure Area"',
		},
	});

	return res;
}
