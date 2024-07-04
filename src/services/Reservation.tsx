import axios from "../plugins/axiosInterceptor";
import { message } from "antd";
import { ApiResponse, Reservation, ReservationPayload } from "../types";  // Make sure this path is correct

// Fetch reservations
export const getReservationsService = async (): Promise<Reservation[]> => {
  try {
    const response = await axios.get<ApiResponse<Reservation[]>>(`${import.meta.env.VITE_APP_BASE_URL}/reservations`);
    return response.data.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des réservations:", error);
    message.error("Erreur lors de la récupération des réservations.");
    throw error;
  }
};

// Add a new reservation
export const postReservationService = async (payload: ReservationPayload): Promise<Reservation> => {
  try {
    const response = await axios.post<ApiResponse<Reservation>>(`${import.meta.env.VITE_APP_BASE_URL}/reservations`, payload);
    message.success("Réservation ajoutée avec succès.");
    return response.data.data;
  } catch (error) {
    console.error("Erreur lors de l'ajout de la réservation:", error);
    message.error("Erreur lors de l'ajout de la réservation.");
    throw error;
  }
};

// Delete a reservation
export const deleteReservationService = async (reservationId: number): Promise<void> => {
  try {
    const response = await axios.delete<ApiResponse<void>>(`${import.meta.env.VITE_APP_BASE_URL}/reservations/${reservationId}`);
    message.success(response.data.message || "Réservation supprimée avec succès.");
  } catch (error) {
    console.error("Erreur lors de la suppression de la réservation:", error);
    message.error("Erreur lors de la suppression de la réservation.");
    throw error;
  }
};

// Update a reservation
export const updateReservationService = async (reservationId: number, payload: ReservationPayload): Promise<Reservation> => {
  try {
    const response = await axios.put<ApiResponse<Reservation>>(`${import.meta.env.VITE_APP_BASE_URL}/reservations/${reservationId}`, payload);
    message.success(response.data.message || "Réservation mise à jour avec succès.");
    return response.data.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la réservation:", error);
    message.error("Erreur lors de la mise à jour de la réservation.");
    throw error;
  }
};
