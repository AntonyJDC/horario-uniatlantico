import React from "react";
import { Switch } from "./ui/switch";
import { Subject } from "../types";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SubjectListProps {
    selectedSubjects: {
        subject: Subject;
        isActive: boolean;
        activeGroups: Record<string, number>;
        activeTeachers: string[];
    }[];
    activeSubjectInfo: Record<string, { professor: string; group: number }>;
    toggleSubject: (subjectCode: string, isActive: boolean) => void;
    toggleProfessor: (subjectCode: string, professor: string, isActive: boolean) => void;
    changeGroup: (subjectCode: string, professor: string, direction: "next" | "prev") => void;
}

const SubjectList: React.FC<SubjectListProps> = ({
    selectedSubjects,
    activeSubjectInfo,
    toggleSubject,
    toggleProfessor,
    changeGroup,
}) => {
    return (
        <ul className="space-y-4">
            {selectedSubjects.map(({ subject, isActive, activeGroups, activeTeachers }) => {
                // Verifica si la materia está activa en el calendario
                const activeInfo = activeSubjectInfo[subject.code];

                // Obtener el último profesor activo
                const lastActiveProfessor =
                    activeTeachers.length > 0 ? activeTeachers[activeTeachers.length - 1] : null;

                return (
                    <li key={subject.code} className="border-b border-gray-300 p-2">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 mb-2">
                                <Switch
                                    checked={isActive}
                                    onCheckedChange={(checked) => toggleSubject(subject.code, checked)}
                                />
                                <p className="font-bold text-sm">{subject.name}</p>
                            </div>
                            {isActive && lastActiveProfessor && (
                                (() => {
                                    const lastActiveTeacher = subject.teachers.find(
                                        (t) => t.professor === lastActiveProfessor
                                    );
                                    if (!lastActiveTeacher) return null;

                                    const activeGroupNumber =
                                        activeGroups[lastActiveTeacher.professor] ||
                                        lastActiveTeacher.groups[0].number;
                                    const currentGroupIndex = lastActiveTeacher.groups.findIndex(
                                        (g) => g.number === activeGroupNumber
                                    );

                                    return (
                                        <div className="flex items-center gap-1 w-[120px] justify-center">
                                            <Button
                                                size="sm"
                                                className={`rounded-r-none w-8 flex justify-center ${currentGroupIndex === 0 ? "invisible shadow-none transition-all" : ""
                                                    }`}
                                                onClick={() =>
                                                    currentGroupIndex > 0 &&
                                                    changeGroup(subject.code, lastActiveTeacher.professor, "prev")
                                                }
                                                disabled={currentGroupIndex === 0}
                                            >
                                                <ChevronLeft />
                                            </Button>
                                            <span className="text-sm text-center">{activeGroupNumber}</span>
                                            <Button
                                                size="sm"
                                                className={`rounded-l-none w-8 flex justify-center ${currentGroupIndex === lastActiveTeacher.groups.length - 1
                                                    ? "invisible shadow-none transition-all"
                                                    : ""
                                                    }`}
                                                onClick={() =>
                                                    currentGroupIndex < lastActiveTeacher.groups.length - 1 &&
                                                    changeGroup(subject.code, lastActiveTeacher.professor, "next")
                                                }
                                                disabled={currentGroupIndex === lastActiveTeacher.groups.length - 1}
                                            >
                                                <ChevronRight />
                                            </Button>
                                        </div>
                                    );
                                })()
                            )}
                        </div>

                        {/* Mostrar el recuadro de información si la materia está activa */}
                        {isActive && activeInfo && (
                            <div
                                className={`p-4 rounded-lg shadow mt-4 ${activeInfo ? "bg-blue-200/70 border border-blue-200 text-blue-800" : "bg-red-200"
                                    }`}
                            >
                                <p className="text-sm">
                                    <strong>Materia curso:</strong> {subject.code} -{" "}
                                    <strong>Grupo:</strong> {activeInfo.group}
                                </p>
                                <p className="text-sm">
                                    <strong>Profesor:</strong> {activeInfo.professor}
                                </p>
                                <p className="text-sm">
                                    <strong>Número de créditos:</strong> {subject.credits}
                                </p>
                            </div>
                        )}

                        {/* Lista de profesores */}
                        {isActive &&
                            subject.teachers.map((teacher) => (
                                <div key={teacher.professor} className="mt-4">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium">{teacher.professor}</p>

                                        <Switch
                                            checked={activeTeachers.includes(teacher.professor)}
                                            onCheckedChange={(checked) =>
                                                toggleProfessor(subject.code, teacher.professor, checked)
                                            }
                                        />
                                    </div>
                                </div>
                            ))
                        }
                    </li>
                );
            })}
        </ul>
    );
};

export default SubjectList;
