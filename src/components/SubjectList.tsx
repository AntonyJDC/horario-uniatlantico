import React from "react";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import { Subject } from "../types";

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
  changeGroup: (
    subjectCode: string,
    professor: string,
    direction: "next" | "prev"
  ) => void;
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
      {selectedSubjects.map(({ subject, isActive, activeGroups, activeTeachers }) => (
        <li key={subject.code} className="bg-white p-4 rounded-lg shadow">
          {/* Materia */}
          <div className="flex items-center justify-between">
            <p className="font-bold text-lg">{subject.name}</p>
            <Switch
              checked={isActive}
              onCheckedChange={(checked) => toggleSubject(subject.code, checked)}
            />
          </div>

          {/* Recuadro con Información Activa */}
          {isActive && activeSubjectInfo[subject.code] && (
            <div className="p-4 bg-blue-100 rounded-lg shadow mt-4">
              <p className="text-sm">
                <strong>Materia curso:</strong> {subject.code} - <strong>Grupo:</strong> {activeSubjectInfo[subject.code].group}
              </p>
              <p className="text-sm">
                <strong>Profesor:</strong> {activeSubjectInfo[subject.code].professor}
              </p>
            </div>
          )}

          {/* Profesores */}
          {isActive &&
            subject.teachers.map((teacher) => {
              const activeGroupNumber = activeGroups[teacher.professor];
              const groupCount =
                teacher.groupNumber1 && teacher.groupNumber2 ? 2 : 1;

              return (
                <div key={teacher.professor} className="mt-4">
                  <div className="flex items-center justify-between">
                    {/* Nombre del profesor */}
                    <p className="text-sm font-medium">{teacher.professor}</p>

                    {/* Control de grupo */}
                    <div className="flex items-center gap-2">
                      {groupCount > 1 && activeGroupNumber > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            changeGroup(subject.code, teacher.professor, "prev")
                          }
                        >
                          {"<"}
                        </Button>
                      )}
                      <span className="text-sm">
                        {activeGroupNumber}/{groupCount}
                      </span>
                      {groupCount > 1 && activeGroupNumber < groupCount && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            changeGroup(subject.code, teacher.professor, "next")
                          }
                        >
                          {">"}
                        </Button>
                      )}
                    </div>

                    {/* Switch del profesor */}
                    <Switch
                      checked={activeTeachers.includes(teacher.professor)}
                      onCheckedChange={(checked) =>
                        toggleProfessor(subject.code, teacher.professor, checked)
                      }
                    />
                  </div>
                </div>
              );
            })}
        </li>
      ))}
    </ul>
  );
};

export default SubjectList;
