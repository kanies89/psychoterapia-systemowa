import React from 'react';
import ButtonN from "@/app/components/normal_button";


function SMSCODE() {
    return (
        <div className="container mx-auto">
            {/* SMS Confirmation Section */}
            <div>
                <p className="py-4 w-full text-center">
                    Na podany numer telefonu wysłaliśmy kod w celu potwierdzenia wizyty.<br/>Wpisz poniżej i
                    potwierdź.</p>
                <div className="flex items-center justify-center w-full mb-5">
                    <div
                        className="indicator flex items-center space-x-2 p-4 bg-[#58315a] shadow rounded-lg relative w-[52vh]">
                        <div className="">
                            <label
                                htmlFor={'KOD SMS'}
                                className="text-m font-kodchasan text-[#96d1ba] mt-2 mb-0 ml-2"
                            >
                                {"Kod SMS:"}
                            </label>
                            <div className="indicator-item indicator-top mr-[35.5vh]">
                                <input
                                    type="text"
                                    name="smsCode"
                                    placeholder="Powierdź 5-cyfrowym kodem sms"
                                    className="input absolute placeholder-gray-200 input-bordered font-kodchasan w-[35vh] text-[#FFFFFF] bg-[#96d1ba] border-[#58315a] focus:outline-none ring-2 ring-[#58315a] focus:ring-4 focus:ring-[#58315a] focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ButtonN type="submit" value="Umów wizytę"></ButtonN>
        </div>
    );
}

export default SMSCODE;