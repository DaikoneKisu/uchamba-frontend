/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'ucab-yellow': '#FFD200',
				'ucab-blue': '#41B4E5',
				'ucab-green': '#007934',
				'ucab-black': '#000000',
				'brand-opaque-black': '#414042',
				'brand-p-black': '#343434',
				'brand-h1-black': '#343434',
				'brand-h2-black': '#4D4D4D',
				'brand-white': '#FFFFFF'
			},
			fontFamily: {
				'open-sans': ['Open Sans', 'sans-serif'],
				poppins: ['Poppins', 'sans-serif']
			}
		}
	},
	plugins: []
}
