const { guessProductionMode } = require("@ngneat/tailwind");

module.exports = {
    prefix: '',
    purge: {
      enabled: guessProductionMode(),
      content: [
        './src/**/*.{html,ts}',
      ]
    },
    darkMode: 'class', // or 'media' or 'class'
    theme: {
      extend: {
        colors: {
          "ro-hoverBlue-1": "#001C37",
          "ro-genBlueColor-1": "#003366",
          "ro-darkRed": "#bd243a",
          "ro-slightRed": "#e12030",
          "ro-bgBlue-1": "#075bae",
          "ro-bgBlue-2": "#043f7ar",
          "ro-bgBlue-dark": "#002243",
          "ro-dashboard-bg": "#F5F5F5",
          "ro-col-bg": "#F2F8FF",
          "ro-lightRed-bg": "#EB1D31",
          "ro-border-red": "#EB2232",
          "ro-gray-bg": "#E3E3E3",
          "ro-green": "#38AB43",
          "ro-text-dark": "#212121",
          "ro-text-light": "#8F8F8F",
          "ro-black-text": "#101010",
          "ro-black-text-2": "#929292",
          "ro-read-notification": "#707070",
          "ro-dashboardSection-color": "#E4F1FF"
        }
      },
    },
    variants: {
      extend: {},
    },
    plugins: [require('@tailwindcss/aspect-ratio'),require('@tailwindcss/forms'),require('@tailwindcss/line-clamp'),require('@tailwindcss/typography')],
};
