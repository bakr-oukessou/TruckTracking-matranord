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
