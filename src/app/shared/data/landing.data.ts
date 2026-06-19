import { NavItem, ProcessStep, ProjectItem, ServiceItem, ValueItem } from '../models/landing.models';

export const NAV_ITEMS: readonly NavItem[] = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'servicios', label: 'Servicios' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'nosotros', label: 'Nosotros' },
  { id: 'contacto', label: 'Contacto' },
];

export const SERVICES: readonly ServiceItem[] = [
  { icon: '</>', title: 'Desarrollo web', description: 'Sitios web a medida, rápidos, seguros y preparados para crecer con tu negocio.' },
  { icon: '▣', title: 'Frontend UI', description: 'Interfaces modernas, responsivas y de alto impacto construidas con tecnologías actuales.' },
  { icon: '♙', title: 'UX y producto', description: 'Experiencias intuitivas centradas en las personas que impulsan valor y conversión.' },
  { icon: '◔', title: 'Soporte', description: 'Acompañamiento continuo, mantenimiento y soporte técnico para sostener tu crecimiento.' },
];

export const PROJECTS: readonly ProjectItem[] = [
  { category: 'Comercio electrónico', title: 'Nordic Store', image: 'assets/projects/nordic-store.svg' },
  { category: 'Plataforma SaaS', title: 'Fjord Analytics', image: 'assets/projects/fjord-analytics.svg' },
  { category: 'Educación digital', title: 'Valhalla Training', image: 'assets/projects/valhalla-training.svg' },
];

export const VALUES: readonly ValueItem[] = [
  { icon: '⌖', title: 'Pensamiento estratégico', description: 'Alineamos objetivos de negocio con soluciones digitales efectivas.' },
  { icon: '♢', title: 'Ejecución impecable', description: 'Cuidamos cada detalle para entregar calidad sin excepciones.' },
  { icon: '♡', title: 'Pasión por lo que hacemos', description: 'Disfrutamos nuestro trabajo y eso se nota en cada proyecto.' },
];

export const PROCESS_STEPS: readonly ProcessStep[] = [
  { number: '01', icon: '⌖', title: 'Descubrimiento', description: 'Entendemos tu negocio, audiencia y objetivos para definir el camino correcto.' },
  { number: '02', icon: '♘', title: 'Estrategia', description: 'Diseñamos la estrategia digital, la arquitectura de información y el plan de acción.' },
  { number: '03', icon: '✎', title: 'Diseño', description: 'Creamos experiencias visuales y funcionales que comunican y convierten.' },
  { number: '04', icon: '</>', title: 'Desarrollo', description: 'Construimos soluciones sólidas, escalables y enfocadas en resultados.' },
];
