/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./*.html", "./src/**/*.jsx"],
	theme: {
		extend: {
			animation: {
				rot: "rotate 1s linear infinite",
			},
			keyframes: {
				rotate: {
					'from': { transform: "rotate(0)" },
					'to': { transform: "rotate(360deg)" },
				},
			},
		},
	},
	plugins: [],
}
