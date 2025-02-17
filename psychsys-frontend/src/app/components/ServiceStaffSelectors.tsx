import React from 'react';
import { motion } from 'framer-motion';

interface Service {
    id: number;
    name: string;
}

interface StaffMember {
    id: number;
    name: string;
}

interface Props {
    services: Service[];
    staffMembers: StaffMember[];
    selectedService: string;
    selectedStaff: string;
    onServiceChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onStaffChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const ServiceStaffSelector: React.FC<Props> = ({
                                                   services,
                                                   staffMembers,
                                                   selectedService,
                                                   selectedStaff,
                                                   onServiceChange,
                                                   onStaffChange
                                               }) => {
    return (
        <motion.div
            className="grid grid-cols-1 gap-4"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
        >
            <motion.label className="my-5" variants={fadeInUp}>
                <div className="mb-2 text-lg font-semibold">Usługa:</div>
                <motion.select
                    value={selectedService}
                    onChange={onServiceChange}
                    required
                    className="select text-white select-success text-xl w-full
                    bg-bg_2 p-2 rounded-lg shadow-lg focus:ring focus:ring-[#58315A]
                    focus:border-bg_2 transition-all"
                    whileFocus={{ scale: 1.05 }}
                >
                    {services.map(service => (
                        <option key={service.id} value={service.id} className="border-bg_2">
                            {service.name}
                        </option>
                    ))}
                </motion.select>
            </motion.label>

            <motion.label className="my-5" variants={fadeInUp}>
                <div className="mb-2 text-lg font-semibold">Psychoterapeutka/a:</div>
                <motion.select
                    value={selectedStaff}
                    onChange={onStaffChange}
                    required
                    className="select text-white select-success text-xl w-full
                    bg-bg_2 p-2 rounded-lg shadow-lg focus:ring focus:ring-[#58315A]
                    focus:border-bg_2 transition-all"
                    whileFocus={{ scale: 1.05 }}
                >
                    {staffMembers.map(staff => (
                        <option key={staff.id} value={staff.id}>
                            {staff.name}
                        </option>
                    ))}
                </motion.select>
            </motion.label>
        </motion.div>
    );
};

export default ServiceStaffSelector;
