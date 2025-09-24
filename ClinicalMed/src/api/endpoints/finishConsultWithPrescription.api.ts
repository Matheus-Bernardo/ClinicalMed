import api from '../axios.config';

export const FinishConsultWithPrescription = (data:any) =>
    api.put('/ConsultationMedical/finishWithPrescription',data)