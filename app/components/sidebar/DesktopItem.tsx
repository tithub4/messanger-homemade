import clsx from "clsx";
import Link from "next/link";

interface DesktopItemProps {
	label: string;
	icon: any;
	href: string;
	onClick?: () => void;
	active?: boolean;
}

// In the given code, React.FC<DesktopItemProps> is a type
// declaration for a functional component in React.
// It defines that DesktopItem is a functional component
// that accepts props of type DesktopItemProps.

const DesktopItem: React.FC<DesktopItemProps> = ({
	label,
	href,
	icon: Icon,
	active,
	onClick,
}) => {
	const handleClick = () => {
		if (onClick) {
			return onClick();
		}
	};

	return (
		<li onClick={handleClick} key={label}>
			<Link
				href={href}
				className={clsx(
					`
            group 
            flex 
            gap-x-3 
            rounded-md 
            p-3 
            text-sm 
            font-semibold 
            leading-6 
            text-gray-500 
            hover:bg-gray-100 
            hover:text-black
          `,
					active && "bg-gray-100 text-black"
				)}
			>
				<Icon className="h-6 w-6 shrink-0" aria-hidden="true" />
				{/* le span ne s'affiche que coté serveur. */}
				{/* SEO friendly + esthetique */}
				<span className="sr-only">{label}</span>
			</Link>
		</li>
	);
};

export default DesktopItem;
