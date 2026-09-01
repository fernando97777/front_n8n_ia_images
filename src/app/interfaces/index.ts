// src/app/interfaces/index.ts

export interface PaginatedResponse<T> {
  count:    number;
  next:     string | null;
  previous: string | null;
  results:  T[];
}

// Dashboard Stats
export interface DashboardStats {
  totals: {
    prescriptions: number;
    patients: number;
    doctors: number;
    clinics: number;
    medications: number;
  };
  recent: {
    today: number;
    last_7_days: number;
    last_30_days: number;
  };
  tokens: {
    total_input: number;
    total_output: number;
    avg_input: number;
    avg_output: number;
  };
}

export interface ChartDataPoint {
  date?: string;
  month?: string;
  count: number;
}

export interface TopMedication {
  name: string;
  count: number;
  total_quantity: number;
}

export interface TopDoctor {
  id: number;
  name: string;
  specialty: string;
  prescription_count: number;
}

export interface TopClinic {
  id: number;
  name: string;
  city: string;
  prescription_count: number;
}

export interface PatientDemographics {
  by_sex: { patient_sex: string; count: number }[];
  by_age_range: Record<string, number>;
}

export interface MedicationRoute {
  route: string;
  count: number;
}

// Patient
export interface Patient {
  id: number;
  name: string;
  birth_date: string | null;
  sex: 'M' | 'F' | 'O' | 'U';
  phone: string;
  email: string;
  allergies: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface PatientList {
  id: number;
  name: string;
  sex: 'M' | 'F' | 'O' | 'U';
  phone: string;
  email: string;
  prescription_count: number;
  created_at: string;
}

export interface Clinica {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  city: string;
  created_at: string;
  updated_at: string;
}

export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  license_number: string;
  phone: string;
  email: string;
  clinic: number | null;
  clinic_name?: string;
  created_at: string;
  updated_at: string;
}

export interface PrescribedMedication {
  id: number;
  name: string;
  commercial_name: string;
  quantity: number | null;
  quantity_text: string;
  route: 'oral' | 'sublingual' | 'topical' | 'intravenous' | 'intramuscular' | 'other';
  notes: string;
}

export interface MedicalPrescription {
  id: number;
  google_drive_file_id: string;
  image_url: string;
  claude_message_id: string;
  claude_model: string;
  input_tokens: number | null;
  output_tokens: number | null;
  raw_response: string;
  prescription_date: string;
  prescription_number: string;
  clinic: number | null;
  clinic_name: string;
  clinic_address: string;
  clinic_phone: string;
  patient: number | null;
  patient_name: string;
  patient_age: number | null;
  patient_sex: 'M' | 'F' | 'O' | 'U';
  patient_allergies: string;
  doctor: number | null;
  prescriber_name: string;
  prescriber_specialty: string;
  medications: PrescribedMedication[];
  created_at: string;
  updated_at: string;
}

export interface MedicalPrescriptionList
  extends Omit<MedicalPrescription, 'medications' | 'raw_response'> {
  medications_count: number;
}
