import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Switch } from "./ui/switch";
import { Subject } from "../types";
import { Button } from "./ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./ui/accordion";
import { Input } from "./ui/input";
import { DialogDescription } from "@radix-ui/react-dialog";
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

    const normalizeText = (text: string) => {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    };


    const [searchTerm, setSearchTerm] = useState("");

    const filteredSubjects = subjects.filter((subject) =>
        normalizeText(subject.name).includes(normalizeText(searchTerm)) ||
        normalizeText(subject.code).includes(normalizeText(searchTerm))
    );

    const subjectsBySemester = filteredSubjects.reduce((acc, subject) => {
        const semester = subject.semester || "Otro";
        if (!acc[semester]) {
            acc[semester] = [];
        }
        acc[semester].push(subject);
        return acc;
    }, {} as Record<string, Subject[]>);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen} aria-label="Selecciona tus materias">
            <DialogContent className="max-w-auto max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Selecciona tus materias</DialogTitle>
                    <DialogDescription>Añade todas las materias que tienes que cursar este semestre</DialogDescription>
                </DialogHeader>

                <Input
                    placeholder="Buscar materia"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mb-4"
                />
                <ul className="space-y-4">
                    <Accordion type="multiple" defaultValue={Object.keys(subjectsBySemester)} className="w-full">
                        {Object.entries(
                            filteredSubjects.reduce((acc, subject) => {
                                const semester = subject.semester || "Otro";
                                if (!acc[semester]) {
                                    acc[semester] = [];
                                }
                                acc[semester].push(subject);
                                return acc;
                            }, {} as Record<string, Subject[]>)
                        ).map(([semester, semesterSubjects]) => (
                            <AccordionItem key={semester} value={semester}>
                                <AccordionTrigger>Semestre {semester}</AccordionTrigger>
                                <AccordionContent>
                                    <ul className="space-y-2">
                                        {semesterSubjects.map((subject) => (
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
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
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

