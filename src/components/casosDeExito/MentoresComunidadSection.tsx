// src/components/casosDeExito/MentoresComunidadSection.tsx
// Con quién he compartido escenario y qué tan grande es la comunidad.

import Image from 'next/image';

interface Mentor {
    nombre: string;
    descripcion: string;
    imageUrl: string;
}

const mentores: Mentor[] = [
    {
        nombre: 'Jürgen Klarić',
        descripcion: 'La ciencia detrás de la decisión de compra, aplicada a un guion de ventas.',
        imageUrl: '/images/casosdeexito/jurgenKlaric.jpg',
    },
    {
        nombre: 'Alex Dey',
        descripcion: 'Estructura y disciplina: un sistema que funciona sin depender del carisma.',
        imageUrl: '/images/casosdeexito/alexDey.jpg',
    },
    {
        nombre: 'Margarita Pasos',
        descripcion: 'Convertir la pasión en un proceso de ventas que se pueda medir.',
        imageUrl: '/images/casosdeexito/margaritaPasos.jpg',
    },
    {
        nombre: 'Germán Kuttnick',
        descripcion: 'Un mensaje que provoca la acción y cierra la venta desde el escenario.',
        imageUrl: '/images/casosdeexito/germanKutnick.jpg',
    },
];

const comunidad = [
    { plataforma: 'TikTok', valor: '280k+', icono: '/icons/tiktokIcon.png' },
    { plataforma: 'Facebook', valor: '30k+', icono: '/icons/facebookIcon.png' },
    { plataforma: 'Instagram', valor: '16k+', icono: '/icons/instagramIcon.png' },
    { plataforma: 'LinkedIn', valor: '3k+', icono: '/icons/linkedinIcon.png' },
];

export default function MentoresComunidadSection() {
    return (
        <section className="w-full bg-slate-950 py-20 lg:py-28">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="max-w-3xl">
                    <p className="text-sm font-semibold uppercase tracking-widest text-[#4d8bff]">En el escenario</p>
                    <h2 className="mt-3 text-3xl font-bold tracking-tight text-white lg:text-5xl text-balance">
                        He compartido escenario con referentes de las ventas.
                    </h2>
                    <p className="mt-4 text-xl text-slate-300 text-balance">
                        También hemos trabajado juntos en sesiones. Sirven para poner a prueba y mejorar mi propio método.
                    </p>
                </div>

                <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {mentores.map((mentor) => (
                        <li key={mentor.nombre} className="rounded-2xl border border-slate-800 bg-black/40 p-6 text-center">
                            <div className="relative mx-auto h-40 w-40 overflow-hidden rounded-full border-4 border-slate-700">
                                <Image src={mentor.imageUrl} alt={mentor.nombre} fill className="object-cover" sizes="160px" />
                            </div>
                            <h3 className="mt-5 text-xl font-bold text-white">{mentor.nombre}</h3>
                            <p className="mt-2 text-lg text-slate-400">{mentor.descripcion}</p>
                        </li>
                    ))}
                </ul>

                <div className="mt-16 border-t border-slate-800 pt-12">
                    <h3 className="text-2xl font-bold text-white lg:text-3xl">
                        Una comunidad de más de 300,000 personas.
                    </h3>
                    <p className="mt-2 text-lg text-slate-400">Siguen mi contenido de ventas en redes. Cifras públicas.</p>
                    <dl className="mt-8 grid grid-cols-2 gap-8 md:grid-cols-4">
                        {comunidad.map((red) => (
                            <div key={red.plataforma} className="flex items-center gap-4">
                                <Image src={red.icono} alt="" width={40} height={40} className="h-10 w-10 object-contain" />
                                <div>
                                    <dt className="text-3xl font-extrabold tracking-tight text-white">{red.valor}</dt>
                                    <dd className="text-slate-400">{red.plataforma}</dd>
                                </div>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </section>
    );
}
