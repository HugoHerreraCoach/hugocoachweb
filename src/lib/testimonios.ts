// src/lib/testimonios.ts
// Testimonios en video de clientes. Los usan Casos de éxito (todos) y la home (tres destacados).

export type TestimonioVideo = {
    thumbnailUrl?: string;
    youtubeVideoId: string;
    resultado: string;
    cita: string;
    nombre: string;
    rol: string;
    /** Retrato cuadrado de 192 px (WebP) para la home. */
    foto?: string;
};

export const testimoniosData: TestimonioVideo[] = [
    {
        youtubeVideoId: '5zIWMGWfCi0',
        resultado: 'Transformamos los desafíos de la empresa en crecimiento real',
        cita: 'La asesoría de Hugo nos dio el sistema para lograr un crecimiento que no esperábamos.',
        nombre: 'Zócima Cárdenas',
        rol: 'Fundadora de AIBR Karaz',
        foto: '/images/home/testimonios/zocima-cardenas.webp',
    },
    {
        youtubeVideoId: 'j04ENUobSQM',
        resultado: 'Multipliqué por 6 mis resultados semanales.',
        cita: 'Lo vi en mi propia vendedora, Inelda. Aplicó el sistema y los resultados fueron inmediatos.',
        nombre: 'Lenin Salvador',
        rol: 'CEO de Impulsa Inmobiliaria',
    },
    {
        youtubeVideoId: 'sF3VpXXvQNo',
        resultado: 'Vendimos 8 lotes de terreno en un solo mes.',
        cita: 'Solo el módulo de oratoria disparó las ventas y nos llenó la cartera de reservas. El método funciona.',
        nombre: 'Alex Gualpa',
        rol: 'Gerente comercial de Tribu Real State',
        foto: '/images/home/testimonios/alex-gualpa.webp',
    },
    {
        youtubeVideoId: '1Mjpk9SkbNc',
        resultado: 'Ahora sabemos cómo manejar cualquier objeción.',
        cita: 'Esta capacitación nos dio la técnica para manejar objeciones y la estructura de un buen guion de ventas. Es fundamental para todo vendedor.',
        nombre: 'CCT Inmobiliaria',
        rol: 'Asesores de ventas',
    },
    {
        youtubeVideoId: 'VG1qwa1QZgc',
        resultado: 'Un método paso a paso para agendar, presentar y cerrar.',
        cita: 'Hugo te da el guion. Aprendí a hacer cierres efectivos y seguimientos que convierten porque su forma de enseñar es extraordinariamente clara y directa.',
        nombre: 'Mery Livias',
        rol: 'Asesora de Red Multinivel',
    },
    {
        youtubeVideoId: 'oI2jG5q49B8',
        resultado: 'La mejor inversión para el rendimiento de mi equipo.',
        cita: 'Llevamos el curso y nos ayudó muchísimo. Es una inversión directa en las herramientas y el proceso que tu equipo necesita para escalar sus resultados.',
        nombre: 'Elias Vargas',
        rol: 'Líder de Red Multinivel',
    },
    {
        youtubeVideoId: 'JOGFJRrbZZk',
        resultado: 'Nos dió soporte y guía para nuestros emprendimientos',
        cita: 'Es un excelente coach que te tiene paciencia y te enseña todo lo que un emprendedor necesita.',
        nombre: 'Cámara de Mujeres Emprendedoras y Empresarias',
        rol: 'Emprendedoras',
    },
    {
        youtubeVideoId: 'D5SPYMxdhNE',
        resultado: 'Me actualizó tecnológicamente y ahora puedo tener mi empresa en la mano',
        cita: 'Es increíble que ya pueda tener el control de mi empresa y herramientas en la palma de mi mano.',
        nombre: 'Diego Nicolalde',
        rol: 'Gerente General de Ikona Inmobiliaria',
    },
    {
        youtubeVideoId: 'lwjpIWJ7s-k',
        resultado: 'Hoy tenemos a un Ikona de antes y un Ikona del después',
        cita: 'Hoy entendemos que el mejor equipo no se contrata, sino que se construye. Gracias a Hugo por ser parte de este crecimiento.',
        nombre: 'Pamela Gaón',
        rol: 'Fundadora de Ikona Inmobiliaria',
        foto: '/images/home/testimonios/pamela-gaon.webp',
    },
    
];
