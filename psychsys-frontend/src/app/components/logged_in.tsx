import React, { createContext, useState, useEffect, useContext } from "react";

// Define a context for authentication status
const AuthContext = createContext({ isLoggedIn: false, setIsLoggedIn: (value: boolean) => {} });

// Create a provider component to wrap your app and provide `isLoggedIn` state
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const url_backend = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        // Fetch login status from backend
        fetch(`${url_backend}/check-login-status/`) // Django backend URL
            .then((response) => response.json())
            .then((data) => setIsLoggedIn(data.is_logged_in))
            .catch((error) => console.error("Error fetching login status:", error));
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);
