import api from '../axios.config';
import { ICreatePatient } from '../../Intefaces/Patient/PatientRegister';

export const RegisterPatient = (data: ICreatePatient)=>
    api.post('/patient',data)
