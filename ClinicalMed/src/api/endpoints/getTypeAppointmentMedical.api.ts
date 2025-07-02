import api from '../axios.config';

export const getTypeAppointment = ()=>{
    return api.get("AppointmentMedical");
}
