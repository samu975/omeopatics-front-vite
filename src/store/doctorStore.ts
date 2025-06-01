import { create } from "zustand"
import type { Patient } from "../intefaces/User.interface"

interface DoctorStore {
  pacientes: Patient[]
  setPacientes: (pacientes: Patient[]) => void
}


const useDoctorStore = create<DoctorStore>((set) => ({
  pacientes: [],
  setPacientes: (pacientes) => set({ pacientes }),
}))

export default useDoctorStore
