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

                return (
                    <li key={subject.code} className="bg-white p-4 rounded-lg shadow">
                        <div className="flex items-center justify-between">
                            <p className="font-bold text-lg">{subject.name}</p>
                            <Switch checked={isActive} onCheckedChange={(checked) => toggleSubject(subject.code, checked)} />
                        </div>

                        {/* Mostrar el recuadro de información si la materia está activa */}
                        {isActive && activeInfo && (
                            <div className={`p-4 rounded-lg shadow mt-4 ${activeInfo ? "bg-blue-200/70 border border-blue-200 text-blue-800" : "bg-red-200"}`}>
                                <p className="text-sm">
                                    <strong>Materia curso:</strong> {subject.code} - <strong>Grupo:</strong> {activeInfo.group}
                                </p>
                                <p className="text-sm">
                                    <strong>Profesor:</strong> {activeInfo.professor}
                                </p>
                            </div>
                        )}

                        {/* Lista de profesores */}
                        {isActive &&
                            subject.teachers.map((teacher) => {
                                const activeGroupNumber = activeGroups[teacher.professor] || teacher.groups[0].number;
                                const currentGroupIndex = teacher.groups.findIndex((g) => g.number === activeGroupNumber);

                                return (
                                    <div key={teacher.professor} className="mt-4">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-medium">{teacher.professor}</p>

                                            <div className="flex items-center gap-2 w-[120px] justify-center">
                                                <Button
                                                    size="sm"
                                                    className={`rounded-r-none w-8 flex justify-center ${currentGroupIndex === 0 ? "bg-transparent shadow-none transition-all" : ""}`}
                                                    onClick={() => currentGroupIndex > 0 && changeGroup(subject.code, teacher.professor, "prev")}
                                                    disabled={currentGroupIndex === 0}
                                                >
                                                    <ChevronLeft />
                                                </Button>
                                                <span className="text-sm w-10 text-center">{activeGroupNumber}</span>
                                                <Button
                                                    size="sm"
                                                    className={`rounded-l-none w-8 flex justify-center ${currentGroupIndex === teacher.groups.length - 1 ? "bg-transparent shadow-none transition-all" : ""}`}
                                                    onClick={() => currentGroupIndex < teacher.groups.length - 1 && changeGroup(subject.code, teacher.professor, "next")}
                                                    disabled={currentGroupIndex === teacher.groups.length - 1}
                                                >
                                                    <ChevronRight />
                                                </Button>
                                            </div>


                                            <Switch
                                                checked={activeTeachers.includes(teacher.professor)}
                                                onCheckedChange={(checked) => toggleProfessor(subject.code, teacher.professor, checked)}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                    </li>
                );
            })}
        </ul>
    );
};

export default SubjectList;
