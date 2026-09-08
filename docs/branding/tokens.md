# Tokens de marca (variables CSS) — mockup-inmobiliaria

> **Referencia consolidada para el Agente 03 (Frontend).** Son variables **conceptuales**; el Agente 03 puede adaptarlas a su stack (CSS custom properties, Tailwind theme, CSS Modules, etc.). No es el código definitivo del sitio.

## 1. Color

```css
:root {
  /* Primaria — azul petróleo (marca) */
  --brand-900: #0A1F31;
  --brand-800: #0E2B45;
  --brand-700: #12385A;
  --brand-600: #174A75; /* primario CTAs (fondos claros) */
  --brand-500: #23608F;
  --brand-400: #3E7BAA;
  --brand-300: #7BA6C6;
  --brand-100: #DCE8F2;
  --brand-50:  #F0F5F9;

  /* Acento — dorado champagne */
  --accent-600: #A8843B; /* texto acento sobre claro */
  --accent-400: #C7A55A; /* acento principal */
  --accent-300: #D9BC7E;
  --accent-100: #F4EAD5;

  /* Neutros */
  --neutral-0:   #FFFFFF;
  --neutral-50:  #F6F8FA;
  --neutral-100: #EDF0F3;
  --neutral-200: #DCE1E6;
  --neutral-300: #BFC7CF;
  --neutral-400: #98A2AB;
  --neutral-500: #6B7680;
  --neutral-600: #4C5760;
  --neutral-700: #39434B;
  --neutral-800: #232B31;
  --neutral-900: #141A1F;

  /* Semánticos */
  --success:        #1F9D6A;
  --success-strong: #157A53;
  --success-soft:   #E6F6EE;
  --warning:        #C9820B;
  --warning-soft:   #FBF3E0;
  --error:          #D64545;
  --error-strong:   #B93A3A;
  --error-soft:     #FBEAEA;

  /* Alias funcionales */
  --color-bg:        var(--neutral-50);
  --color-surface:   var(--neutral-0);
  --color-border:    var(--neutral-200);
  --color-text:      var(--neutral-800);
  --color-text-soft: var(--neutral-600);
  --color-muted:     var(--neutral-500);
  --color-primary:   var(--brand-600);
  --color-accent:    var(--accent-400);
  --color-on-dark:   #FFFFFF;
}
```

## 2. Tipografía

```css
:root {
  --font-display: "Sora", system-ui, sans-serif;
  --font-body:    "Inter", system-ui, sans-serif;

  --text-display: clamp(2.5rem, 6vw, 4.5rem);   /* hero / H1 grande */
  --text-h1:      clamp(2rem, 4vw, 3rem);       /* título de página */
  --text-h2:      clamp(1.5rem, 3vw, 2.25rem);  /* título de sección */
  --text-h3:      clamp(1.25rem, 2vw, 1.75rem); /* subtítulo de tarjeta */
  --text-body:    clamp(1rem, 1.2vw, 1.125rem);
  --text-small:   0.875rem;
  --text-eyebrow: 0.8125rem;
}
```

## 3. Radios

```css
:root {
  --radius-sm: 8px;   /* chips, inputs pequeños */
  --radius-md: 12px;  /* inputs, mini-CTA */
  --radius-lg: 16px;  /* tarjetas */
  --radius-pill: 999px; /* botones */
}
```

## 4. Sombras (siempre azul oscuro)

```css
:root {
  --shadow-xs: 0 1px 2px rgba(10,31,51,0.05);
  --shadow-sm: 0 4px 20px rgba(10,31,51,0.06);
  --shadow-md: 0 12px 36px rgba(10,31,51,0.14);
  --shadow-lg: 0 24px 60px rgba(10,31,51,0.20);
}
```

## 5. Espaciado

```css
:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;
  --space-9: 96px;

  --container-max: 1240px;
  --container-pad: 16px;  /* mobile */
  --container-pad-lg: 24px; /* tablet/desktop */
}
```

## 6. Layout / breakpoints

```css
:root {
  --bp-mobile: 320px;
  --bp-tablet: 640px;
  --bp-desktop: 1024px;
  --bp-large: 1440px;
}
```

> Ver `docs/ux-ui/layout.md` para la semántica de cada breakpoint (columnas 1/2/3/4, reorganización).

## 7. Botones (recomendación base)

```css
:root {
  --btn-radius: var(--radius-pill);
  --btn-pad: 12px 24px;
  --btn-pad-lg: 14px 32px;
}
```

- **Primario:** fondo `var(--color-primary)`, texto `#fff`. Hover `var(--brand-700)`.
- **Primario sobre oscuro:** fondo `var(--accent-400)`, texto `var(--brand-900)`.
- **Secundario:** transparente, borde `1.5px solid var(--brand-600)`, texto `var(--brand-600)`. Hover fondo `var(--brand-50)`.
- **Focus:** outline `2px solid var(--accent-400)`, offset `2px`.
- **Disabled:** fondo `var(--neutral-200)`, texto `var(--neutral-500)`.

## 8. Reglas de aplicación

- Usar **tokens, nunca hex sueltos** en el código de componentes.
- No inventar sombras/radios fuera de esta escala.
- Mantener **una sola fuente de verdad** (estos tokens) para que el sitio sea consistente y fácil de re-tematizar (p.ej. cuando llegue el backend/Supabase y quieran cambiar la marca).
