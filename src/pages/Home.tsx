import React, { useState, useEffect } from "react";
import ScheduleTable from "../components/ScheduleTable";
import SubjectList from "../components/SubjectList";
import SubjectDialog from "../components/SubjectDialog";
import { Subject, CalendarSubject } from "../types";
import { Button } from "../components/ui/button";

const Home: React.FC = () => {
    const [selectedSubjects, setSelectedSubjects] = useState<
        {
            subject: Subject;
            isActive: boolean;
            activeGroups: Record<string, number>;
            activeTeachers: string[];
        }[]
    >([]);
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
                    groupNumber1: {
                        schedule: [
                            { day: "Miércoles", startTime: "12:00", endTime: "14:00" },
                        ],
                        room: "12A",
                    },
                    groupNumber2: {
                        schedule: [
                            { day: "Viernes", startTime: "12:00", endTime: "14:00" },
                        ],
                        room: "14B",
                    },
                },
                {
                    professor: "ANTONY JUNIOR",
                    groupNumber1: {
                        schedule: [
                            { day: "Jueves", startTime: "12:00", endTime: "14:00" },
                        ],
                        room: "12A",
                    },
                },
            ],
        },
        {
            code: "IDS0030",
            name: "Programación Móvil",
            semester: "2025-1",
            teachers: [
                {
                    professor: "JUAN PÉREZ",
                    groupNumber1: {
                        schedule: [
                            { day: "Miércoles", startTime: "12:00", endTime: "14:00" }, // Conflicto con Diversidad Cultural Caribe Col
                        ],
                        room: "15B",
                    },
                },
            ],
        },
        {
            code: "MAT0010",
            name: "Matemáticas Avanzadas",
            semester: "2025-1",
            teachers: [
                {
                    professor: "MARÍA GÓMEZ",
                    groupNumber1: {
                        schedule: [
                            { day: "Miércoles", startTime: "12:00", endTime: "14:00" }, // Conflicto con Diversidad Cultural Caribe Col y Programación Móvil
                        ],
                        room: "18C",
                    },
                },
            ],
        },
    ]);

    // Actualiza el calendario cuando cambia el estado de selectedSubjects
    useEffect(() => {
        const newCalendarSubjects: CalendarSubject[] = [];
        const newActiveSubjectInfo: Record<string, { professor: string; group: number }> = {};

        selectedSubjects.forEach(({ subject, isActive, activeGroups, activeTeachers }) => {
            if (isActive && activeTeachers.length > 0) {
                // Obtener el último profesor activo de la lista
                const lastActiveProfessor = activeTeachers[activeTeachers.length - 1];
                const teacher = subject.teachers.find((t) => t.professor === lastActiveProfessor);

                if (teacher) {
                    const groupNumber = activeGroups[lastActiveProfessor];
                    const group = groupNumber === 1 ? teacher.groupNumber1 : teacher.groupNumber2;

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
                                group: groupNumber,
                            });
                        });

                        // Agregar información de la materia activa
                        newActiveSubjectInfo[subject.code] = {
                            professor: lastActiveProfessor,
                            group: groupNumber,
                        };
                    }
                }
            }
        });

        setCalendarSubjects(newCalendarSubjects);
        setActiveSubjectInfo(newActiveSubjectInfo);
    }, [selectedSubjects]);

    const handleToggleSubject = (subject: Subject, isActive: boolean) => {
        setSelectedSubjects((prev) => {
            if (isActive) {
                // Añadir materia si no está en la lista
                if (!prev.some((s) => s.subject.code === subject.code)) {
                    const initialActiveGroups: Record<string, number> = {};
                    subject.teachers.forEach((teacher) => {
                        initialActiveGroups[teacher.professor] = 1; // Grupo 1 por defecto
                    });

                    return [...prev, { subject, isActive: true, activeGroups: initialActiveGroups, activeTeachers: [] }];
                }
            } else {
                // Remover materia si se desactiva el switch
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

                    if (isActive) {
                        s.activeGroups[professor] = 1; // Grupo 1 por defecto
                    }

                    return { ...s, activeTeachers: updatedTeachers };
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

    const changeGroup = (subjectCode: string, professor: string, direction: "next" | "prev") => {
        setSelectedSubjects((prev) =>
            prev.map((s) => {
                if (s.subject.code === subjectCode) {
                    const currentGroup = s.activeGroups[professor];
                    const nextGroup = direction === "next" ? currentGroup + 1 : currentGroup - 1;
                    const maxGroups = s.subject.teachers.find((t) => t.professor === professor)
                        ?.groupNumber2
                        ? 2
                        : 1;

                    if (nextGroup >= 1 && nextGroup <= maxGroups) {
                        return {
                            ...s,
                            activeGroups: {
                                ...s.activeGroups,
                                [professor]: nextGroup,
                            },
                        };
                    }
                }
                return s;
            })
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
                        activeSubjectInfo={activeSubjectInfo} />
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
