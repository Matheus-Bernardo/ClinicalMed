import api from '../axios.config';
import { ICreatePrescription } from '../../Intefaces/Prescription/CreatePrescription';

export const CreatePrescription = (data:ICreatePrescription) =>
    api.post('/prescription',data)