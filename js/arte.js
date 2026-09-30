/**
 * NÖMA · Dirección de arte ilustrada.
 * Mientras no haya fotos, cada imagen del sitio es una naturaleza muerta en SVG con la paleta de la marca.
 * Uso: <div class="arte" data-arte="hero"></div>  →  se completa sola.
 * Para usar una foto real: agregá el archivo a img/ y su nombre a js/fotos.js (ver img/LEEME.md).
 */
(() => {
  const C = {
    cream: '#F5F1EA', off: '#FCFBF8', ink: '#25251F', sage: '#66735D', terra: '#B8755D', sand: '#C8B9A3',
    amber: '#C4874F', honey: '#E3B77A', flame: '#F4C77E', flameIn: '#FDF0CF', clay: '#D8C4AA', linen: '#E9DFCF',
    stone: '#E2D9CB', moss: '#4C5745', mossLight: '#7F8C72', night: '#2F2C27', nightWall: '#3A352E', rust: '#9C5E48',
    blush: '#E5CDBE', olive: '#8A8D6B', bone: '#EFE8DC',
  };

  let uid = 0;

  /* ---------------------------------------------------------------- Objetos
     Cada objeto se dibuja con la base apoyada en (0, 0) y crece hacia arriba (y negativa). */
  const sombra = (rx, o = 0.16) => `<ellipse cx="0" cy="2" rx="${rx}" ry="${rx * 0.13}" fill="${C.ink}" opacity="${o}"/>`;

  const O = {
    vela({ vidrio = C.amber, etiqueta = C.off, encendida = true, tapa = false } = {}) {
      const id = `g${uid++}`;
      return `
        ${sombra(64)}
        ${encendida ? `<defs><radialGradient id="${id}"><stop offset="0" stop-color="${C.flame}" stop-opacity=".55"/><stop offset="1" stop-color="${C.flame}" stop-opacity="0"/></radialGradient></defs>
        <circle cx="0" cy="-150" r="78" fill="url(#${id})"/>` : ''}
        <rect x="-50" y="-122" width="100" height="122" rx="12" fill="${vidrio}"/>
        <rect x="-50" y="-122" width="100" height="16" rx="7" fill="${C.ink}" opacity=".12"/>
        <rect x="-39" y="-106" width="9" height="92" rx="4.5" fill="#fff" opacity=".2"/>
        <rect x="-30" y="-80" width="60" height="38" fill="${etiqueta}"/>
        <path d="M-9 -66 c3 -7 15 -7 18 0 c-3 7 -15 7 -18 0z" fill="${C.ink}" opacity=".75"/>
        <rect x="-18" y="-53" width="36" height="2" fill="${C.ink}" opacity=".35"/>
        ${tapa ? `<rect x="-54" y="-136" width="108" height="16" rx="6" fill="${C.ink}" opacity=".85"/>` : `
        <line x1="0" y1="-121" x2="0" y2="-134" stroke="${C.ink}" stroke-width="2"/>
        ${encendida ? `<path d="M0 -176 C10 -158 12 -145 0 -134 C-12 -145 -10 -158 0 -176Z" fill="${C.flame}"/>
        <path d="M0 -160 C5 -150 5 -143 0 -138 C-5 -143 -5 -150 0 -160Z" fill="${C.flameIn}"/>` : ''}`}
      `;
    },

    difusor({ vidrio = C.moss, etiqueta = C.bone } = {}) {
      const varas = [-46, -26, -8, 12, 30, 50]
        .map((dx, i) => `<line x1="${dx * 0.12}" y1="-150" x2="${dx}" y2="${-300 + (i % 2) * 22}" stroke="${C.ink}" stroke-width="2.6" stroke-linecap="round"/>`)
        .join('');
      return `
        ${sombra(56)}
        ${varas}
        <rect x="-44" y="-118" width="88" height="118" rx="16" fill="${vidrio}"/>
        <rect x="-13" y="-142" width="26" height="28" rx="3" fill="${vidrio}"/>
        <rect x="-16" y="-156" width="32" height="18" rx="3" fill="${C.ink}"/>
        <rect x="-33" y="-104" width="8" height="84" rx="4" fill="#fff" opacity=".16"/>
        <rect x="-26" y="-74" width="52" height="40" fill="${etiqueta}"/>
        <path d="M-7 -60 c3 -6 11 -6 14 0 c-3 6 -11 6 -14 0z" fill="${C.ink}" opacity=".7"/>
        <rect x="-15" y="-47" width="30" height="2" fill="${C.ink}" opacity=".35"/>
      `;
    },

    jarron({ color = C.terra, rama = true, hoja = C.olive } = {}) {
      const hojas = rama
        ? `<path d="M0 -196 C-8 -250 -40 -300 -70 -330" fill="none" stroke="${C.ink}" stroke-width="2.2" stroke-linecap="round"/>
           <path d="M0 -196 C10 -260 30 -300 62 -350" fill="none" stroke="${C.ink}" stroke-width="2.2" stroke-linecap="round"/>
           <path d="M0 -196 C2 -250 -4 -310 8 -370" fill="none" stroke="${C.ink}" stroke-width="2.2" stroke-linecap="round"/>
           ${[[-30, -262, -30], [-54, -304, -40], [-68, -330, -60], [22, -268, 30], [44, -318, 40], [60, -348, 50], [-2, -300, -10], [4, -340, 15], [8, -370, 0]]
             .map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="7" ry="15" transform="rotate(${r} ${x} ${y})" fill="${hoja}"/>`)
             .join('')}`
        : '';
      return `
        ${sombra(70)}
        ${hojas}
        <path d="M-60 0 C-80 -64 -72 -128 -30 -164 L-22 -198 H22 L30 -164 C72 -128 80 -64 60 0Z" fill="${color}"/>
        <path d="M-22 -198 H22 L24 -190 H-24Z" fill="${C.ink}" opacity=".15"/>
        <path d="M-30 -22 V-86 A30 30 0 0 1 30 -86 V-22" fill="none" stroke="#fff" stroke-width="2.4" opacity=".35"/>
        <path d="M-52 -20 C-66 -70 -58 -118 -30 -146" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".1"/>
      `;
    },

    bandeja({ color = C.terra } = {}) {
      return `
        ${sombra(130, 0.14)}
        <ellipse cx="0" cy="-14" rx="128" ry="34" fill="${color}"/>
        <ellipse cx="0" cy="-22" rx="128" ry="34" fill="${color}"/>
        <ellipse cx="0" cy="-22" rx="128" ry="34" fill="${C.ink}" opacity=".1"/>
        <ellipse cx="0" cy="-25" rx="112" ry="26" fill="${color}"/>
        <ellipse cx="-30" cy="-30" rx="46" ry="8" fill="#fff" opacity=".12"/>
      `;
    },

    cuenco({ color = C.sand, interior = C.bone } = {}) {
      return `
        ${sombra(82)}
        <path d="M-84 -66 A84 64 0 0 0 84 -66Z" fill="${color}"/>
        <ellipse cx="0" cy="-66" rx="84" ry="17" fill="${interior}"/>
        <ellipse cx="0" cy="-63" rx="70" ry="11" fill="${color}" opacity=".45"/>
        <path d="M-70 -48 A74 52 0 0 0 -20 -8" fill="none" stroke="#fff" stroke-width="5" opacity=".14" stroke-linecap="round"/>
      `;
    },

    manta({ a = C.linen, b = C.sand, raya = C.terra } = {}) {
      const capas = [0, 1, 2, 3]
        .map((i) => {
          const y = -36 - i * 34;
          const fill = i % 2 ? b : a;
          return `<rect x="-110" y="${y}" width="220" height="36" rx="16" fill="${fill}"/>
            <rect x="-110" y="${y + 24}" width="220" height="3" fill="${raya}" opacity=".5"/>
            ${[0, 1, 2, 3, 4, 5, 6].map((f) => `<line x1="110" y1="${y + 6 + f * 4}" x2="${122 + (f % 2) * 4}" y2="${y + 8 + f * 4}" stroke="${fill}" stroke-width="2" stroke-linecap="round"/>`).join('')}`;
        })
        .join('');
      return `${sombra(126)}${capas}`;
    },

    taza({ color = C.off } = {}) {
      return `
        ${sombra(40)}
        <path d="M-34 -64 H34 V-20 A20 20 0 0 1 14 0 H-14 A20 20 0 0 1 -34 -20Z" fill="${color}"/>
        <path d="M34 -52 a16 14 0 0 1 0 28" fill="none" stroke="${color}" stroke-width="7"/>
        <ellipse cx="0" cy="-64" rx="34" ry="7" fill="${C.ink}" opacity=".18"/>
        <path d="M-6 -86 c-8 -8 8 -14 0 -24 M8 -84 c-8 -8 8 -14 0 -24" fill="none" stroke="#fff" stroke-width="2" opacity=".6" stroke-linecap="round"/>
      `;
    },

    libros({ colores = [C.sage, C.bone, C.terra] } = {}) {
      return `${sombra(96)}${colores
        .map((c, i) => `<rect x="${-92 + i * 6}" y="${-28 - i * 28}" width="${184 - i * 16}" height="28" rx="3" fill="${c}"/>
          <rect x="${-92 + i * 6}" y="${-28 - i * 28}" width="12" height="28" fill="${C.ink}" opacity=".12"/>`)
        .join('')}`;
    },

    planta({ maceta = C.clay, hoja = C.sage } = {}) {
      const hojas = [[-60, -180, -35], [-30, -230, -12], [10, -250, 8], [50, -214, 30], [70, -160, 55], [-78, -130, -60], [30, -170, 18]]
        .map(([x, y, r]) => `<path d="M0 -100 Q${x * 0.4} ${y * 0.7} ${x} ${y}" fill="none" stroke="${C.moss}" stroke-width="2.2"/>
          <ellipse cx="${x}" cy="${y}" rx="17" ry="34" transform="rotate(${r} ${x} ${y})" fill="${hoja}"/>`)
        .join('');
      return `${sombra(70)}${hojas}
        <path d="M-58 -104 H58 L46 0 H-46Z" fill="${maceta}"/>
        <rect x="-62" y="-112" width="124" height="16" rx="3" fill="${maceta}"/>
        <rect x="-62" y="-112" width="124" height="16" rx="3" fill="${C.ink}" opacity=".08"/>`;
    },

    piedras() {
      return `${sombra(50, 0.12)}
        <ellipse cx="-22" cy="-12" rx="30" ry="13" fill="${C.sand}"/>
        <ellipse cx="18" cy="-10" rx="22" ry="10" fill="${C.clay}"/>
        <ellipse cx="0" cy="-30" rx="18" ry="10" fill="${C.stone}"/>`;
    },
  };

  const ubicar = (html, x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${html}</g>`;

  /* ---------------------------------------------------------------- Escenas
     Lienzo de 400 × 500 (o 800 × 500 con ancho: 800), recortado para cubrir el contenedor. */
  function escena({ ancho = 400, fondo = C.stone, piso = C.clay, pisoY = 360, luz = null, objetos = [], extra = '' }) {
    const W = ancho;
    const H = 500;
    const cx = W / 2;
    let luzSvg = '';
    if (luz === 'arco') {
      luzSvg = `<path d="M${cx - 96} ${pisoY} V150 A96 96 0 0 1 ${cx + 96} 150 V${pisoY}Z" fill="#fff" opacity=".28"/>
        <path d="M${cx - 96} ${pisoY} L${cx - 150} ${H} H${cx + 150} L${cx + 96} ${pisoY}Z" fill="#fff" opacity=".1"/>`;
    } else if (luz === 'sol') {
      luzSvg = `<circle cx="${cx + 70}" cy="150" r="104" fill="#fff" opacity=".22"/>`;
    } else if (luz === 'ventana') {
      luzSvg = `<g opacity=".22" fill="#fff"><rect x="${cx - 150}" y="70" width="120" height="170" rx="2"/><rect x="${cx - 24}" y="70" width="120" height="170" rx="2"/></g>
        <path d="M${cx - 150} 240 L${cx - 60} ${pisoY + 40} H${cx + 190} L${cx + 96} 240Z" fill="#fff" opacity=".06"/>`;
    } else if (luz === 'noche') {
      luzSvg = `<circle cx="${cx + 110}" cy="110" r="36" fill="${C.honey}" opacity=".35"/>`;
    }
    const cuerpo = objetos.map(([tipo, x, y, s, opts]) => ubicar(O[tipo](opts), x, y ?? pisoY + 20, s)).join('');
    return `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <rect width="${W}" height="${H}" fill="${fondo}"/>
      ${luzSvg}
      <rect y="${pisoY}" width="${W}" height="${H - pisoY}" fill="${piso}"/>
      <rect y="${pisoY}" width="${W}" height="2" fill="${C.ink}" opacity=".06"/>
      ${extra}
      ${cuerpo}
    </svg>`;
  }

  /* Solo el objeto, sin fondo (para los objetos flotantes) */
  function suelto(tipo, opts, alto = 400) {
    return `<svg viewBox="-160 -${alto} 320 ${alto + 20}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">${O[tipo](opts)}</svg>`;
  }

  const E = {
    // Portada: rincón cálido con productos NÖMA
    hero: () => escena({
      fondo: '#E6DBCB', piso: '#CDB89D', pisoY: 350, luz: 'arco',
      objetos: [
        ['jarron', 118, 370, 0.95, { color: C.terra }],
        ['bandeja', 250, 382, 0.82, { color: C.rust }],
        ['vela', 228, 368, 0.62, { vidrio: C.amber }],
        ['cuenco', 300, 364, 0.42, { color: C.sage, interior: C.bone }],
        ['libros', 330, 392, 0.55, { colores: [C.sage, C.bone] }],
      ],
    }),
    calma: () => escena({
      fondo: C.nightWall, piso: C.night, pisoY: 340, luz: 'noche',
      objetos: [
        ['vela', 150, 372, 0.9, { vidrio: C.amber }],
        ['vela', 262, 380, 0.62, { vidrio: C.bone, etiqueta: C.sand }],
        ['difusor', 320, 360, 0.55, { vidrio: C.moss }],
      ],
    }),
    tierra: () => escena({
      fondo: '#D9C3A9', piso: '#B99C7E', pisoY: 350, luz: 'sol',
      objetos: [
        ['jarron', 150, 372, 0.95, { color: C.terra, hoja: C.moss }],
        ['cuenco', 280, 378, 0.7, { color: C.bone, interior: C.sand }],
        ['piedras', 330, 384, 0.7],
      ],
    }),
    ritual: () => escena({
      fondo: '#7C8872', piso: '#5E6A55', pisoY: 345, luz: 'arco',
      objetos: [
        ['bandeja', 200, 390, 1.15, { color: C.terra }],
        ['difusor', 140, 372, 0.72, { vidrio: C.moss, etiqueta: C.bone }],
        ['vela', 238, 380, 0.72, { vidrio: C.amber }],
        ['taza', 310, 388, 0.55, { color: C.bone }],
      ],
    }),
    editorial: () => escena({
      fondo: '#E9E0D2', piso: '#D6C6B0', pisoY: 380, luz: 'ventana',
      objetos: [
        ['jarron', 200, 404, 1.05, { color: C.bone, hoja: C.olive }],
        ['piedras', 305, 408, 0.6],
      ],
    }),
    editorial2: () => escena({
      fondo: C.terra, piso: C.rust, pisoY: 330, luz: 'sol',
      objetos: [['taza', 200, 360, 1.3, { color: C.bone }]],
    }),
    set: () => escena({
      fondo: '#E4D8C6', piso: '#CBB597', pisoY: 330, luz: 'arco',
      objetos: [
        ['bandeja', 200, 392, 1.25, { color: C.terra }],
        ['difusor', 138, 374, 0.78, { vidrio: C.moss }],
        ['vela', 240, 384, 0.8, { vidrio: C.amber }],
      ],
    }),
    // Comunidad / lifestyle
    living: () => escena({
      fondo: '#DCCFBC', piso: '#A89379', pisoY: 330, luz: 'ventana',
      objetos: [
        ['planta', 110, 356, 0.8, { maceta: C.bone }],
        ['manta', 270, 356, 0.8, { a: C.linen, b: C.sage, raya: C.terra }],
      ],
    }),
    dormitorio: () => escena({
      fondo: '#E8DDD3', piso: C.blush, pisoY: 320, luz: 'sol',
      objetos: [
        ['manta', 200, 352, 1.05, { a: C.bone, b: C.blush, raya: C.terra }],
        ['vela', 200, 214, 0.48, { vidrio: C.bone, etiqueta: C.sand }],
      ],
    }),
    mesa: () => escena({
      fondo: '#CBBCA6', piso: '#8F7A62', pisoY: 300, luz: 'arco',
      objetos: [
        ['bandeja', 200, 380, 1.2, { color: C.bone }],
        ['taza', 150, 364, 0.7, { color: C.terra }],
        ['taza', 250, 372, 0.7, { color: C.sage }],
      ],
    }),
    velaCerca: () => escena({
      fondo: C.nightWall, piso: C.night, pisoY: 380, luz: 'noche',
      objetos: [['vela', 200, 420, 1.45, { vidrio: C.amber }]],
    }),
    ceramica: () => escena({
      fondo: '#E7DED0', piso: C.sand, pisoY: 340, luz: 'sol',
      objetos: [
        ['cuenco', 200, 372, 1.05, { color: C.terra, interior: C.clay }],
        ['cuenco', 200, 300, 0.78, { color: C.bone, interior: C.stone }],
        ['cuenco', 200, 244, 0.52, { color: C.sage, interior: C.bone }],
      ],
    }),
    detalle: () => escena({
      fondo: '#9AA38C', piso: C.mossLight, pisoY: 350, luz: 'arco',
      objetos: [
        ['difusor', 190, 390, 1.05, { vidrio: C.moss }],
        ['piedras', 300, 390, 0.7],
      ],
    }),
    // Colección
    coleccion: () => escena({
      ancho: 800, fondo: '#E3D7C5', piso: '#CDB89D', pisoY: 340, luz: 'arco',
      objetos: [
        ['planta', 140, 362, 0.62, { maceta: C.bone }],
        ['jarron', 300, 364, 0.8, { color: C.terra }],
        ['bandeja', 460, 372, 0.8, { color: C.rust }],
        ['vela', 440, 360, 0.55, { vidrio: C.amber }],
        ['cuenco', 520, 356, 0.4, { color: C.sage, interior: C.bone }],
        ['manta', 660, 372, 0.6, { a: C.linen, b: C.sand, raya: C.terra }],
      ],
    }),
    tile: () => escena({
      fondo: C.sage, piso: C.moss, pisoY: 330, luz: 'sol',
      objetos: [['jarron', 200, 360, 0.9, { color: C.bone, hoja: C.honey }]],
    }),
  };

  /* Imágenes de producto: 0 = principal, 1 = segunda (hover), 2 = ambiente */
  const P = {
    'vela-ambar': [
      () => escena({ fondo: C.bone, piso: C.stone, pisoY: 330, luz: 'sol', objetos: [['vela', 200, 380, 1.3, { vidrio: C.amber }]] }),
      () => escena({ fondo: C.nightWall, piso: C.night, pisoY: 330, luz: 'noche', objetos: [['vela', 200, 380, 1.3, { vidrio: C.amber }]] }),
      () => E.hero(),
    ],
    'vela-santal': [
      () => escena({ fondo: C.bone, piso: C.stone, pisoY: 330, luz: 'sol', objetos: [['vela', 200, 380, 1.3, { vidrio: C.bone, etiqueta: C.sand, encendida: false, tapa: true }]] }),
      () => escena({ fondo: C.sand, piso: '#AF9E86', pisoY: 330, luz: 'arco', objetos: [['vela', 200, 380, 1.3, { vidrio: C.bone, etiqueta: C.sand }]] }),
      () => E.dormitorio(),
    ],
    'difusor-bosque': [
      () => escena({ fondo: C.bone, piso: C.stone, pisoY: 350, luz: 'sol', objetos: [['difusor', 200, 392, 1.05, { vidrio: C.moss }]] }),
      () => escena({ fondo: '#9AA38C', piso: C.mossLight, pisoY: 350, luz: 'arco', objetos: [['difusor', 200, 392, 1.05, { vidrio: C.moss }]] }),
      () => E.detalle(),
    ],
    'jarron-arco': [
      () => escena({ fondo: C.bone, piso: C.stone, pisoY: 360, luz: 'sol', objetos: [['jarron', 200, 400, 0.98, { color: C.terra, rama: false }]] }),
      () => escena({ fondo: '#D9C3A9', piso: '#B99C7E', pisoY: 360, luz: 'arco', objetos: [['jarron', 200, 400, 0.98, { color: C.terra, hoja: C.moss }]] }),
      () => E.tierra(),
    ],
    'bandeja-terra': [
      () => escena({ fondo: C.bone, piso: C.stone, pisoY: 300, luz: 'sol', objetos: [['bandeja', 200, 380, 1.35, { color: C.terra }]] }),
      () => escena({ fondo: '#CBBCA6', piso: '#8F7A62', pisoY: 300, luz: 'arco', objetos: [['bandeja', 200, 380, 1.35, { color: C.terra }], ['taza', 200, 360, 0.7, { color: C.bone }]] }),
      () => E.mesa(),
    ],
    'cuenco-siena': [
      () => escena({ fondo: C.bone, piso: C.stone, pisoY: 330, luz: 'sol', objetos: [['cuenco', 200, 380, 1.4, { color: C.rust, interior: C.clay }]] }),
      () => escena({ fondo: C.terra, piso: C.rust, pisoY: 330, luz: 'arco', objetos: [['cuenco', 200, 380, 1.4, { color: C.bone, interior: C.stone }]] }),
      () => E.ceramica(),
    ],
    'manta-lino': [
      () => escena({ fondo: C.bone, piso: C.stone, pisoY: 320, luz: 'sol', objetos: [['manta', 200, 380, 1.3, { a: C.linen, b: C.sand, raya: C.terra }]] }),
      () => escena({ fondo: C.sage, piso: C.moss, pisoY: 320, luz: 'arco', objetos: [['manta', 200, 380, 1.3, { a: C.linen, b: C.bone, raya: C.terra }]] }),
      () => E.living(),
    ],
    'set-ritual': [
      () => E.set(),
      () => E.ritual(),
      () => E.velaCerca(),
    ],
  };

  const SUELTOS = {
    vela: () => suelto('vela', { vidrio: C.amber }, 250),
    jarron: () => suelto('jarron', { color: C.terra }, 390),
    cuenco: () => suelto('cuenco', { color: C.sage, interior: C.bone }, 120),
    difusor: () => suelto('difusor', { vidrio: C.moss }, 320),
    taza: () => suelto('taza', { color: C.terra }, 130),
    planta: () => suelto('planta', { maceta: C.bone }, 300),
    bandeja: () => suelto('bandeja', { color: C.rust }, 80),
  };

  /* ---------------------------------------------------------------- Pintar */
  const fotos = new Set(window.NOMA_FOTOS || []);

  function pintar(el) {
    if (el.dataset.pintado) return;
    const clave = el.dataset.arte;
    const [tipo, nombre, idx] = clave.split(':'); // "escena:hero" | "producto:vela-ambar:0" | "suelto:vela"
    const archivo = el.dataset.foto;
    if (archivo && fotos.has(archivo)) {
      const img = new Image();
      img.src = `img/${archivo}`;
      img.alt = el.dataset.alt || '';
      img.loading = el.dataset.eager ? 'eager' : 'lazy';
      img.decoding = 'async';
      el.replaceChildren(img);
    } else {
      let svg = '';
      if (tipo === 'escena' && E[nombre]) svg = E[nombre]();
      else if (tipo === 'producto' && P[nombre]) svg = P[nombre][Number(idx) || 0]();
      else if (tipo === 'suelto' && SUELTOS[nombre]) svg = SUELTOS[nombre]();
      el.innerHTML = svg;
      if (el.dataset.alt) {
        el.setAttribute('role', 'img');
        el.setAttribute('aria-label', el.dataset.alt);
      }
    }
    el.dataset.pintado = 'true';
  }

  function pintarTodo(root = document) {
    root.querySelectorAll('[data-arte]').forEach(pintar);
  }

  window.NomaArte = { pintarTodo, pintar };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => pintarTodo());
  else pintarTodo();
})();
