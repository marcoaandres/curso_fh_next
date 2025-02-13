import type { Config } from 'tailwindcss'
//* hay que asegurarnos que se apliquen en los siguientes directorios
// * se agrega el directorio ./src/pokemons/ ya que no se veian los estilos de forma correcta con esto indicamos que los estilos de tailwind deben de aplicarse tambien en ese directorio
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pokemons/**/*.{js,ts,jsx,tsx,mdx}',
    './src/shopping-cart/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
