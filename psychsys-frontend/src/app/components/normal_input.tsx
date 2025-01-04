import React from "react";

type InputProps = {
    type: string;
    name: string;
    text: string;
    value: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Add onChange prop
};

const Input: React.FC<InputProps> = ({ type, name, text, value, placeholder, onChange }) => {
    return (
        <div className="flex items-center justify-center w-full mb-5">
            <div className="indicator flex items-center space-x-2 p-4 bg-[#58315a] shadow rounded-lg relative w-[52vh]">
                <div className="">
                    <label
                        htmlFor={type}
                        className="text-m font-kodchasan text-[#96d1ba] mt-2 mb-0 ml-2"
                    >
                        {text}
                    </label>
                    <div className="indicator-item indicator-top mr-[35.5vh]">
                        <input
                            type={type}
                            id={type}
                            name={name}
                            value={value}
                            placeholder={placeholder}
                            onChange={onChange} // Pass onChange to the input
                            className="input absolute placeholder-gray-200 input-bordered font-kodchasan w-[35vh] text-[#FFFFFF] bg-[#96d1ba] border-[#58315a] focus:outline-none ring-2 ring-[#58315a] focus:ring-4 focus:ring-[#58315a] focus:border-transparent"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Input;
