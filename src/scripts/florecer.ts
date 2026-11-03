// Anima la flor de fondo según el avance por las secciones de la página.
// La "etapa" s va de 0 (inicio, capullo cerrado) a 6 (pie, flor dispersando semillas):
// cada sección abre un anillo distinto de pétalos.

interface Pieza {
  el: SVGPathElement;
  anillo: number;
  i: number;
  ang: number;
  color: string | undefined;
}

type Rgb = [number, number, number];

// Orden de las secciones: cada una corresponde a una etapa de floración.
const SECCIONES = ['inicio', 'validaciones', 'mision', 'nosotros', 'memorias', 'contacto', 'pie'];

// Encuadre de la flor por etapa (posición relativa al viewport, escala y opacidad).
const ENCUADRE = {
  escritorio: {
    x: [0.73, 0.76, 0.78, 0.78, 0.77, 0.75, 0.72],
    y: [0.55, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
    escala: [3, 1.55, 1.1, 0.98, 0.98, 1, 1],
    opacidad: [1, 0.95, 0.8, 0.7, 0.65, 0.62, 0.55],
  },
  movil: {
    x: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
    y: [0.82, 0.62, 0.58, 0.55, 0.55, 0.55, 0.55],
    escala: [3.4, 2.1, 1.25, 1.1, 1.05, 1, 1],
    opacidad: [1, 0.55, 0.38, 0.32, 0.3, 0.3, 0.3],
  },
};

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const suave = (t: number) => t * t * (3 - 2 * t);
const salida = (t: number) => 1 - Math.pow(1 - t, 3);
const tramo = (s: number, a: number, b: number) => clamp01((s - a) / (b - a));

function interpolar(valores: number[], s: number): number {
  const i = Math.min(valores.length - 2, Math.max(0, Math.floor(s)));
  const t = suave(clamp01(s - i));
  return valores[i] + (valores[i + 1] - valores[i]) * t;
}

function hexARgb(hex: string): Rgb {
  const n = parseInt(hex.trim().replace('#', ''), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function mezclar(a: Rgb, b: Rgb, t: number): string {
  const c = a.map((v, i) => Math.round(v + (b[i] - v) * t));
  return `rgb(${c[0]} ${c[1]} ${c[2]})`;
}

function iniciar(raiz: HTMLElement) {
  const flor = raiz.querySelector<SVGSVGElement>('.flor');
  const grupo = raiz.querySelector<SVGGElement>('.flor__encuadre');
  if (!flor || !grupo) return;

  const centro = raiz.querySelector<SVGPathElement>('.flor__centro');
  const lavados = [...raiz.querySelectorAll<HTMLElement>('.lavado')];
  const halos = [...raiz.querySelectorAll<SVGCircleElement>('.flor__halo')];
  const piezas: Pieza[] = [...raiz.querySelectorAll<SVGPathElement>('.flor__pieza')].map((el) => ({
    el,
    anillo: Number(el.dataset.anillo),
    i: Number(el.dataset.i),
    ang: Number(el.dataset.ang ?? 0),
    color: el.dataset.color,
  }));

  const estilos = getComputedStyle(document.documentElement);
  const paleta: Record<string, Rgb> = {};
  for (const nombre of ['azul', 'coral', 'ambar', 'verde']) {
    paleta[nombre] = hexARgb(estilos.getPropertyValue(`--${nombre}`));
  }
  // El capullo nace azul y cada pieza toma su color al abrirse.
  const colorCapullo = paleta.azul;

  const movimientoReducido = matchMedia('(prefers-reduced-motion: reduce)');
  const pantallaMovil = matchMedia('(max-width: 899px)');

  let anclas: number[] = [];
  let respirando = true;
  let actual = 0;
  let objetivo = 0;
  let cuadro = 0;

  // Posición de scroll en la que empieza cada etapa: cuando el borde superior
  // de la sección correspondiente sube hasta el 55 % de la altura de la pantalla.
  // Píxeles por unidad del dibujo: las 920 unidades de la flor ocupan 118vmin
  // (máx. 1180 px) en escritorio y 150vw en móvil, antes de aplicar la escala de etapa.
  function pixelesPorUnidad() {
    const lado = pantallaMovil.matches
      ? innerWidth * 1.5
      : Math.min(Math.min(innerWidth, innerHeight) * 1.18, 1180);
    return lado / 920;
  }

  function medir() {
    const maximo = document.documentElement.scrollHeight - innerHeight;
    let previo = 0;
    anclas = SECCIONES.map((id, i) => {
      const el = document.getElementById(id);
      if (i === 0 || !el) return previo;
      const top = el.getBoundingClientRect().top + scrollY;
      previo = Math.max(previo, Math.min(maximo, top - innerHeight * 0.55));
      return previo;
    });
  }

  function etapaActual(): number {
    const y = scrollY;
    for (let i = anclas.length - 1; i > 0; i--) {
      if (y >= anclas[i]) return i;
      if (y >= anclas[i - 1]) {
        const largo = anclas[i] - anclas[i - 1];
        return largo > 0 ? i - 1 + (y - anclas[i - 1]) / largo : i;
      }
    }
    return 0;
  }

  function dibujar(s: number) {
    const encuadre = pantallaMovil.matches ? ENCUADRE.movil : ENCUADRE.escritorio;

    // Anillo 1: el capullo se abre y forma el logo.
    const t1 = tramo(s, 0.05, 1);
    const apertura = salida(t1);

    const x = interpolar(encuadre.x, s) * innerWidth;
    const y = interpolar(encuadre.y, s) * innerHeight;
    const escala = interpolar(encuadre.escala, s) * pixelesPorUnidad();
    const giro = s * 7 - (1 - apertura) * 15;
    grupo!.style.transform = `translate(${x}px, ${y}px) rotate(${giro}deg) scale(${escala})`;
    flor!.style.opacity = String(interpolar(encuadre.opacidad, s));
    if (centro) centro.style.transform = `scale(${0.45 + 0.55 * apertura})`;

    // El capullo "respira" (animación SMIL) solo mientras se ve cerrado.
    const debeRespirar = s < 1 && !movimientoReducido.matches;
    if (debeRespirar !== respirando) {
      if (debeRespirar) flor!.unpauseAnimations();
      else flor!.pauseAnimations();
      respirando = debeRespirar;
    }

    const p2 = tramo(s, 0.9, 2);
    const p3 = tramo(s, 1.9, 3);
    const p4 = tramo(s, 2.9, 3.8);
    const dispersion = suave(tramo(s, 3.8, 6));

    for (const p of piezas) {
      if (p.anillo === 1) {
        // Cerrado, el capullo es el logo azul en miniatura.
        const e = salida(clamp01(t1 * 1.35 - p.i * 0.045));
        const k = 1 - e;
        p.el.style.transform = `scale(${1 - 0.62 * k})`;
        p.el.style.fill = mezclar(colorCapullo, paleta[p.color ?? 'azul'], e);
      } else if (p.anillo === 2) {
        const t = clamp01(p2 * 1.4 - p.i * 0.05);
        const e = salida(t);
        p.el.style.transform = `rotate(${p.ang - (1 - e) * 70}deg) scale(${0.25 + 0.75 * e})`;
        p.el.style.opacity = String(clamp01(t * 3));
      } else if (p.anillo === 3) {
        const t = clamp01(p3 * 1.5 - p.i * 0.04);
        const e = salida(t);
        p.el.style.transform = `rotate(${p.ang + (1 - e) * 50}deg) scale(${0.3 + 0.7 * e})`;
        p.el.style.opacity = String(clamp01(t * 3));
      } else {
        const t = clamp01(p4 * 1.6 - p.i * 0.035);
        const e = salida(t);
        const radio = 350 + dispersion * 230 + Math.sin(p.i * 1.7 + s * 2) * 14 * dispersion;
        const angulo = p.ang + dispersion * (p.i % 2 ? 28 : -28);
        p.el.style.transform = `rotate(${angulo}deg) translate(0, ${-radio}px) rotate(${s * 60 + p.i * 20}deg) scale(${e})`;
        p.el.style.opacity = String(e * (1 - dispersion * 0.35));
      }
    }

    halos.forEach((h, i) => {
      h.style.opacity = String(suave(p3) * 0.4);
      h.style.transform = `rotate(${(i ? -1 : 1) * s * 12}deg)`;
    });

    // El fondo pasa de brote (verde) a cálido (ámbar/coral) y luego a atardecer.
    const calido = tramo(s, 1.5, 3);
    const atardecer = tramo(s, 4, 5.5);
    if (lavados.length === 3) {
      lavados[0].style.opacity = String(1 - calido);
      lavados[1].style.opacity = String(calido * (1 - atardecer));
      lavados[2].style.opacity = String(atardecer);
    }
  }

  function bucle() {
    actual += (objetivo - actual) * 0.12;
    if (Math.abs(objetivo - actual) < 0.0005) actual = objetivo;
    dibujar(actual);
    cuadro = actual === objetivo ? 0 : requestAnimationFrame(bucle);
  }

  function alDesplazar() {
    objetivo = etapaActual();
    if (!cuadro) cuadro = requestAnimationFrame(bucle);
  }

  function alCambiarTamano() {
    medir();
    if (movimientoReducido.matches) {
      dibujar(3.4);
      return;
    }
    objetivo = etapaActual();
    actual = objetivo;
    dibujar(actual);
  }

  medir();
  if (movimientoReducido.matches) {
    // Sin animación ligada al scroll: la flor se muestra abierta y quieta.
    dibujar(3.4);
  } else {
    actual = objetivo = etapaActual();
    dibujar(actual);
    addEventListener('scroll', alDesplazar, { passive: true });
  }

  new ResizeObserver(alCambiarTamano).observe(document.body);
  pantallaMovil.addEventListener('change', alCambiarTamano);
  raiz.classList.add('listo');
}

const raiz = document.querySelector<HTMLElement>('.fondo-flor');
if (raiz) iniciar(raiz);
