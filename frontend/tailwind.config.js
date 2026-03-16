/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#fdf8ef',
                    100: '#f9eee0',
                    200: '#f1dabf',
                    300: '#e7bc94',
                    400: '#db9667',
                    500: '#d27845',
                    600: '#c45e39',
                    700: '#a34a31',
                    800: '#833d2c',
                    900: '#6a3426',
                    950: '#391912',
                },
                gold: {
                    50: '#fbfaf4',
                    100: '#f4f2e3',
                    200: '#e9e3c9',
                    300: '#d9cc9f',
                    400: '#c6ad74',
                    500: '#b79758',
                    600: '#a58249',
                    700: '#8a693e',
                    800: '#725637',
                    900: '#5e4730',
                    950: '#36271a',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
            },
        },
    },
    plugins: [],
}
