// src/app/interfaces/index.ts

export interface PaginatedResponse<T> {
  count:    number;
  next:     string | null;
  previous: string | null;
  results:  T[];
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
