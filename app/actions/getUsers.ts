import prisma from "@/app/libs/prismadb";
import getSession from "./getSession";

const getUsers = async () => {
	const session = await getSession();

	if (!session?.user?.email) {
		return [];
	}

	try {
		// users = array of user
		// orderBy = sort by newest user
		const users = await prisma.user.findMany({
			orderBy: {
				createdAt: "desc",
			},
			where: {
				// On cherche tout les users sauf le notre
				NOT: {
					email: session.user.email,
				},
			},
		});

		return users;
	} catch (error: any) {
		return [];
	}
};
export default getUsers;
