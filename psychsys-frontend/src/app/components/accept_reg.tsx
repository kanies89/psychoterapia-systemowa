import React, { useState, useRef, FormEvent } from "react";
import SMSCODE from "@/app/components/smscode"
import Input from "@/app/components/normal_input";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useAppointment } from "@/app/components/appointment_context";

type InputProps = {
    value: string;
};

const REGCheckbox: React.FC<InputProps> = ({ value }) => {
    const [isChecked, setIsChecked] = useState(false);
    const modalRef = useRef<HTMLDialogElement | null>(null);
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
    const [isSMSCODEVisible, setIsSMSCODEVisible] = useState(false);
    const [submit, setSubmit] = useState<string | undefined>("");
    const { executeRecaptcha } = useGoogleReCaptcha();
    const { appointmentData, setAppointmentData } = useAppointment();
    const url_backend = process.env.NEXT_PUBLIC_API_URL;
    const [appointmentRequestId, setAppointmentRequestId] = useState<string | null>(null); // State for storing the appointment_request_id

    // States to track external input values
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        email: "",
        phone: "",
    });

    const handleButtonClick = () => {
        if (modalRef.current) {
            modalRef.current.showModal();
        }
    };

    const handleModalClose = () => {
        if (modalRef.current) modalRef.current.close();
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsCheckboxChecked(event.target.checked);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleConfirmAppointment = async () => {
        const { selectedService, selectedStaff, selectedDate, selectedHour } = appointmentData;

        if (!selectedService || !selectedStaff || !selectedDate || !selectedHour) {
            if (!selectedService || !selectedStaff || !selectedDate || !selectedHour) {
                alert(`Please select a service, staff member, date, and time. 
                selectedService: ${selectedService},
                selectedStaff: ${selectedStaff},
                selectedDate: ${selectedDate},
                selectedHour: ${selectedHour}`);
                return;
            }
        }

        try {
            const response = await fetch(`${url_backend}/appointment_api/send_verification_code/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    service_id: selectedService,
                    staff_id: selectedStaff,
                    date: selectedDate,
                    time: selectedHour,
                    phone: formData.phone,
                    first_name: formData.name,
                    last_name: formData.surname,
                    email: formData.email
                }),
            });

            if (!response.ok) throw new Error(`Error creating appointment request: ${response.statusText}`);
            const data = await response.json();

            setAppointmentRequestId(data.appointment_request_id);
        } catch (error) {
            console.error('Error creating appointment request:', error);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setSubmit("");

        if (!executeRecaptcha) {
            console.warn("Recaptcha is unavailable.");
            setSubmit("Recaptcha is unavailable. Please try again later.");
            return;
        }

        try {
            const gRecaptchaToken = await executeRecaptcha("inquirySubmit");

            console.log("gRecaptchaToken", `${gRecaptchaToken}`);
            console.log("Submitting to URL:", `${process.env.NEXT_PUBLIC_API_URL}/create_assessment/`);

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/create_assessment/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    "g-recaptcha-response": gRecaptchaToken,
                    ...formData, // Include external input values
                }),
            });

            if (!response.ok) {
                console.error("Unexpected response:", response.status, response.statusText);
                setSubmit("Unexpected response from server. " + response.statusText);
                return;
            }

            const data = await response.json();

            if (data.success) {
                console.log(`Success with message: ${data.message}`);
                setIsChecked(true);
                setIsSMSCODEVisible(true);
                setSubmit("Recaptcha Verified and Form Submitted");
                handleConfirmAppointment()
                    .then(() => {
                        console.log("Confirmation data sent.");
                    })
                    .catch((error) => {
                        console.error("Error in handleConfirmAppointment:", error);
                    });
            } else {
                console.warn(`Failure with message: ${data.message}`);
                setSubmit(data.message || "Failed to verify reCAPTCHA! You must be a robot!");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setSubmit("Error occurred while submitting the form.");
        }
    };

    return (
        <div className="grid grid-rows-1">
            {/* Inputs rendered outside the form */}
            <div className="mb-4">
                <label>
                    <Input
                        type="text"
                        text="Imię"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Podaj swoje imię"
                    />
                </label>
                <label>
                    <Input
                        type="text"
                        text="Nazwisko"
                        name="surname"
                        value={formData.surname}
                        onChange={handleInputChange}
                        placeholder="Nazwisko"
                    />
                </label>
                <label>
                    <Input
                        type="email"
                        text="Email:"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="adres email"
                    />
                </label>
                <label>
                    <Input
                        type="tel"
                        text="Telefon:"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Telefon w celu potwierdzenia wizyty"
                    />
                </label>
            </div>

            <div className="flex items-center justify-center w-full mb-5">
                <button
                    onClick={handleButtonClick}
                    className="text-m font-kodchasan text-[#96d1ba] ring-[#58315a] ring-2 hover:ring-bg_1 rounded-lg text-2xl mt-2 mb-0 ml-2 mx-5 p-5 w-[30vh]"
                >
                    Akceptuję warunki regulaminu i RODO
                </button>

                <div className="indicator flex items-center p-4 bg-[#58315a] shadow rounded-lg relative h-[5.5vh] w-[5.5vh]">
                    <div className="indicator-item flex indicator-top mr-[3.25vh] mt-4">
                        <input
                            type="checkbox"
                            checked={isChecked}
                            className="checkbox pointer-events-none checked:bg-bg_1 focus:bg-bg_1 focus:ring-[#58315a] focus:ring-2 focus:border-0 bg-bg_2 ring-2 ring-[#58315a] h-[5.5vh] w-[5.5vh]"
                            id="AT&C"
                            aria-label="Accept Terms and Conditions"
                        />
                    </div>
                </div>

                <dialog ref={modalRef} id={value} className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                            <button
                                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                onClick={handleModalClose}
                            >
                                ✕
                            </button>
                        </form>

                        <h3 className="font-bold text-lg">Regulamin i RODO</h3>
                        <p className="py-4">Zaakceptuj regulamin</p>

                        <div className="form-control">
                            <label className="cursor-pointer label">
                                <span className="label-text">
                                    Akceptuję regulamin i warunki RODO
                                </span>
                                <input
                                    type="checkbox"
                                    onChange={handleCheckboxChange}
                                    className="checkbox checkbox-success"
                                />
                            </label>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="submit"
                                value="Wyślij kod SMS"
                                className="btn font-kodchasan w-full hover:bg-bg_1 hover:text-black bg-bg_2 text-xs text-white"
                                disabled={!isCheckboxChecked}
                            />
                        </form>
                        {submit && <p className="text-lg text-center">{submit}</p>}
                    </div>
                </dialog>
            </div>

            {isSMSCODEVisible && (
                <div className="flex flex-col items-center justify-center w-full mb-5 space-y-4 mt-5">
                    <SMSCODE />
                </div>
            )}
        </div>
    );
};

export default REGCheckbox;
