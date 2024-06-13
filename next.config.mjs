/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{ hostname: "dynamic-salmon-60.convex.cloud" },
			// { hostname: "oaidalleapiprodscus.blob.core.windows.net" },
		],
	},
};

export default nextConfig;
