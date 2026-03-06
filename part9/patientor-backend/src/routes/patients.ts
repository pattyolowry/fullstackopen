import express from 'express';
import patientService from '../services/patientService';
import { Response } from 'express';
import { NonSensitivePatientInfo } from "../types";

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatientInfo[]>) => {
  res.send(patientService.getPatients());
});

export default router;