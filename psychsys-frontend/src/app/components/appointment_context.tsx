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
    end_time: string | null,
    phone: string | null,
    first_name: string | null,
    last_name: string | null,
    email: string | null,
    id_request: string | null,
    setEnd_time: (value: string) => void;
    setPhone: (value: string) => void;
    setFirst_name: (value: string) => void;
    setLast_name: (value: string) => void;
    setEmail: (value: string) => void;
    setId_request: (value: string) => void;
};

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export const AppointmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [service, setService] = useState<string | null>(null);
    const [staff, setStaff] = useState<string | null>(null);
    const [date, setDate] = useState<string | null>(null);
    const [hour, setHour] = useState<string | null>(null);

    const [end_time, setEnd_time] = useState<string | null>(null);
    const [phone, setPhone] = useState<string | null>(null);
    const [first_name, setFirst_name] = useState<string | null>(null);
    const [last_name, setLast_name] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [id_request, setId_request] = useState<string | null>(null);

    return (
        <AppointmentContext.Provider value={{ service, staff, date, hour, end_time, phone, first_name, last_name, email, id_request, setService, setStaff, setDate, setHour, setEnd_time, setPhone, setFirst_name, setLast_name, setEmail, setId_request }}>
            {children}
        </AppointmentContext.Provider>
    );
};

export const useAppointment = () => {
    const context = useContext(AppointmentContext);
    if (!context) throw new Error("useAppointment must be used within an AppointmentProvider");
    return context;
};
