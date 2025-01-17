import React from 'react';

interface SectionDividerProps {
    id: string;
}

const SectionDivider: React.FC<SectionDividerProps> = ({ id }) => {
    return (
        <div id={id} className="w-full flex justify-center items-center mt-10 mb-10">
            <div>
                <div className="badge badge-accent bg-c1 w-20 border-0 rounded-badge shadow-s1"></div>
            </div>
        </div>
    );
};

export default SectionDivider;
