import React from "react";

type InputProps = {
    value: string;
    width: number;
    height: number;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    isActive?: boolean; // New prop to track active state
};

const ButtonD: React.FC<InputProps> = ({ value, width, height, onClick, isActive }) => {
    const date = new Date(value);
    const weekday = date.toLocaleDateString("pl-PL", { weekday: "short" }).toUpperCase();
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;

    return (
        <div
            className="flex items-center justify-center w-full my-5"
            style={{ height: `${height}vh` }}
        >
            <div className="indicator items-center relative">
                <div
                    id="bg"
                    className="btn shadow ring-0 relative" // Dynamic background
                    style={{
                        width: `${width}vh`,
                        height: `${height}vh`,
                        borderRadius: `${height / 10}vh`,

                    }}
                />
                <div
                    className="indicator-item indicator-top"
                    style={{
                        marginTop: `${height / 2 * 0.95}vh`,
                        marginRight: `${width * 0.55}vh`,
                    }}
                >
                    <div className="indicator">
                        <button
                            name="submit"
                            value={value}
                            className={`btn font-kodchasan hover:bg-bg_1 hover:text-[#58315a] text-sm input-bordered ring-2 ring-[#58315a] border-[#58315a] ${isActive ? "bg-bg_1 text-[#58315a]" : "bg-[#cfdaedff] text-white"}`}
                            style={{
                                width: `${width}vh`,
                                height: `${height * 0.95}vh`,
                                paddingTop: `${height * 0.6}vh`,
                                borderRadius: `${height / 10}vh`,
                            }}
                            onClick={(e) => {
                                e.preventDefault();
                                if (onClick) onClick(e);
                            }}
                        >
                            {formattedDate}
                        </button>
                    </div>
                    <text
                        className={`indicator-item indicator-center font-kodchasan font-extrabold text-3xl -rotate-90 hover:text-[#58315a] ${isActive ? "text-[#58315a]" : "text-white"}`}
                        style={{
                            marginTop: `${height * 0.65}vh`,
                            pointerEvents: "none",
                            userSelect: "none",
                            textAlign: "center",
                            verticalAlign: "middle",
                        }}
                    >
                        {weekday}
                    </text>
                </div>
            </div>
        </div>
    );
};

export default ButtonD;
