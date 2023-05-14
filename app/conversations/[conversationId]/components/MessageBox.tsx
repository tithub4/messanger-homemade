"use client";

import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { FullMessageType } from "@/app/types";

import Avatar from "@/app/components/Avatar";
import { fr } from "date-fns/locale";
import ImageModal from "./ImageModal";

interface MessageBoxProps {
	data: FullMessageType;
	isLast?: boolean;
}

const MessageBox: React.FC<MessageBoxProps> = ({ data, isLast }) => {
	const session = useSession();
	const [imageModalOpen, setImageModalOpen] = useState(false);

	// Comparing session email to data email
	// sender se trouve dans fullMessageType
	const isOwn = session.data?.user?.email === data?.sender?.email;
	// filter sert a enlever de la liste des vus l'envoyeur
	const seenList = (data.seen || [])
		.filter((user) => user.email !== data?.sender?.email)
		.map((user) => user.name)
		.join(", ");

	const container = clsx("flex gap-3 p-4", isOwn && "justify-end");
	const avatar = clsx(isOwn && "order-2");
	const body = clsx("flex flex-col gap-2", isOwn && "items-end");
	const message = clsx(
		"text-sm w-fit overflow-hidden",
		isOwn ? "bg-sky-500 text-white" : "bg-gray-100",
		data.image ? "rounded-md p-0" : "rounded-full py-2 px-3"
	);

	return (
		<div className={container}>
			<div className={avatar}>
				<Avatar user={data.sender} />
			</div>
			<div className={body}>
				<div className="flex items-center gap-1">
					<div className="text-sm text-gray-500">{data.sender.name}</div>
					<div className="text-xs text-gray-400">
						{format(new Date(data.createdAt), "HH:mm", { locale: fr })}
					</div>
				</div>
				<div className={message}>
					<ImageModal
						src={data.image}
						isOpen={imageModalOpen}
						onClose={() => setImageModalOpen(false)}
					/>
					{data.image ? (
						<Image
							alt="Image"
							height="288"
							width="288"
							onClick={() => {
								setImageModalOpen(true);
							}}
							src={data.image}
							className="translate cursor-pointer object-cover  transition hover:scale-110"
						/>
					) : (
						<div>{data.body}</div>
					)}
				</div>
				{isLast && isOwn && seenList.length > 0 && (
					<div className="text-xs font-light text-gray-500 ">
						{`Seen by ${seenList}`}
					</div>
				)}
			</div>
		</div>
	);
};

export default MessageBox;
