/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern":
          "url('https://motionarray.imgix.net/preview-1758502-2of8u0oaQveiflLB-large.jpg?w=660&q=60&fit=max&auto=format')",
        "footer-texture": "url('/img/footer-texture.png')",
      },
    },
  },
  plugins: [],
};
