import { supabase } from "./supabase";

/**
 * Fetch shipments for a specific client
 * @param {string} clientId - The UUID of the client
 * @returns {Promise<Array>} - List of shipments
 */
export const fetchClientShipments = async (clientId) => {
  const { data, error } = await supabase
    .from("shipments")
    .select("*")
    .eq("client_id", clientId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching shipments:", error);
    throw error;
  }

  return data;
};

/**
 * Create a new shipment
 * @param {Object} shipmentData - The shipment details
 * @returns {Promise<Object>} - The created shipment
 */
export const createShipment = async (shipmentData) => {
  const { data, error } = await supabase
    .from("shipments")
    .insert([shipmentData])
    .select()
    .single();

  if (error) {
    console.error("Error creating shipment:", error);
    throw error;
  }

  return data;
};

/**
 * Get user profile details
 * @param {string} userId - The UUID of the user
 * @returns {Promise<Object>} - User profile
 */
export const getProfile = async (userId) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.warn("Error fetching profile:", error);
    return null;
  }

  return data;
};
