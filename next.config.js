/** @type {import('next').NextConfig} */
// next-superjson-plugin : permet de donner des données complexes
// Du cote serveur au coté client exemple :
// Sidebar to DesktopSidebar
const nextConfig = {
	experimental: {
		appDir: true,
		swcPlugins: [["next-superjson-plugin", {}]],
	},
	images: {
		domains: [
			"res.cloudinary.com",
			"avatars.githubusercontent.com",
			"lh3.googleusercontent.com",
		],
	},
};

module.exports = nextConfig;
