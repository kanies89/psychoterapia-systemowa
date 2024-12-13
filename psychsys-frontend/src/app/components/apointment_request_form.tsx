import React, { useState, useEffect } from 'react';

interface Slot {
    date: string;
    hour: string;
}

interface Service {
    id: number;
    name: string;
}

interface StaffMember {
    id: number;
    name: string;
}

const AppointmentRequestForm: React.FC = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
    const [selectedService, setSelectedService] = useState<string>('');
    const [selectedStaff, setSelectedStaff] = useState<string>('');
    const [availableSlots, setAvailableSlots] = useState<Slot[]>([]);
    const [selectedDate, setSelectedDate] = useState<string>(() => {
        const today = new Date();
        return today.toISOString().split('T')[0]; // Set default to today's date in YYYY-MM-DD format
    });

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch('http://localhost:8000/appointment_api/get_available_services/');
                if (!response.ok) {
                    throw new Error(`Error fetching services: ${response.statusText}`);
                }
                const data: Service[] = await response.json();
                setServices(data);
                if (data.length > 0) {
                    setSelectedService(data[0].id.toString());
                }
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };
        fetchServices();
    }, []);

    useEffect(() => {
        const fetchStaffMembers = async () => {
            try {
                if (selectedService) {
                    const response = await fetch(`http://localhost:8000/appointment_api/get_staff_members/${selectedService}`);
                    if (!response.ok) {
                        throw new Error(`Error fetching staff members: ${response.statusText}`);
                    }
                    const data = await response.json();
                    setStaffMembers(data.staff_members);
                    if (data.staff_members.length > 0) {
                        setSelectedStaff(data.staff_members[0].id.toString());
                    }
                }
            } catch (error) {
                console.error('Error fetching staff members:', error);
            }
        };
        fetchStaffMembers();
    }, [selectedService]);

    useEffect(() => {
        const fetchAvailableSlots = async () => {
            if (selectedStaff && selectedDate) {
                try {
                    const response = await fetch(`http://localhost:8000/appointment_api/get_available_slots?selected_date=${selectedDate}&staff_member=${selectedStaff}`);
                    if (!response.ok) {
                        throw new Error(`Error fetching available slots: ${response.statusText}`);
                    }
                    const data = await response.json();
                    setAvailableSlots(data.custom_data.available_slots.map((slot: string) => ({ date: data.custom_data.date_chosen, hour: slot })));
                } catch (error) {
                    console.error('Error fetching available slots:', error);
                }
            }
        };
        fetchAvailableSlots();
    }, [selectedStaff, selectedDate]);

    const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedService(e.target.value);
    };

    const handleStaffChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedStaff(e.target.value);
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(e.target.value);
    };

    return (
        <div>
            <h2>Appointment Request Form</h2>
            <form>
                <label>
                    Service:
                    <select value={selectedService} onChange={handleServiceChange} required>
                        {services.map(service => (
                            <option key={service.id} value={service.id}>
                                {service.name}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    Staff Member:
                    <select value={selectedStaff} onChange={handleStaffChange} required>
                        {staffMembers.map(staff => (
                            <option key={staff.id} value={staff.id}>
                                {staff.name}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    Date:
                    <input type="date" value={selectedDate} onChange={handleDateChange} required />
                </label>

                {availableSlots.length > 0 ? (
                    <div>
                        <h3>Available Slots:</h3>
                        {availableSlots.map((slot, index) => (
                            <button key={index} type="button">
                                {slot.date} {slot.hour}
                            </button>
                        ))}
                    </div>
                ) : (
                    <p>No available slots for the next 14 days.</p>
                )}
            </form>
        </div>
    );
};

export default AppointmentRequestForm;
