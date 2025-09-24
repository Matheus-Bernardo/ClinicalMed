import api from '../axios.config';

export const FinishConsultWithoutPrescription = (data:any) =>
    api.put('/ConsultationMedical/finishWithoutPrescription',data)