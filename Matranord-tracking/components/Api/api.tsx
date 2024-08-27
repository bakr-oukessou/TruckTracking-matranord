import axios from "axios";

const API_BASE_URL = 'http://10.0.2.2:8080/api';

export const getAllTrucks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/trucks`);
    return response.data;
  } catch (error) {
    console.error('Error fetching trucks:', error);
    throw error;
  }
};

export const getTruckById = async (id: any) => { 
  try {
    const response = await axios.get(`${API_BASE_URL}/trucks/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching truck with id ${id}:`, error);
    throw error;
  }
};

export const createTruck = async (truckData: { matricule: string; date: string; numeroDossier: string; trajet: string; chargement: string; dechargement: string; status: string; }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/trucks`, truckData);
    return response.data;
  } catch (error) {
    console.error('Error creating truck:', error);
    throw error;
  }
};

export const createDriver = async (driverData: { cin:string;
  nom: string;
  email: string;
  mobileNumber: string;
  adresse: string;
  validitePermit: string;
  idVehicule: string;
  experience:string;}) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/drivers`, driverData);
    return response.data;
  } catch (error) {
    console.error('Error creating driver:', error);
    throw error;
  }
};

export const getAllDrivers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/drivers`);
    return response.data.map((driver: any) => ({
      ...driver,
      profilePicture: driver.profilePicture, // Make sure this field is included
    }));
  } catch (error) {
    console.error('Error fetching drivers:', error);
    throw error;
  }
};

export const getDriverById = async (id: any) => { 
  try {
    const response = await axios.get(`${API_BASE_URL}/drivers/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching driver with id ${id}:`, error);
    throw error;
  }
};

export const getAllTasks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tasks`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const getTaskById = async (id: any) => { 
  try {
    const response = await axios.get(`${API_BASE_URL}/tasks/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching task with id ${id}:`, error);
    throw error;
  }
};

export const getTaskByDriverCIN = async (driverCIN:any)=>{
  try{
    const response = await axios.get(`${API_BASE_URL}/tasks/driver/${driverCIN}`);
    return response.data;
  }catch(error){
    console.error(`Error fetching driver task with id ${driverCIN}:`,error);
    throw error;
  }
}

export const getAvailableTasks = async()=>{
  try {
    const response = await axios.get(`${API_BASE_URL}/tasks/available`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching available tasks:`,error);
    throw error;
  }
}

export const CompletedTasks = async(taskId:any)=>{
  try {
    await axios.post(`${API_BASE_URL}/tasks/${taskId}/complete`);
  } catch (error) {
    console.error(`Error completing tasks:`,error);
    throw error;
  }
}

export const AssignTask = async(taskId:any)=>{
  try {
    await axios.post(`${API_BASE_URL}/tasks/${taskId}/assign`);
    getAvailableTasks();
  } catch (error) {
    console.error(`Error assigning available tasks:`,error);
    throw error;
  }
}

export const DeleteTask = async(taskId:any)=>{
  try {
    const response = await axios.delete(`${API_BASE_URL}/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting tasks:`,error);
    throw error;
  }
}