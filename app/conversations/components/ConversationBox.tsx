"use client";

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Conversation, Message, User } from "@prisma/client";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import clsx from "clsx";

import Avatar from "@/app/components/Avatar";
import useOtherUser from "@/app/hooks/useOtherUser";
import AvatarGroup from "@/app/components/AvatarGroup";
import { FullConversationType } from "@/app/types";

interface ConversationBoxProps {
	data: FullConversationType;
	selected?: boolean;
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
	data,
	selected,
}) => {
	const otherUser = useOtherUser(data);
	const session = useSession();
	const router = useRouter();

	// Gestionnaire d'événement pour rediriger vers la conversation lorsqu'on clique sur la boîte
	const handleClick = useCallback(() => {
		router.push(`/conversations/${data.id}`);
	}, [data, router]);

	// Récupération du dernier message de la conversation
	// pour avoir l'index du dernier message
	const lastMessage = useMemo(() => {
		const messages = data.messages || [];

		return messages[messages.length - 1];
	}, [data.messages]);

	// Récupération de l'adresse e-mail de l'utilisateur actuel
	const userEmail = useMemo(
		() => session.data?.user?.email,
		[session.data?.user?.email]
	);

	// Vérification si le dernier message a été vu par l'utilisateur actuel
	const hasSeen = useMemo(() => {
		if (!lastMessage) {
			return false;
		}

		const seenArray = lastMessage.seen || [];

		if (!userEmail) {
			return false;
		}

		return seenArray.filter((user) => user.email === userEmail).length !== 0;
	}, [userEmail, lastMessage]);

	// Formatage du texte du dernier message pour l'affichage dans la boîte de conversation
	const lastMessageText = useMemo(() => {
		if (lastMessage?.image) {
			return "Sent an image";
		}

		if (lastMessage?.body) {
			return lastMessage?.body;
		}

		return "Started a conversation";
	}, [lastMessage]);

	return (
		<div
			onClick={handleClick}
			className={clsx(
				`
        relative 
        flex 
        w-full 
        cursor-pointer 
        items-center 
        space-x-3 
        rounded-lg
        p-3
        transition
        hover:bg-neutral-100
        `,
				selected ? "bg-neutral-100" : "bg-white"
			)}
		>
			{data.isGroup ? (
				<AvatarGroup users={data.users} />
			) : (
				<Avatar user={otherUser} />
			)}
			<div className="min-w-0 flex-1">
				<div className="focus:outline-none">
					<span className="absolute inset-0" aria-hidden="true" />
					<div className="mb-1 flex items-center justify-between">
						<p className="text-md font-medium text-gray-900">
							{data.name || otherUser.name}
						</p>
						{lastMessage?.createdAt && (
							<p
								className="
                  text-xs 
                  font-light 
                  text-gray-400
                "
							>
								{format(new Date(lastMessage.createdAt), "p")}
							</p>
						)}
					</div>
					<p
						className={clsx(
							`
              truncate 
              text-sm
              `,
							hasSeen ? "text-gray-500" : "font-medium text-black"
						)}
					>
						{lastMessageText}
					</p>
				</div>
			</div>
		</div>
	);
};

export default ConversationBox;
