import { create } from "zustand"
import type { CreatePatient } from "../intefaces/User.interface"

interface DoctorStore {
  pacientes: CreatePatient[]
  setPacientes: (pacientes: CreatePatient[]) => void
}


const useDoctorStore = create<DoctorStore>((set) => ({
  pacientes: [],
  setPacientes: (pacientes) => set({ pacientes }),
}))

export default useDoctorStore
