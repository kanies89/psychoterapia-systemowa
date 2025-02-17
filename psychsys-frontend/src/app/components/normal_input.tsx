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

            <div className="flex bg-[#58315a] mb-5 mx-10 p-1 shadow rounded-lg">
                    <label
                        htmlFor={type}
                        className="flex-none mx-5 text-m w-10 font-kodchasan text-[#96d1ba] text-3xl"
                    >
                        {text}
                    </label>
                    <input
                        type={type}
                        id={type}
                        name={name}
                        value={value}
                        placeholder={placeholder}
                        onChange={onChange} // Pass onChange to the input
                        className="
                        input input-bordered
                        placeholder-gray-200
                        flex-1
                        min-w-5
                        text-xl text-[#FFFFFF] font-kodchasan
                        bg-[#96d1ba] border-[#58315a]
                        ring-2 ring-[bg2]
                        focus:outline-none focus:ring-4 focus:ring-[bg2] focus:border-transparent"
                    />
                </div>

    );
};

export default Input;
