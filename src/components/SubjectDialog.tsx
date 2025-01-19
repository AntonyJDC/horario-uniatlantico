import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "./ui/dialog";
import { Subject } from "../types";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";

interface SubjectDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  subjects: Subject[];
  handleToggleSubject: (subject: Subject, isActive: boolean) => void;
  selectedSubjects: Subject[];
}

const SubjectDialog: React.FC<SubjectDialogProps> = ({
  isOpen,
  setIsOpen,
  subjects,
  handleToggleSubject,
  selectedSubjects,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Selecciona una Materia</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {subjects.map((subject) => {
            const isSelected = selectedSubjects.some((s) => s.code === subject.code);
            return (
              <div key={subject.code} className="flex justify-between items-center border rounded-lg p-4 shadow">
                <div>
                  <p className="font-bold">{subject.name}</p>
                  <p className="text-sm text-gray-600">Código: {subject.code}</p>
                  <p className="text-sm text-gray-600">Semestre: {subject.semester}</p>
                </div>
                <Switch
                  checked={isSelected}
                  onCheckedChange={(checked) => handleToggleSubject(subject, checked)}
                />
              </div>
            );
          })}
        </div>
        <DialogClose asChild>
          <Button className="w-full mt-4">Cerrar</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default SubjectDialog;
