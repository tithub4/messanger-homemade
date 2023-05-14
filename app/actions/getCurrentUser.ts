import prisma from "@/app/libs/prismadb";
import getSession from "./getSession";

const getCurrentUser = async () => {
	try {
		const session = await getSession();

		// The current session exists ?
		if (!session?.user?.email) {
			return null;
		}

		// Get the current user
		const currentUser = await prisma.user.findUnique({
			where: {
				email: session.user.email as string,
			},
		});

		if (!currentUser) {
			return null;
		}

		return currentUser;
	} catch (error: any) {
		return null;
	}
};

export default getCurrentUser;
