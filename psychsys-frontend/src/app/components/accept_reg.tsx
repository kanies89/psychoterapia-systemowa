import React, { useState, useRef, FormEvent } from "react";
import SMSCODE from "@/app/components/smscode"
import Input from "@/app/components/normal_input";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import {useAppointment} from "@/app/components/appointment_context";
import moment from "moment";
import Checkbox from "@/app/components/motion_checkbox";
import CheckboxDisabled from "@/app/components/motion_checkbox_disabled";
import {toggleCheckbox} from "@/app/components/motion_checkbox_disabled";

type InputProps = {
    value: string;
};

const REGCheckbox: React.FC<InputProps> = ({ value }) => {
    const modalRef = useRef<HTMLDialogElement | null>(null);
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
    const [isSMSCODEVisible, setIsSMSCODEVisible] = useState(false);
    const [submit, setSubmit] = useState<string | undefined>("");
    const { service, staff, date, hour, setId_request } = useAppointment();
    const time = moment(hour, "HH:mm:ss");

    const { executeRecaptcha } = useGoogleReCaptcha();

    const url_backend = process.env.NEXT_PUBLIC_API_URL;

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
        if (!service || !staff || !date || !hour) {
            if (!service || !staff || !date || !hour) {
                alert(`Please select a service, staff member, date, and time. 
                selectedService: ${service},
                selectedStaff: ${staff},
                selectedDate: ${date},
                selectedHour: ${hour}`);
                return;
            }
        }

        try {
            // Fetch the service duration
            const durationResponse = await fetch(`${url_backend}/appointment_api/get_service_duration/?service_id=${service}`);

            if (!durationResponse.ok) throw new Error(`Error fetching service duration: ${durationResponse.statusText}`);

            const durationData = await durationResponse.json();
            const serviceDuration = durationData.duration; // Extract the duration

            console.log("Service Duration:", serviceDuration);

            const end_time = time.add(serviceDuration, "minutes").format("HH:mm:ss");

            // Now send the verification code and create the appointment
            const response = await fetch(`${url_backend}/appointment_api/send_verification_code/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    service: service,
                    staff_member: staff,
                    date: date,
                    start_time: hour,
                    end_time: end_time,
                    phone: formData.phone,
                    first_name: formData.name,
                    last_name: formData.surname,
                    email: formData.email,
                }),
            });

            if (!response.ok) throw new Error(`Error creating appointment request: ${response.statusText}`);

            const data = await response.json();
            setId_request(data.id_request); //id_request or appointment_request_id

            console.log('Appointment Request Created Successfully:', data);
        } catch (error) {
            console.error('Error:', error);
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
                setIsSMSCODEVisible(true);
                setSubmit("Recaptcha Verified and Form Submitted");
                // Toggle the checkbox
                toggleCheckbox()
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
        <div className="grid grid-cols-1 mb-10">
                <label className="w-full">
                    <Input
                        type="text"
                        text="1"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Podaj swoje imię"
                    />
                </label>
                <label className="w-full">
                    <Input
                        type="text"
                        text="2"
                        name="surname"
                        value={formData.surname}
                        onChange={handleInputChange}
                        placeholder="Nazwisko"
                    />
                </label>
                <label className="w-full">
                    <Input
                        type="email"
                        text="3"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="adres email"
                    />
                </label>
                <label className="w-full">
                    <Input
                        type="tel"
                        text="4"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Telefon w celu potwierdzenia wizyty"
                    />
                </label>

            <div className="flex jus mx-10 mb-10">

                <CheckboxDisabled size={80} className="flex-none"/>

                <button
                    onClick={handleButtonClick}
                    className="flex-1 button font-kodchasan text-[#96d1ba]
                    bg-[#58315a] hover:bg-bg_1 hover:text-black rounded-lg p-5 text-2xl z-50"
                >
                    Akceptuję warunki regulaminu i RODO
                </button>
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
                            <span className="label-text text-2xl">
                                Akceptuję regulamin i warunki RODO
                            </span>
                            <div className="m-10">
                                <Checkbox onChange={handleCheckboxChange} size={50}/>
                            </div>
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


            {isSMSCODEVisible && (
                <div className="flex flex-col items-center justify-center w-full mb-5 space-y-4 mt-5">
                    <SMSCODE/>
                </div>
            )}
        </div>
    );
};

export default REGCheckbox;
