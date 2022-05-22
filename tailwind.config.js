module.exports = {
  content: [
   "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors:{
        primary:"#5744B7",
        secondary:{
          100 : "#B2F17E",
          200:"#17161C",
          300:"#63626C",
          400:"#FFC600",
          500:"#222227",
          600: "#2E3238",
          700: "#C4C4C4",
          800: "#60D66A",
          900: "#E0E0E0"
        }
      },
      fontFamily:{
        poppins : ["Poppins"],
        playfair:["Playfair"],
        montserrat:["Montserrat"],
        rubik:["Rubik"],
        shippori:["Shippori Antique"]
      } 
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}



