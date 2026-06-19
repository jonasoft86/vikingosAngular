export interface NavItem {
  readonly id: string;
  readonly label: string;
}

export interface ServiceItem {
  readonly icon: string;
  readonly title: string;
  readonly description: string;
}

export interface ProjectItem {
  readonly category: string;
  readonly title: string;
  readonly image: string;
}

export interface ValueItem {
  readonly icon: string;
  readonly title: string;
  readonly description: string;
}

export interface ProcessStep {
  readonly number: string;
  readonly icon: string;
  readonly title: string;
  readonly description: string;
}
