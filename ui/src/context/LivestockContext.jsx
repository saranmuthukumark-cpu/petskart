"use client";

import { createContext, useContext, useState, useEffect } from "react";

const LivestockContext = createContext();

export const LivestockProvider = ({ children }) => {
  const [livestocks, setLivestocks] = useState([]);
  const [pets, setPets] = useState([]);
  const [pharmacy, setPharmacy] = useState([]);
  const [supplies, setSupplies] = useState([]);

  const [veterinary, setVeterinary] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPets = async () => {
      try {
        const response = await fetch("http://localhost:5000/pets");
        const result = await response.json();
        setPets(result.data);
      } catch (error) {
        console.error("Failed to fetch", error);
      } finally {
        setLoading(false);
      }
    };

    getPets();
  }, []);

  useEffect(() => {
    const getLivestocks = async () => {
      try {
        const response = await fetch("http://localhost:5000/livestocks");
        const result = await response.json();
        setLivestocks(result.data);
      } catch (error) {
        console.error("Failed to fetch", error);
      } finally {
        setLoading(false);
      }
    };

    getLivestocks();
  }, []);

  useEffect(() => {
    const getPharmacy = async () => {
      try {
        const response = await fetch("http://localhost:5000/pharmacy");
        const result = await response.json();
        setPharmacy(result.data);
      } catch (error) {
        console.error("Failed to fetch", error);
      } finally {
        setLoading(false);
      }
    };

    getPharmacy();
  }, []);

  useEffect(() => {
    const getSupplies = async () => {
      try {
        const response = await fetch("http://localhost:5000/supplies");
        const result = await response.json();
        setSupplies(result.data);
      } catch (error) {
        console.error("Failed to fetch", error);
      } finally {
        setLoading(false);
      }
    };

    getSupplies();
  }, []);

  useEffect(() => {
    const getVeterinary = async () => {
      try {
        const response = await fetch("http://localhost:5000/veterinary");
        const result = await response.json();
        setVeterinary(result.data);
      } catch (error) {
        console.error("Failed to fetch", error);
      } finally {
        setLoading(false);
      }
    };

    getVeterinary();
  }, []);

  return (
    <LivestockContext.Provider
      value={{
        loading,
        livestocks,
        setLivestocks,
        pets,
        setPets,
        pharmacy,
        setPharmacy,
        supplies,
        setSupplies,
        veterinary,
        setVeterinary,
      }}>
      {children}
    </LivestockContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(LivestockContext);
  if (!context) {
    throw new Error("LivestockProvider");
  }
  return context;
};
