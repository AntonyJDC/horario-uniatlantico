import React from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

interface Subject {
  code: string;
  name: string;
  semester: string;
  groups: Group[];
}

interface Group {
  professor: string;
  schedule: {
    day: string;
    startTime: string;
    endTime: string;
  }[];
  room: string;
}

interface SubjectSelectorProps {
  subjects: Subject[];
  onSelect: (subject: Subject, group: Group) => void;
}

const SubjectSelector: React.FC<SubjectSelectorProps> = ({ subjects, onSelect }) => {
  const [selectedSubject, setSelectedSubject] = React.useState<Subject | null>(null);
  const [selectedGroup, setSelectedGroup] = React.useState<Group | null>(null);

  const handleConfirm = () => {
    if (selectedSubject && selectedGroup) {
      onSelect(selectedSubject, selectedGroup);
      setSelectedSubject(null);
      setSelectedGroup(null);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Añadir Materias</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Selecciona una Materia</DialogTitle>
        </DialogHeader>
        <div>
          {subjects.map((subject) => (
            <div
              key={subject.code}
              className="p-4 border rounded cursor-pointer hover:bg-gray-100"
              onClick={() => setSelectedSubject(subject)}
            >
              <p className="font-bold">{subject.name}</p>
              <p className="text-sm">Código: {subject.code}</p>
            </div>
          ))}
        </div>
      </DialogContent>

      {selectedSubject && (
        <Dialog open={!!selectedSubject} onOpenChange={() => setSelectedSubject(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Selecciona un Grupo</DialogTitle>
            </DialogHeader>
            <RadioGroup
              onValueChange={(value) =>
                setSelectedGroup(selectedSubject.groups.find((g) => g.professor === value) || null)
              }
            >
              {selectedSubject.groups.map((group) => (
                <RadioGroupItem key={group.professor} value={group.professor}>
                  <p>{group.professor}</p>
                </RadioGroupItem>
              ))}
            </RadioGroup>
            <DialogFooter>
              <Button onClick={handleConfirm} disabled={!selectedGroup}>
                Confirmar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </Dialog>
  );
};

export default SubjectSelector;
