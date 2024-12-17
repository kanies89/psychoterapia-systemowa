import React, { useEffect, useState } from 'react';
import SVGLoader from "@/app/components/btn_date";  // Import the SVGLoader component

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

    const today = new Date();
    const [selectedSlotDate, setSelectedSlotDate] = useState<string | null>(today.toISOString().split('T')[0]);  // Default to current date
    const [showAppointmentsDateHours, setAppointmentDateHours] = useState<string | null>(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch('http://localhost:8000/appointment_api/get_available_services/');
                if (!response.ok) throw new Error(`Error fetching services: ${response.statusText}`);
                const data: Service[] = await response.json();
                setServices(data);
                if (data.length > 0) setSelectedService(data[0].id.toString());
                console.log('Fetching available services', data);
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
                    if (!response.ok) throw new Error(`Error fetching staff members: ${response.statusText}`);
                    const data = await response.json();
                    setStaffMembers(data.staff_members);
                    if (data.staff_members.length > 0) setSelectedStaff(data.staff_members[0].id.toString());
                    console.log('Fetching available staff', data);
                }
            } catch (error) {
                console.error('Error fetching staff members:', error);
            }
        };
        fetchStaffMembers();
    }, [selectedService]);

    useEffect(() => {
        const fetchAvailableSlots = async () => {
            if (selectedStaff) {
                try {
                    const response = await fetch(`http://localhost:8000/appointment_api/get_available_slots?selected_date=${selectedSlotDate}&staff_member=${selectedStaff}`);
                    if (!response.ok) throw new Error(`Error fetching available slots: ${response.statusText}`);
                    const data = await response.json();
                    setAvailableSlots(
                        Object.entries(data.custom_data.available_slots as Record<string, string[]>).flatMap(([date, slots]) =>
                            slots.map((hour: string) => ({ date, hour }))
                        )
                    );
                    console.log('Fetching available slots', data);
                } catch (error) {
                    console.error('Error fetching available slots:', error);
                }
            }
        };
        fetchAvailableSlots();
    }, [selectedStaff, selectedSlotDate]);

    const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => setSelectedService(e.target.value);
    const handleStaffChange = (e: React.ChangeEvent<HTMLSelectElement>) => setSelectedStaff(e.target.value);
    const handleDateClick = (date: string) => setAppointmentDateHours(date);  // Show hours below the selected date

    const renderDates = (groupedSlots: Record<string, string[]>) => {
        return (
            <div>
            <h3>Available Slots:</h3>
            <div className="grid grid-cols-7 gap-4">
                {Object.keys(groupedSlots).map(date => (
                    <div key={date}>
                        <SVGLoader
                            svgPath="svg/btn_date.svg"
                            replaceTextIds={{
                                tspan4: date,
                                tspan6: date
                            }}
                            onClick={() => handleDateClick(date)}
                            className="mb-2"
                        />
                    </div>
                ))}
            </div>
            </div>
        );
    };

    const renderHours = (hours: string[]) => {
        return (
            <div className="flex flex-wrap space-x-2 mt-2">
                {hours.map((hour, index) => (
                    <SVGLoader
                        key={index}
                        svgPath="svg/btn_hour.svg"
                        replaceTextIds={{
                            tspan2: hour,
                        }}
                        className="m-2 flex-none"
                    />
                ))}
            </div>
        );
    };

    // Group available slots by date
    const groupedSlots = availableSlots.reduce<Record<string, string[]>>((acc, slot) => {
        if (!acc[slot.date]) acc[slot.date] = [];
        acc[slot.date].push(slot.hour);
        return acc;
    }, {});

    return (
        <div>
            <h2>Appointment Request Form</h2>
            <form className="grid grid-cols-1 gap-4">
                <label>
                    Service:
                    <select value={selectedService} onChange={handleServiceChange} required className="select text-white select-success w-full bg-bg_2">
                        {services.map(service => (
                            <option key={service.id} value={service.id}>
                                {service.name}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    Staff Member:
                    <select value={selectedStaff} onChange={handleStaffChange} required className="select  text-white select-success w-full bg-bg_2">
                        {staffMembers.map(staff => (
                            <option key={staff.id} value={staff.id}>
                                {staff.name}
                            </option>
                        ))}
                    </select>
                </label>

                {Object.keys(groupedSlots).length > 0 ? renderDates(groupedSlots) : <p>No available slots for the next 14 days.</p>}

                {/* Debugging: Show the selected date */}
                <p>Selected Date: {showAppointmentsDateHours}</p>

                {showAppointmentsDateHours && renderHours(groupedSlots[showAppointmentsDateHours])}


            </form>
        </div>
    );
};

export default AppointmentRequestForm;
