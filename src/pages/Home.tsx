import React, { useState, useEffect } from "react";
import ScheduleTable from "../components/ScheduleTable";
import SubjectList from "../components/SubjectList";
import SubjectDialog from "../components/SubjectDialog";
import { Subject, CalendarSubject } from "../types";
import { Button } from "../components/ui/button";
import { Plus, Download } from "lucide-react";
import subjectsData from "../data/subjects.json";

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

    const subjects: Subject[] = subjectsData.semesters.flatMap((semester) => semester.subjects);

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
        setActiveSubjectInfo(newActiveSubjectInfo);
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
        <div className="mx-4 md:mx-16 my-8">
            <div id="info" className="flex flex-col lg:flex-row justify-between items-center text-center mb-8">
                <img
                    src="https://www.uniatlantico.edu.co/wp-content/uploads/2023/01/Universidad-del-Atlántico-e1672809639550-300x127.png"
                    alt="Universidad del Atlántico"
                    className="h-16 md:h-20 mb-4 md:mb-0"
                />
                <h1 className="text-2xl md:text-3xl font-bold leading-tight">
                    Horario de clases para <br className="hidden md:block" />
                    Licenciatura en Educación Infantil
                </h1>
                <p className="text-base md:text-lg text-gray-500">Semestre 2025-1</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-4 lg:gap-x-4">
                <div id="selectors" className="col-span-1 md:col-span-4 lg:col-span-4 2xl:col-span-3 bg-gray-100 rounded-lg p-4 shadow-md">
                    <div className="flex flex-col xl:flex-row justify-between items-center">
                        <Button className="w-full xl:w-auto m-2" onClick={() => setDialogOpen(true)}>
                            <Plus size={20} className="mr-2" />
                            Añadir Materias
                        </Button>
                        <Button
                            className="w-full xl:w-auto m-2"
                            onClick={() => window.print()}
                        >
                            <Download size={20} className="mr-2" />
                            Descargar
                        </Button>

                    </div>

                    <SubjectList
                        selectedSubjects={selectedSubjects}
                        toggleSubject={toggleSubject}
                        toggleProfessor={toggleProfessor}
                        changeGroup={changeGroup}
                        activeSubjectInfo={activeSubjectInfo}
                    />
                </div>

                <div id="table" className="col-span-1 md:col-span-2 lg:col-span-8 2xl:col-span-9 overflow-x-auto">
                    <ScheduleTable subjects={calendarSubjects} />
                </div>
            </div>

            <SubjectDialog
                aria-label="Selecciona tus materias"
                
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
