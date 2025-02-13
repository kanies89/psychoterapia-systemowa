import React, { useState } from "react";
import ButtonN from "@/app/components/normal_button";
import { useAppointment } from "@/app/components/appointment_context";

function SMSCODE() {
    const { service, staff, date, hour, end_time, phone, first_name, last_name, email, id_request } = useAppointment();
    const [code, setCode] = useState<string | null>(null);
    const url_backend = process.env.NEXT_PUBLIC_API_URL;


    const handleConfirmAppointment = async () => {
        if (!code) {
            alert("Please enter the SMS code.");
            return;
        }

        try {
            const response = await fetch(`${url_backend}/appointment_api/confirm_verification_code/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id_request: id_request,
                    code: code,
                    phone: phone,
                    email: email,
                }),
            });

            if (response.ok) {
                alert("Appointment confirmed!");
            } else {
                alert("Error confirming appointment.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong!");
        }
    };

    return (
        <div className="container mx-auto">
            <div>
                <p className="py-4 w-full text-center">
                    Na podany numer telefonu wysłaliśmy kod w celu potwierdzenia wizyty.<br />
                    Wpisz poniżej i potwierdź.
                </p>
                <div className="flex items-center justify-center w-full mb-5">
                    <div className="indicator flex items-center space-x-2 p-4 bg-[#58315a] shadow rounded-lg relative w-[52vh]">
                        <div>
                            <label htmlFor="smsCode" className="text-m font-kodchasan text-[#96d1ba] mt-2 mb-0 ml-2">
                                Kod SMS:
                            </label>
                            <div className="indicator-item indicator-top mr-[35.5vh]">
                                <input
                                    type="text"
                                    name="smsCode"
                                    value={code || ""}
                                    onChange={(e) => setCode(e.target.value)}
                                    placeholder="Potwierdź 5-cyfrowym kodem SMS"
                                    className="input absolute placeholder-gray-200 input-bordered font-kodchasan w-[35vh] text-[#FFFFFF] bg-[#96d1ba] border-[#58315a] focus:outline-none ring-2 ring-[#58315a] focus:ring-4 focus:ring-[#58315a] focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ButtonN type="button" value="Umów wizytę" onClick={handleConfirmAppointment} />
        </div>
    );
}

export default SMSCODE;
