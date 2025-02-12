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
        <div className="flex w-full mb-5">
            <div className="flex grid-cols-2 space-x-2 p-4 bg-[#58315a] shadow rounded-lg w-[65.6vw] max-w-[870px]">
                    <label
                        htmlFor={type}
                        className="text-m font-kodchasan text-[#96d1ba]  text-3xl w-10"
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
                        relative
                        placeholder-gray-200
                        text-xl text-[#FFFFFF] font-kodchasan
                        max-w-[800px] w-full
                        bg-[#96d1ba] border-[#58315a]
                        ring-2 ring-[bg2]
                        focus:outline-none focus:ring-4 focus:ring-[bg2] focus:border-transparent"
                    />
                </div>
        </div>
    );
};

export default Input;
