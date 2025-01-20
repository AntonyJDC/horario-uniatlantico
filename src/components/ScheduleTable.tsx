import React from "react";
import { CalendarSubject } from "../types";

interface ScheduleTableProps {
    subjects: CalendarSubject[];
}

const ScheduleTable: React.FC<ScheduleTableProps> = ({ subjects }) => {
    const hours = Array.from({ length: 15 }, (_, i) => {
        const hour = 6 + i;
        return `${hour.toString().padStart(2, "0")}:30 - ${(hour + 1).toString().padStart(2, "0")}:30`;
    });

    const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

    return (
        <table className="min-w-full border-collapse border border-gray-300">
            <thead>
                <tr>
                    <th className="border border-gray-300 px-2 py-2 bg-gray-100"></th>
                    {days.map((day) => (
                        <th key={day} className="border border-gray-300 px-4 py-2 bg-gray-100">
                            {day}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {hours.map((hour, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                        <td className="border border-gray-300 px-4 py-2 text-center">{hour}</td>
                        {days.map((day) => {
                            const subjectsAtTime = subjects.filter((s) => {
                                const subjectHour = parseInt(s.startTime.split(":")[0]);
                                const subjectEndHour = parseInt(s.endTime.split(":")[0]);
                                return s.day === day && subjectHour <= index + 6 && subjectEndHour > index + 6;
                            });

                            return (
                                <td
                                    key={day + index}
                                    className={`border border-gray-300 p-2 ${subjectsAtTime.length > 1 ? "bg-[#DC3545] border-dotted" : ""
                                        }`}
                                >
                                    {subjectsAtTime.length > 0 ? (
                                        subjectsAtTime.map((subject, idx) => (
                                            <div
                                                key={idx}
                                                className={`p-2 mb-1 ${subjectsAtTime.length > 1 ? "bg-[#CD5C5C] border border-dotted border-gray-800" : "bg-transparent"
                                                    } text-left`}
                                            >
                                                <p className="font-bold text-xs uppercase">{subject.name}</p>
                                                <p className="text-xs"> <span className="font-bold">Materia curso:</span> {subject.code}</p>
                                                <p className="text-xs"> <span className="font-bold">Grupo:</span> {subject.group}</p>
                                                <p className="text-xs"> <span className="font-bold">Profesor:</span> {subject.professor} </p>
                                                <p className="text-xs"> <span className="font-bold">Salón:</span> {subject.room}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <span></span>
                                    )}
                                </td>
                            );
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ScheduleTable;
