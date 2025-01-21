import React, { useEffect, useState } from 'react';
import ButtonH from "@/app/components/hour_button";
import ButtonD from "@/app/components/date_button";
import {useAppointment} from "@/app/components/appointment_context";

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
    const [activeButton, setActiveButton] = useState<string | null>(null); // State to store active button ID
    const [activeHour, setActiveHour] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedHour, setSelectedHour] = useState<string | null>(null);
    const today = new Date();
    const [selectedSlotDate] = useState<string | null>(today.toISOString().split('T')[0]);  // Default to current date
    const [showAppointmentsDateHours, setAppointmentDateHours] = useState<string | null>(null);
    const url_backend = process.env.NEXT_PUBLIC_API_URL;
    const { setAppointmentData } = useAppointment();

    // Fetch Services
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch(`${url_backend}/appointment_api/get_available_services/`);
                if (!response.ok) throw new Error(`Error fetching services: ${response.statusText}`);
                const data: Service[] = await response.json();
                setServices(data);
                if (data.length > 0) setSelectedService(data[0].id.toString());
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };
        fetchServices();
    }, [url_backend]);

    // Fetch Staff Members
    useEffect(() => {
        const fetchStaffMembers = async () => {
            try {
                if (selectedService) {
                    const response = await fetch(`${url_backend}/appointment_api/get_staff_members/${selectedService}`);
                    if (!response.ok) throw new Error(`Error fetching staff members: ${response.statusText}`);
                    const data = await response.json();
                    setStaffMembers(data.staff_members);
                    if (data.staff_members.length > 0) setSelectedStaff(data.staff_members[0].id.toString());
                }
            } catch (error) {
                console.error('Error fetching staff members:', error);
            }
        };
        fetchStaffMembers();
    }, [selectedService, url_backend]);

    // Fetch Available Slots
    useEffect(() => {
        const fetchAvailableSlots = async () => {
            if (selectedStaff) {
                try {
                    const response = await fetch(`${url_backend}/appointment_api/get_available_slots?selected_date=${selectedSlotDate}&staff_member=${selectedStaff}`);
                    if (!response.ok) throw new Error(`Error fetching available slots: ${response.statusText}`);
                    const data = await response.json();
                    setAvailableSlots(
                        Object.entries(data.custom_data.available_slots as Record<string, string[]>).flatMap(([date, slots]) =>
                            slots.map((hour: string) => ({ date, hour }))
                        )
                    );
                } catch (error) {
                    console.error('Error fetching available slots:', error);
                }
            }
        };
        fetchAvailableSlots();
    }, [selectedStaff, selectedSlotDate, url_backend]);

    // Handlers
    const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => setSelectedService(e.target.value);
    const handleStaffChange = (e: React.ChangeEvent<HTMLSelectElement>) => setSelectedStaff(e.target.value);
    const handleCSetAppointmentRequestData = async () => {
        if (!selectedService || !selectedStaff || !selectedDate || !selectedHour) {
            alert("Please select a service, staff member, date, and time.");
            return;
        }
        try {
            setAppointmentData({
                service: selectedService,
                staff: selectedStaff,
                date: selectedDate,
                hour: selectedHour,
            });

        } catch (error) {
            console.error('Error creating appointment request:', error);
        }
    };

    // Group Slots by Date
    const groupedSlots = availableSlots.reduce<Record<string, string[]>>((acc, slot) => {
        if (!acc[slot.date]) acc[slot.date] = [];
        acc[slot.date].push(slot.hour);
        return acc;
    }, {});

    const handleDateClick = (date: string) => {
        setAppointmentDateHours(date);
        setActiveButton(date); // Set active button ID
        setSelectedDate(date);
        setSelectedHour("");
        setActiveHour("");
    };

    const handleHourClick = (hour: string) => {
        setActiveHour(selectedDate + hour);
        setSelectedHour(hour);
        // Properly handle the async function
        handleCSetAppointmentRequestData()
            .then(() => {
                console.log("Appointment data set successfully.");
            })
            .catch((error) => {
                console.error("Error in handleCSetAppointmentRequestData:", error);
            });
        // Additional logic can go here, e.g., calling a parent callback
    };

    const selectedStaffName = staffMembers.find(staff => staff.id.toString() === selectedStaff)?.name;
    const selectedServiceName = services.find(service => service.id.toString() === selectedService)?.name;

// Render Dates
    const renderDates = (groupedSlots: Record<string, string[]>) => {
        return (
            <div>
                <h3>Wolne terminy {selectedServiceName} u {selectedStaffName}:</h3>
                <div className="grid grid-flow-col justify-between">
                    {Object.keys(groupedSlots).map(date => (
                        <div
                            key={date}
                            id={`div-${date}`}
                        >
                            {/* Pass activeButton logic to ButtonD */}
                            <ButtonD
                                value={date}
                                width={8}
                                height={15}
                                onClick={() => handleDateClick(date)}
                                isActive={activeButton === date} // Pass active state
                            />
                        </div>
                    ))}
                </div>
            </div>
        );
    };


    // Render Hours
    const renderHours = (hours: string[]) => {
        return (
            <div className="grid grid-flow-col justify-between py-5">
                {hours.map((hour, index) => (
                    <ButtonH
                        key={index}
                        value={hour}
                        width={12} // Adjust these values as needed
                        height={3} // Adjust these values as needed
                        isActive={activeHour === selectedDate+hour}
                        onClick={() => handleHourClick(hour)}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="w-full">
            <h2 className="align-middle mx-10 font-extrabold">Wypełnij formularz i umów spotkanie</h2>
            <form className="grid grid-cols-1 gap-4">
                <div className="grid grid-cols-2 gap-4">
                    <label className="my-5 mx-10">
                        <div className="mb-2">Usługa:</div>
                        <select value={selectedService} onChange={handleServiceChange} required className="select text-white select-success text-xl w-full bg-bg_2">
                            {services.map(service => (
                                <option key={service.id} value={service.id}>
                                    {service.name}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label className="my-5 mx-10">
                        <div className="mb-2">Psychoterapeutka\a:</div>
                        <select value={selectedStaff} onChange={handleStaffChange} required className="select text-white select-success text-xl w-full bg-bg_2">
                            {staffMembers.map(staff => (
                                <option key={staff.id} value={staff.id}>
                                    {staff.name}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <div className="bg-bg_2 px-10 py-5 text-bg_1 font-extrabold">
                    <div className="btn-group">
                        {Object.keys(groupedSlots).length > 0 ? renderDates(groupedSlots) : <p>Brak wolnych terminów na najbliższe 14 dni.</p>}
                    </div>

                    <p>Wybrana data spotkania: {showAppointmentsDateHours}{selectedHour === "" ? "" : ", godzina - " + selectedHour}</p>
                    {showAppointmentsDateHours && renderHours(groupedSlots[showAppointmentsDateHours])}

                </div>
            </form>
        </div>
    );
};

export default AppointmentRequestForm;
