import getUsers from "../actions/getUsers";
import Sidebar from "../components/sidebar/Sidebar";
import UserList from "./components/UserList";

export default async function UsersLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const users = await getUsers();

	return (
		// @ts-expect-error Server Component
		<Sidebar>
			<div className="h-full">
				<UserList items={users} />
				{children}
			</div>
		</Sidebar>
	);
}

// What is the file for
// Every users/* that share this road gonna have this layout

// Why is it async
// We are going to use this server to fetch user
// directly from the databatse
