import patients from '../../data/patients';
import { NonSensitivePatientInfo, Patient, NewPatient } from '../types';
import { v4 as uuid } from 'uuid';

const getPatients = (): NonSensitivePatientInfo[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = ( patient: NewPatient ): Patient => {
  const id = uuid();
  const newPatient = {
    id,
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  addPatient
};