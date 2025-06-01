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

