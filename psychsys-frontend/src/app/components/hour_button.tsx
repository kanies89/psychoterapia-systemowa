import React from 'react';
import Clock from  "../../../public/svg/clock.svg";

type InputProps = {
    value: string;
    width: number;
    height: number;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    isActive?: boolean; // New prop to track active state
};

const ButtonH: React.FC<InputProps> = ({ value, width, height, onClick, isActive }) => {

    return (
        <div
            className="flex items-center justify-center w-full my-5"
            style={{ height: `${height}vh` }}
        >
            <div className="indicator items-center relative">
                <div
                    id="bg"
                    className="btn shadow ring-0 relative bg-[#58315a]"
                    style={{
                        width: `${width}vh`,
                        height: `${height}vh`,
                        borderRadius: `${height*0.8}vh`,

                    }}
                />
                <div
                    className="indicator-item indicator-top"
                    style={{
                        marginTop: `${height / 2 * 1.1}vh`,
                        marginRight: `${width * 0.55}vh`,
                    }}
                >
                    <div className="indicator">
                        <button
                            name="submit"
                            value={value}
                            className={`btn font-kodchasan hover:bg-bg_1 text-[#58315a] text-xl input-bordered ring-2 ring-[#58315a] border-[#58315a] ${isActive ? "bg-bg_1" : "bg-[#cfdaedff]"}`}
                            style={{
                                width: `${width}vh`,
                                height: `${height * 0.95}vh`,
                                borderRadius: `${height*0.8}vh`,
                                paddingLeft: `${width * 0.45}vh`,
                            }}
                            onClick={(e) => {
                                e.preventDefault();
                                if (onClick) onClick(e);
                            }}
                        >
                            {value}
                        </button>
                    </div>
                    <div
                        className="indicator-item indicator-center indicator-middle"
                        style={{
                            pointerEvents: "none",
                            userSelect: "none",
                            paddingBottom:`${height * 0.7}vh`,
                            paddingRight: `${width * 0.75}vh`,
                        }}
                    >
                    <Clock className="scale-125" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ButtonH;
