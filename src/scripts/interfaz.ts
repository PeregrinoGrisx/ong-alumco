// Comportamientos de la interfaz: cabecera al hacer scroll, menú móvil
// y aparición de elementos (y florcitas de sección) al entrar en pantalla.

const cabecera = document.querySelector<HTMLElement>('.cabecera');
if (cabecera) {
  const actualizar = () => cabecera.classList.toggle('con-fondo', scrollY > 24);
  actualizar();
  addEventListener('scroll', actualizar, { passive: true });
}

const botonMenu = document.querySelector<HTMLButtonElement>('.cabecera__menu');
const navegacion = document.getElementById('navegacion');
if (botonMenu && navegacion) {
  const cerrar = () => {
    botonMenu.setAttribute('aria-expanded', 'false');
    navegacion.classList.remove('abierta');
  };
  botonMenu.addEventListener('click', () => {
    const abierta = botonMenu.getAttribute('aria-expanded') === 'true';
    botonMenu.setAttribute('aria-expanded', String(!abierta));
    navegacion.classList.toggle('abierta', !abierta);
  });
  navegacion.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).closest('a')) cerrar();
  });
  addEventListener('keydown', (e) => {
    if (e.key === 'Escape') cerrar();
  });
}

const observables = document.querySelectorAll('[data-revelar], [data-florecer]');
if ('IntersectionObserver' in window) {
  const observador = new IntersectionObserver(
    (entradas) => {
      for (const entrada of entradas) {
        if (!entrada.isIntersecting) continue;
        entrada.target.classList.add('visible');
        observador.unobserve(entrada.target);
      }
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.15 },
  );
  observables.forEach((el) => observador.observe(el));
} else {
  observables.forEach((el) => el.classList.add('visible'));
}
