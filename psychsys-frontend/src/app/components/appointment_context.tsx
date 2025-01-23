import React, { createContext, useContext, useState } from 'react';

interface AppointmentData {
    service?: string;
    staff?: string;
    date?: string;
    hour?: string;
    [key: string]: any; // Allows flexibility for additional properties
}

interface AppointmentContextType {
    appointmentData: AppointmentData;
    setAppointmentData: React.Dispatch<React.SetStateAction<AppointmentData>>;
}

const AppointmentContext = createContext<AppointmentContextType | null>(null);

export const AppointmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [appointmentData, setAppointmentData] = useState<AppointmentData>({});
    return (
        <AppointmentContext.Provider value={{ appointmentData, setAppointmentData }}>
            {children}
        </AppointmentContext.Provider>
    );
};

export const useAppointment = () => {
    const context = useContext(AppointmentContext);
    if (!context) {
        throw new Error('useAppointment must be used within an AppointmentProvider');
    }
    return context;
};
