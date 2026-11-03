// Contenido extraído de https://ongalumco.cl (WordPress, noviembre 2026).

export const marca = {
  nombre: 'ONG Alumco',
  establecimiento: 'ELEAM Hualpén',
  // Colores tomados del logo original.
  colores: {
    azul: '#395E9F',
    coral: '#FF6364',
    ambar: '#F9B401',
    verde: '#AFDD83',
  },
};

// El título del hero ("Nuestros cuidados son el reflejo de la empatía.")
// está en Hero.astro porque lleva énfasis tipográfico.
export const hero = {
  bajada: 'Dedicadas a brindar el más alto estándar de cuidado para nuestras personas mayores.',
};

// El sitio original repetía la visión al final de la misión; aquí van separadas.
export const mision =
  'Brindar a los y las residentes de ELEAM una atención integral, de calidad y centrada en la persona desde un enfoque de derechos, considerando sus necesidades en las áreas: biomédica, funcional, social, mental y espiritual con el apoyo de sus personas significativas, realizando una gestión eficiente de los recursos disponibles.';

export const vision =
  'Ser un ELEAM de referencia a nivel nacional especializado en brindar una atención transdisciplinaria dirigida a mejorar la calidad de vida de las personas mayores durante toda su estadía.';

export const areas = ['Biomédica', 'Funcional', 'Social', 'Mental', 'Espiritual'];

export const validaciones = [
  {
    cifra: 'ELEAM',
    titulo: 'Hualpén, Biobío',
    texto: 'Establecimiento de Larga Estadía para Adultos Mayores.',
  },
  {
    cifra: '5',
    titulo: 'áreas de cuidado',
    texto: 'Biomédica, funcional, social, mental y espiritual.',
  },
  {
    cifra: 'Integral',
    titulo: 'Centrada en la persona',
    texto: 'Desde un enfoque de derechos y con un equipo transdisciplinario.',
  },
  {
    cifra: '8',
    titulo: 'documentos públicos',
    texto: 'Convenio, estados financieros, balance y más, abiertos a revisión.',
  },
];

// Cada valor resalta piezas del logo (ids de data/flor.ts, más "centro").
export const valores = [
  { titulo: 'Transparencia', texto: 'Somos transparentes y actuamos con coherencia.', piezas: ['ala-der'] },
  { titulo: 'Constancia', texto: 'Somos constantes, aprendemos y nos adaptamos a los cambios.', piezas: ['arriba', 'abajo'] },
  { titulo: 'Empatía', texto: 'Tenemos una actitud positiva y empática.', piezas: ['centro'] },
  { titulo: 'Comunidad', texto: 'Somos un equipo que se coordina con la comunidad para realizar mejoras sociales.', piezas: ['medio-izq', 'bajo-izq', 'bajo-der'] },
  { titulo: 'Excelencia', texto: 'Desarrollamos una gestión de calidad para alcanzar la excelencia.', piezas: ['ala-izq', 'medio-der'] },
];

// Texto nuevo para la sección "Nosotros" (el sitio original no tenía una).
export const nosotros = [
  'Somos ONG Alumco, una organización sin fines de lucro que cuida a las personas mayores que viven en el ELEAM de Hualpén. Creemos que envejecer con dignidad es un derecho, y por eso acompañamos a cada residente de forma integral: en lo biomédico, lo funcional, lo social, lo mental y lo espiritual, junto a sus personas significativas.',
  'Trabajamos como un equipo transdisciplinario, coordinado con la comunidad, y rendimos cuentas de manera abierta. La confianza, como una flor, se cultiva todos los días.',
];

export const memorias = {
  texto:
    'La transparencia financiera es fundamental para nosotros. A lo largo del año, hemos gestionado nuestros recursos con responsabilidad y eficiencia, asegurando que cada donación se utilice para el beneficio directo de nuestros residentes. Nuestro compromiso con la integridad financiera se refleja en cada partida de gastos.',
  documentos: [
    { titulo: 'Convenio', url: 'https://drive.google.com/drive/u/0/folders/1eJGJRzTbrAlYulAr64dtS_p5vuQpZUWf' },
    { titulo: 'Estado financiero', url: 'https://drive.google.com/drive/u/0/folders/12jplNElVUIC3ea6mdno5-prc9S8Oco2o' },
    { titulo: 'Balance', url: 'https://drive.google.com/drive/u/0/folders/14cP-t_UFlJQ0hpKUCRSix_lmy7sRomwE' },
    { titulo: 'Memorial', url: 'https://drive.google.com/drive/u/0/folders/1pR8OLvK3aAPaYR-X1S6tjBpp6Z5CP4vx' },
    { titulo: 'Nómina de directorio', url: 'https://drive.google.com/drive/u/0/folders/1TrT24miaFzoNNa0V68ksevkDCj3PbAt5' },
    { titulo: 'Plan vigente (PICV)', url: 'https://drive.google.com/drive/u/0/folders/1BwQBR6LHpGTkWTINLllD0O5Xs_GVtc4G' },
    { titulo: 'Presupuesto adjudicado', url: 'https://drive.google.com/drive/u/0/folders/1t4qJ-qp-oebubs-Zgl-g2IT6XxG8vupF' },
    { titulo: 'Recursos recibidos', url: 'https://drive.google.com/drive/u/0/folders/1iXCUYR6cBvZ7f6yjE1PYzCioujnIhkIW' },
  ],
};

export const contacto = {
  correos: [
    { etiqueta: 'Correo electrónico', correo: 'da.ehualpen@gmail.com' },
    { etiqueta: 'Directora Técnica ELEAM Hualpén', correo: 'dt.ehualpen@gmail.com' },
  ],
  instagram: {
    usuario: '@ong_alumco',
    url: 'https://www.instagram.com/ong_alumco',
  },
};

export const navegacion = [
  { href: '#inicio', texto: 'Inicio' },
  { href: '#mision', texto: 'Misión y visión' },
  { href: '#nosotros', texto: 'Nosotros' },
  { href: '#memorias', texto: 'Memorias' },
  { href: '#contacto', texto: 'Contacto' },
];
