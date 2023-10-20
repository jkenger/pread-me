export interface IPread {
  id: number;
  name: string;
  content: string;
  originalContent: string;
  type: PreadType;
  isActive: number;
}

export enum PreadType {
  TEMPLATES = "templates",
  SECTIONS = "sections",
  CUSTOM = "customs",
}
