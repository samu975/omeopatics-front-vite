export interface User {
  _id: string;
  name: string;
  phone: string;
  cedula: string;
  role: string;
}

export interface CreatePatient {
  name: string;
  phone: string;
  password: string;
  cedula: string;
  role: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  asignedFormulas: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  historial: any[];
  loveLanguagesTestEnabled: boolean;
}
export interface Patient {
  _id: string;
  name: string;
  phone: string;
  cedula: string;
  role: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  asignedFormulas: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  historial: any[];
}

export interface GetHistorial {
  _id: string;
  patient: string;
  objetivoDeTerapia: string;
  sesionesTrabajadas: SesionTrabajada[];
  tratamientoASeguir: string;
  fechaCreacion: string;
}

export interface SesionTrabajada {
  fechaSesion: Date;
  queSeHizo: string;
  recomendacionesProximaSesion: string;
}

export interface CreateHistorial {
  patient: string;
  objetivoDeTerapia: string;
  sesionesTrabajadas?: SesionTrabajada[];
  tratamientoASeguir: string;
  fechaCreacion?: Date;
}

export interface UpdateHistorial {
  _id : string;
  patient?: {
    cedula: string
    name: string
    phone: string
  }
  objetivoDeTerapia?: string;
  tratamientoASeguir?: string;
}

// Interfaces para tests de lenguajes del amor
export interface LoveLanguageQuestion {
  pregunta: string;
}

export interface LoveLanguageCategory {
  categoria: string;
  recibirAmor: LoveLanguageQuestion[];
  expresarAmor: LoveLanguageQuestion[];
}

export interface LoveLanguageProgress {
  answers: LoveLanguageCategoryAnswer[];
  isCompleted: boolean;
  progress: number;
  totalCategories: number;
}

export interface LoveLanguageCategoryAnswer {
  categoria: string;
  recibirAmor: number[];
  expresarAmor: number[];
}

export interface UserWithLoveLanguages extends User {
  loveLanguagesTestEnabled: boolean;
}