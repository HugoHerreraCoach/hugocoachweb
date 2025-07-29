import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Mantenemos tus extensiones por si las necesitas
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      // Eliminamos los colores 'amber' ya que no los usaremos para mantener la consistencia
      
      // Aquí definimos los estilos para el contenido de los artículos (MDX)
      typography: ({ theme }: { theme: (path: string) => string }) => ({
        invert: {
          css: {
            '--tw-prose-body': theme('colors.gray[300]'),
            '--tw-prose-headings': theme('colors.white'),
            '--tw-prose-lead': theme('colors.gray[400]'),
            '--tw-prose-links': theme('colors.blue[400]'),
            '--tw-prose-bold': theme('colors.white'),
            '--tw-prose-counters': theme('colors.gray[400]'),
            '--tw-prose-bullets': theme('colors.blue[500]'),
            '--tw-prose-hr': theme('colors.gray[700]'),
            '--tw-prose-quotes': theme('colors.gray[200]'),
            '--tw-prose-quote-borders': theme('colors.blue[500]'),
            '--tw-prose-captions': theme('colors.gray[400]'),
            '--tw-prose-code': theme('colors.white'),
            '--tw-prose-pre-code': theme('colors.gray[300]'),
            '--tw-prose-pre-bg': 'rgb(17 24 39 / 50%)', // Un fondo sutil para los bloques de código
            '--tw-prose-th-borders': theme('colors.gray[600]'),
            '--tw-prose-td-borders': theme('colors.gray[700]'),
            // Ajustes de espaciado y tamaño
            'h2': {
              'marginTop': '2em',
              'marginBottom': '1em',
            },
            'h3': {
              'marginTop': '1.8em',
              'marginBottom': '0.8em',
            },
            'blockquote': {
              'paddingLeft': '1em',
              'fontStyle': 'italic',
            },
            'p': {
              'lineHeight': '1.75', // Aumentamos el interlineado para mejor legibilidad
            }
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;