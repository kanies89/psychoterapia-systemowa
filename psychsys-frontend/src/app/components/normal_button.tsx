import React from "react";

type InputProps = {
    type: string;
    value: string;
    onClick?: () => void; // Optional onClick function
};

const ButtonN: React.FC<InputProps> = ({ type, value, onClick = () => {} }) => {
    return (
        <div className="flex items-center justify-center w-full mb-5">
            <div className="indicator flex items-center space-x-2 p-4 bg-[#58315a] shadow rounded-lg relative w-[52vh]">
                <div>
                    <label
                        htmlFor={type}
                        className="text-m font-kodchasan text-[#96d1ba] mt-2 mb-0 ml-2"
                    >
                    </label>
                    <div className="indicator-item indicator-top mr-[26.5vh] mt-6">
                        <input
                            type={type}
                            value={value}
                            onClick={onClick} // Apply optional onClick
                            className="btn font-kodchasan w-[52vh] hover:bg-bg_1 hover:text-black bg-bg_2
                            text-xl text-white input-bordered ring-2 ring-[#58315a] border-[#58315a]"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ButtonN;
