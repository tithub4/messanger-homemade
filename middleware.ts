import { withAuth } from "next-auth/middleware";

export default withAuth({
	pages: {
		signIn: "/",
	},
});

// Config that protect our road
// Seul les gens authentifié pourront etre dans user/*
export const config = {
	matcher: ["/users/:path*", "/conversations/:path*"],
};
