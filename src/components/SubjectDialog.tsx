import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Switch } from "./ui/switch";
import { Subject } from "../types";
import { Button } from "./ui/button";

interface SubjectDialogProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    subjects: Subject[];
    selectedSubjects: Subject[];
    handleToggleSubject: (subject: Subject, isActive: boolean) => void;
}

const SubjectDialog: React.FC<SubjectDialogProps> = ({
    isOpen,
    setIsOpen,
    subjects,
    selectedSubjects,
    handleToggleSubject,
}) => {
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Selecciona una Materia</DialogTitle>
                </DialogHeader>
                <ul className="space-y-4">
                    {subjects.map((subject) => (
                        <li key={subject.code} className="flex justify-between items-center p-2 border-b">
                            <div>
                                <p className="font-bold">{subject.name}</p>
                                <p className="text-sm text-gray-500">Código: {subject.code}</p>
                            </div>
                            <Switch
                                checked={selectedSubjects.some((s) => s.code === subject.code)}
                                onCheckedChange={(checked) => handleToggleSubject(subject, checked)}
                            />
                        </li>
                    ))}
                </ul>
                <div className="flex justify-end">
                    <Button
                        onClick={() => setIsOpen(false)}
                    >
                        Cerrar
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SubjectDialog;
