import React, { useState, useEffect } from "react";
import ScheduleTable from "../components/ScheduleTable";
import SubjectList from "../components/SubjectList";
import SubjectDialog from "../components/SubjectDialog";
import { Subject, CalendarSubject } from "../types";
import { Button } from "../components/ui/button";

const Home: React.FC = () => {
    const [selectedSubjects, setSelectedSubjects] = useState<{
        subject: Subject;
        isActive: boolean;
        activeGroups: Record<string, number>;
        activeTeachers: string[];
    }[]>([]);

    const [calendarSubjects, setCalendarSubjects] = useState<CalendarSubject[]>([]);
    const [activeSubjectInfo, setActiveSubjectInfo] = useState<
        Record<string, { professor: string; group: number }>
    >({});

    const [isDialogOpen, setDialogOpen] = useState(false);

    const [subjects] = useState<Subject[]>([
        {
            code: "ECA0030",
            name: "Diversidad Cultural Caribe Col",
            semester: "2025-1",
            teachers: [
                {
                    professor: "ALARCON PUENTES JOHNNY ALBERTO",
                    groups: [
                        {
                            number: 41,
                            schedule: [{ day: "Miércoles", startTime: "12:00", endTime: "14:00" }],
                            room: "12A",
                        },
                        {
                            number: 42,
                            schedule: [{ day: "Viernes", startTime: "12:00", endTime: "14:00" }],
                            room: "14B",
                        },
                        {
                            number: 43,
                            schedule: [{ day: "Lunes", startTime: "12:00", endTime: "14:00" }],
                            room: "14B",
                        },
                    ],
                },
                {
                    professor: "ALARCON PUENTES JEN ALBERTO",
                    groups: [
                        {
                            number: 41,
                            schedule: [{ day: "Miércoles", startTime: "12:00", endTime: "14:00" }],
                            room: "12A",
                        },
                        {
                            number: 42,
                            schedule: [{ day: "Viernes", startTime: "12:00", endTime: "14:00" }],
                            room: "14B",
                        },
                    ],
                },
            ],
        },
        {
            code: "MAT0020",
            name: "Cálculo Diferencial",
            semester: "2025-1",
            teachers: [
                {
                    professor: "JUAN PÉREZ",
                    groups: [
                        {
                            number: 101,
                            schedule: [{ day: "Miércoles", startTime: "12:00", endTime: "14:00" }], // Conflicto con "Diversidad Cultural Caribe Col"
                            room: "20C",
                        },
                        {
                            number: 102,
                            schedule: [{ day: "Jueves", startTime: "08:00", endTime: "10:00" }],
                            room: "21D",
                        },
                    ],
                },
            ],
        },
        {
            code: "FIS0030",
            name: "Física Mecánica",
            semester: "2025-1",
            teachers: [
                {
                    professor: "MARÍA GÓMEZ",
                    groups: [
                        {
                            number: 301,
                            schedule: [{ day: "Lunes", startTime: "10:00", endTime: "12:00" }],
                            room: "11B",
                        },
                        {
                            number: 302,
                            schedule: [{ day: "Martes", startTime: "14:00", endTime: "16:00" }],
                            room: "15C",
                        },
                    ],
                },
            ],
        },
        {
            code: "QUI0040",
            name: "Química General",
            semester: "2025-1",
            teachers: [
                {
                    professor: "LUIS MARTÍNEZ",
                    groups: [
                        {
                            number: 501,
                            schedule: [{ day: "Lunes", startTime: "10:00", endTime: "12:00" }], // Conflicto con "Física Mecánica"
                            room: "22A",
                        },
                        {
                            number: 502,
                            schedule: [{ day: "Miércoles", startTime: "14:00", endTime: "16:00" }],
                            room: "18B",
                        },
                        {
                            number: 503,
                            schedule: [{ day: "Viernes", startTime: "14:00", endTime: "16:00" }],
                            room: "18B",
                        },
                    ],
                },
            ],
        },
        {
            code: "PROG0050",
            name: "Programación Avanzada",
            semester: "2025-1",
            teachers: [
                {
                    professor: "CARLOS RODRÍGUEZ",
                    groups: [
                        {
                            number: 601,
                            schedule: [{ day: "Viernes", startTime: "08:00", endTime: "10:00" }],
                            room: "30D",
                        },
                        {
                            number: 602,
                            schedule: [{ day: "Martes", startTime: "16:00", endTime: "18:00" }],
                            room: "35E",
                        },
                    ],
                },
                {
                    professor: "CARLOS RODRÍGUEZ A",
                    groups: [
                        {
                            number: 603,
                            schedule: [{ day: "Martes", startTime: "16:00", endTime: "18:00" }], // Conflicto con el mismo docente
                            room: "35E",
                        },
                    ],
                },
            ],
        },
        {
            code: "RED0060",
            name: "Redes de Computadores",
            semester: "2025-1",
            teachers: [
                {
                    professor: "ANA FERNÁNDEZ",
                    groups: [
                        {
                            number: 701,
                            schedule: [{ day: "Jueves", startTime: "10:00", endTime: "12:00" }],
                            room: "42A",
                        },
                        {
                            number: 702,
                            schedule: [{ day: "Viernes", startTime: "14:00", endTime: "16:00" }],
                            room: "43B",
                        },
                    ],
                },
            ],
        },
    ]);


    useEffect(() => {
    const newCalendarSubjects: CalendarSubject[] = [];
    const newActiveSubjectInfo: Record<string, { professor: string; group: number }> = {};

    selectedSubjects.forEach(({ subject, isActive, activeGroups, activeTeachers }) => {
        if (isActive && activeTeachers.length > 0) {
            const lastActiveProfessor = activeTeachers[activeTeachers.length - 1];
            const teacher = subject.teachers.find((t) => t.professor === lastActiveProfessor);

            if (teacher) {
                const groupNumber = activeGroups[lastActiveProfessor] || teacher.groups[0].number;
                const group = teacher.groups.find((g) => g.number === groupNumber);

                if (group) {
                    group.schedule.forEach((schedule) => {
                        newCalendarSubjects.push({
                            code: subject.code,
                            name: subject.name,
                            day: schedule.day,
                            startTime: schedule.startTime,
                            endTime: schedule.endTime,
                            professor: lastActiveProfessor,
                            room: group.room,
                            group: group.number,
                        });
                    });

                    newActiveSubjectInfo[subject.code] = {
                        professor: lastActiveProfessor,
                        group: groupNumber,
                    };
                }
            }
        }
    });

    setCalendarSubjects(newCalendarSubjects);
    setActiveSubjectInfo(newActiveSubjectInfo);  // Ensure this line exists
}, [selectedSubjects]);



    const handleToggleSubject = (subject: Subject, isActive: boolean) => {
        setSelectedSubjects((prev) => {
            if (isActive) {
                if (!prev.some((s) => s.subject.code === subject.code)) {
                    const initialActiveGroups: Record<string, number> = {};
                    subject.teachers.forEach((teacher) => {
                        initialActiveGroups[teacher.professor] = teacher.groups[0].number;
                    });

                    return [...prev, { subject, isActive: true, activeGroups: initialActiveGroups, activeTeachers: [] }];
                }
            } else {
                return prev.filter((s) => s.subject.code !== subject.code);
            }
            return prev;
        });
    };

    const toggleProfessor = (subjectCode: string, professor: string, isActive: boolean) => {
        setSelectedSubjects((prev) =>
            prev.map((s) => {
                if (s.subject.code === subjectCode) {
                    const updatedTeachers = isActive
                        ? [...s.activeTeachers, professor]
                        : s.activeTeachers.filter((t) => t !== professor);

                    return { ...s, activeTeachers: updatedTeachers };
                }
                return s;
            })
        );
    };

    const changeGroup = (subjectCode: string, professor: string, direction: "next" | "prev") => {
        setSelectedSubjects((prev) =>
            prev.map((s) => {
                if (s.subject.code === subjectCode) {
                    const teacher = s.subject.teachers.find((t) => t.professor === professor);
                    if (teacher) {
                        const currentIndex = teacher.groups.findIndex((g) => g.number === s.activeGroups[professor]);
                        const nextIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;

                        if (nextIndex >= 0 && nextIndex < teacher.groups.length) {
                            return {
                                ...s,
                                activeGroups: {
                                    ...s.activeGroups,
                                    [professor]: teacher.groups[nextIndex].number,
                                },
                            };
                        }
                    }
                }
                return s;
            })
        );
    };

    const toggleSubject = (subjectCode: string, isActive: boolean) => {
        setSelectedSubjects((prev) =>
            prev.map((s) => (s.subject.code === subjectCode ? { ...s, isActive } : s))
        );
    };


    return (
        <div className="mx-16 my-8">
            <h1 className="text-2xl font-bold mb-4">Gestión de Horarios</h1>

            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-4 bg-gray-100 rounded-lg p-4 shadow-md">
                    <h2 className="text-lg font-semibold mb-4">Materias seleccionadas</h2>
                    <SubjectList
                        selectedSubjects={selectedSubjects}
                        toggleSubject={toggleSubject}
                        toggleProfessor={toggleProfessor}
                        changeGroup={changeGroup}
                        activeSubjectInfo={activeSubjectInfo}
                    />
                    <Button className="w-full mt-4" onClick={() => setDialogOpen(true)}>
                        Añadir Materias
                    </Button>
                </div>

                <div className="col-span-8">
                    <ScheduleTable subjects={calendarSubjects} />
                </div>
            </div>

            <SubjectDialog
                isOpen={isDialogOpen}
                setIsOpen={setDialogOpen}
                subjects={subjects}
                selectedSubjects={selectedSubjects.map((s) => s.subject)}
                handleToggleSubject={handleToggleSubject}
            />
        </div>
    );
};

export default Home;
