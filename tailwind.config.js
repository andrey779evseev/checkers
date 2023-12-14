/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'cell-even': 'rgba(195,160,130,255)',
                'cell-odd': 'rgba(242,225,195,255)',
            },
            animation: {
                'reverse-in': 'reverse-in 2s ease-in-out forwards',
                'reverse-out': 'reverse-out 2s ease-in-out forwards',
                'slide-left': 'slide-left 0.3s ease',
                'slide-right': 'slide-right 0.3s ease',
                'appear': 'rotate-scale-up 1s linear forwards',
                'again': 'rotate-vert-center 1s cubic-bezier(0.455, 0.030, 0.515, 0.955) both',
            },
            keyframes: {
                'reverse-in': {
                    from: {
                        transform: 'rotate(0deg)'
                    },
                    to: {
                        transform: 'rotate(-180deg)'
                    }
                },
                'reverse-out': {
                    from: {
                        transform: 'rotate(-180deg)'
                    },
                    to: {
                        transform: 'rotate(0deg)'
                    }
                },
                'slide-left': {
                    from: {
                        transform: 'translateX(calc(100% + 20%))'
                    },
                    to: {
                        transform: 'translateX(0)'
                    }
                },
                'slide-right': {
                    from: {
                        transform: 'translateX(0)'
                    },
                    to: {
                        transform: 'translateX(calc(100% + 20%))'
                    }
                },
                'rotate-scale-up': {
                    '0%': {
                        transform: 'scale(0.1) rotateZ(-360deg)',
                        opacity: 0
                    },
                    '50%': {
                        transform: 'scale(0.5) rotateZ(-270deg)'
                    },
                    '100%': {
                        transform: 'scale(1) rotateZ(-180deg)',
                        opacity: 1
                    }
                },
                'rotate-vert-center': {
                    '0%': {
                        transform: 'rotateY(0)'
                    },
                    '100%': {
                        transform: 'rotateY(360deg)'
                    }
                }
            }
        },
    },
    plugins: [],
}

