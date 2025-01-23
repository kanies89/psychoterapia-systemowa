import React, { createContext, useState, useContext } from "react";

type AppointmentContextType = {
    service: string | null;
    staff: string | null;
    date: string | null;
    hour: string | null;
    setService: (value: string) => void;
    setStaff: (value: string) => void;
    setDate: (value: string) => void;
    setHour: (value: string) => void;
};

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export const AppointmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [service, setService] = useState<string | null>(null);
    const [staff, setStaff] = useState<string | null>(null);
    const [date, setDate] = useState<string | null>(null);
    const [hour, setHour] = useState<string | null>(null);

    return (
        <AppointmentContext.Provider value={{ service, staff, date, hour, setService, setStaff, setDate, setHour }}>
            {children}
        </AppointmentContext.Provider>
    );
};

export const useAppointment = () => {
    const context = useContext(AppointmentContext);
    if (!context) throw new Error("useAppointment must be used within an AppointmentProvider");
    return context;
};
