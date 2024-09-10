import axios from "axios";
import { Driver, Tasks } from "../../types/types";

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
export const DeleteTruck = async(truckId:number)=>{
  try {
    const response = await axios.delete(`${API_BASE_URL}/trucks/${truckId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting truck:`,error);
    throw error;
  }
}
export const DeleteTruckByMatricule = async (matricule: string) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/trucks/${matricule}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      throw new Error("Truck not found");
    }
    console.error(`Error deleting truck:`, error);
    throw error;
  }
}

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

export const updateDriver = async (driver: Driver) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/drivers/${driver.id}`, driver);
    return response.data;
  } catch (error) {
    console.error('Error updating driver:', error);
    throw error;
  }
};

export const DeleteDriver = async(id:number)=>{
  try {
    const response = await axios.delete(`${API_BASE_URL}/drivers/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting driver:`,error);
    throw error;
  }
}

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
    console.error(`Error assigning task:`,error);
    throw error;
  }
}
export const assignTaskToDriver = async (taskId: string, driverCIN: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/tasks/${taskId}/assign/${driverCIN}`);
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error assigning task to driver:', error);
    if (axios.isAxiosError(error)) {
      console.error('Response data:', error.response?.data);
      console.error('Response status:', error.response?.status);
      console.error('Response headers:', error.response?.headers);
    }
    throw error;
  }
};

export const DeleteTask = async(taskId:number)=>{
  try {
    const response = await axios.delete(`${API_BASE_URL}/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting tasks:`,error);
    throw error;
  }
}

export const createTask = async (newTask: Tasks) => {
  try {
    const response = await axios.post('/api/tasks', newTask);
    console.log('Task created successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

// export const createTask = async (taskData: {
//     details:string;
//     provider:string;
//     Observation:string;
//     Cloture:Date;
//     DateHeureCreation:string;
//     status:string;
//     startedAt:string;
//     completedAt:string;
//     driverCin:string;
//   }) => {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/tasks`, taskData);
//     return response.data;
//   } catch (error) {
//     console.error('Error creating task:', error);
//     throw error;
//   }
// };
export const updateTask = async (task: Tasks) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/tasks/${task.id}`, task);
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};
