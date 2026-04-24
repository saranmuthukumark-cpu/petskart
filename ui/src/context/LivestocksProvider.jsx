"use client";

import { createContext, useContext, useState, useEffect } from "react";

const LivestockContext = createContext();

export const LivestockProvider = ({ children }) => {
    const [livestocks, setLivestocks] = useState([]);
    const [loading, setLoading] = useState(true);

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

    return (
        <LivestockContext.Provider value={{ livestocks, setLivestocks, loading }}>
            {children}
        </LivestockContext.Provider>
    );
};

