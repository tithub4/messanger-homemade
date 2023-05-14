import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

const getConversations = async () => {
	const currentUser = await getCurrentUser();

	if (!currentUser?.id) {
		return [];
	}

	try {
		const conversations = await prisma.conversation.findMany({
			orderBy: {
				lastMessageAt: "desc",
			},
			where: {
				// load every single conversation that include our user
				userIds: {
					has: currentUser.id,
				},
			},
			// include sert a manipuler les données présents dans lui
			include: {
				users: true,
				messages: {
					include: {
						sender: true,
						seen: true,
					},
				},
			},
		});

		return conversations;
	} catch (error: any) {
		return [];
	}
};

export default getConversations;
