import React, { createContext, useContext, useState } from 'react';

interface AppointmentContextType {
    appointmentData: Record<string, any>;
    setAppointmentData: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}

const AppointmentContext = createContext<AppointmentContextType | null>(null);

export const AppointmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [appointmentData, setAppointmentData] = useState<Record<string, any>>({});
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
