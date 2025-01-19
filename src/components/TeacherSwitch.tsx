import React from "react";
import { Switch } from "./ui/switch";
import { Teacher } from "../types";
import { Button } from "./ui/button";

interface TeacherSwitchProps {
  subjectCode: string;
  teacher: Teacher;
  activeGroup: number;
  activeTeachers: string[];
  toggleProfessor: (subjectCode: string, professor: string, isActive: boolean) => void;
  changeGroup: (subjectCode: string, professor: string, direction: "next" | "prev") => void;
}

const TeacherSwitch: React.FC<TeacherSwitchProps> = ({
  subjectCode,
  teacher,
  activeGroup,
  activeTeachers,
  toggleProfessor,
  changeGroup,
}) => {
  const groupIndex = teacher.groups.findIndex(group => group.number === activeGroup);
  const groupCount = teacher.groups.length;

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">{teacher.professor}</p>
        <div className="flex items-center gap-2">
          {groupIndex > 0 && (
            <Button
              className="text-blue-600 hover:underline"
              onClick={() => changeGroup(subjectCode, teacher.professor, "prev")}
            >
              {"<"}
            </Button>
          )}
          <span className="text-sm">
            {teacher.groups[groupIndex]?.number} / {teacher.groups[groupCount - 1]?.number}
          </span>
          {groupIndex < groupCount - 1 && (
            <Button
              className="text-blue-600 hover:underline"
              onClick={() => changeGroup(subjectCode, teacher.professor, "next")}
            >
              {">"}
            </Button>
          )}
        </div>
        <Switch
          checked={activeTeachers.includes(teacher.professor)}
          onCheckedChange={(checked) => toggleProfessor(subjectCode, teacher.professor, checked)}
        />
      </div>
    </div>
  );
};

export default TeacherSwitch;
