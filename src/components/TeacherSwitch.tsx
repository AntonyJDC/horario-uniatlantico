import React from "react";
import { Switch } from "./ui/switch";

interface TeacherSwitchProps {
  subjectCode: string;
  teacher: Teacher;
  activeGroup: number;
  activeTeachers: string[];
  toggleProfessor: (subjectCode: string, professor: string, isActive: boolean) => void;
  changeGroup: (
    subjectCode: string,
    professor: string,
    direction: "next" | "prev"
  ) => void;
}

interface Teacher {
  professor: string;
  groupNumber1?: Group;
  groupNumber2?: Group;
}

interface Group {
  schedule: Schedule[];
  room: string;
}

interface Schedule {
  day: string;
  startTime: string;
  endTime: string;
}

const TeacherSwitch: React.FC<TeacherSwitchProps> = ({
  subjectCode,
  teacher,
  activeGroup,
  activeTeachers,
  toggleProfessor,
  changeGroup,
}) => {
  const groupCount = teacher.groupNumber1 && teacher.groupNumber2 ? 2 : 1;

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">{teacher.professor}</p>
        <div className="flex items-center gap-2">
          {activeGroup > 1 && (
            <button
              className="text-blue-600 hover:underline"
              onClick={() => changeGroup(subjectCode, teacher.professor, "prev")}
            >
              {"<"}
            </button>
          )}
          <span className="text-sm">
            {activeGroup}/{groupCount}
          </span>
          {groupCount > 1 && activeGroup < groupCount && (
            <button
              className="text-blue-600 hover:underline"
              onClick={() => changeGroup(subjectCode, teacher.professor, "next")}
            >
              {">"}
            </button>
          )}
        </div>
        <Switch
          checked={activeTeachers.includes(teacher.professor)}
          onCheckedChange={(checked) =>
            toggleProfessor(subjectCode, teacher.professor, checked)
          }
        />
      </div>
    </div>
  );
};

export default TeacherSwitch;
