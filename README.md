# Vikingos Digitales — Angular Landing

Landing page responsive de una agencia digital construida con Angular 22, componentes standalone y una arquitectura SCSS atómica.

## Tecnologías

- Angular 22
- TypeScript 6
- Angular Reactive Forms
- RxJS
- SCSS
- Angular CLI

## Requisitos

- Node.js 22.12 o superior
- npm 10 o superior

## Instalación

```bash
npm install
```

## Desarrollo

Servidor estándar:

```bash
npm start
```

Disponible en `http://localhost:4200`.

Servidor con puerto personalizado:

```bash
npm run dev -- -p 3100
```

## Build de producción

```bash
npm run build
```

Los archivos compilados se generan en:

```txt
dist/vikingos-digitales/
```

## Estructura

```txt
src/
├─ app/
│  ├─ features/
│  │  ├─ hero/
│  │  ├─ services/
│  │  ├─ projects/
│  │  ├─ about/
│  │  └─ contact/
│  ├─ layout/
│  │  ├─ header/
│  │  ├─ footer/
│  │  └─ scroll-rail/
│  └─ shared/
│     ├─ data/
│     ├─ directives/
│     └─ models/
├─ styles/
│  ├─ abstracts/
│  ├─ atoms/
│  ├─ base/
│  ├─ layout/
│  ├─ utilities/
│  └─ main.scss
└─ main.ts

assets/
├─ backgrounds/
├─ hero-layers/
├─ projects/
├─ favicon-angular.svg
└─ logo-vikingos.svg
```

## Arquitectura

### Componentes

Cada sección de la landing es un componente standalone:

- `HeaderComponent`
- `HeroComponent`
- `ServicesComponent`
- `ProjectsComponent`
- `AboutComponent`
- `ContactComponent`
- `FooterComponent`
- `ScrollRailComponent`

Los textos repetibles de servicios, proyectos, valores y proceso están centralizados en `shared/data/landing.data.ts`.

### SCSS atómico

- `abstracts`: variables, breakpoints y mixins.
- `base`: reset y tipografía global.
- `atoms`: botones y elementos reutilizables.
- `layout`: contenedores y secciones.
- `utilities`: animaciones y estados auxiliares.
- Estilos específicos encapsulados junto a cada componente.

## Funcionalidades

- Navegación fija con detección automática de la sección activa.
- Menú responsive para móvil.
- Hero compuesto por capas animadas de montaña, mareas y nave.
- Parallax progresivo en la portada.
- Animaciones reveal mediante una directiva reutilizable.
- Efecto tilt y reflejo en tarjetas para dispositivos con puntero preciso.
- Formulario reactivo con validación y etiquetas flotantes.
- Fondos independientes para cada sección.
- Diseño responsive para escritorio, tablet y móvil.
- Compatibilidad con `prefers-reduced-motion`.
- Favicon de Angular.
- Detección de cambios zoneless y estrategia `OnPush`.

## Formulario

El formulario valida los datos localmente, pero aún no está conectado a un backend o servicio de correo. El punto de integración se encuentra en:

```txt
src/app/features/contact/contact.component.ts
```

## Scripts

| Comando | Descripción |
| --- | --- |
| `npm start` | Inicia Angular en el puerto 4200 |
| `npm run dev -- -p 3100` | Inicia el servidor en un puerto personalizado |
| `npm run build` | Genera el build de producción |
| `npm run watch` | Compila en modo observación |

## Assets

Los recursos visuales se sirven desde `assets/` y se copian automáticamente durante el build mediante la configuración de `angular.json`.
