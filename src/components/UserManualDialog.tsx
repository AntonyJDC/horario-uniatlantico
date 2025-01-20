import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { DialogDescription } from "@radix-ui/react-dialog";

const manualPages = [
  {
    image: "/imagen1.webp",
    text: `Paso 1: Dar clic en el botón "Añadir Materias" para seleccionar las materias que deseas cursar.`,
  },
  {
    image: "/imagen2.webp",
    text: "Paso 2: Se te mostrará un listado de materias que están organizadas por semestre, selecciona la que deseas añadir. También puedes buscar una materia en específico por su nombre.",
  },
  {
    image: "/imagen3.webp",
    text: "Paso 3: Una vez seleccionadas la materias, se te mostrarán los grupos disponibles para ellas y podrás seleccionar el que más te convenga.",
  },
  {
    image: "/imagen4.webp",
    text: "Paso 4: Puedes seleccionar un profesor en específico para la materia y se te mostrarán los horarios disponibles para ese profesor.",
  },
  {
    image: "/imagen5.webp",
    text: "Paso 5: Si el profesor tiene más de un grupo, puedes cambiar entre ellos para ver los horarios de cada grupo.",
  },
  {
    image: "/imagen6.webp",
    text: "Paso 5: Podrás ver si alguna de las materias que seleccionaste tiene un choque de horario con otra materia que ya seleccionaste. (se muestran en color rojo).",
  },
  {
    image: "/imagen7.webp",
    text: "Paso 6: Una vez seleccionadas todas las materias, puedes descargar el horario en formato PDF para imprimirlo o guardarlo en tu dispositivo.",
  },
];

interface UserManualDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UserManualDialog({ isOpen, onClose }: UserManualDialogProps) {
  const [pageIndex, setPageIndex] = useState(0);

  const nextPage = () => {
    if (pageIndex < manualPages.length - 1) setPageIndex(pageIndex + 1);
  };

  const prevPage = () => {
    if (pageIndex > 0) setPageIndex(pageIndex - 1);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Manual de Usuario</DialogTitle>
          <DialogDescription>Aprende a usar el horario en simples pasos</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-between gap-4">
          <img 
            src={manualPages[pageIndex].image} 
            alt={`Paso ${pageIndex + 1}`} 
            className="w-full object-cover rounded-lg"
          />
          <p className="text-center text-gray-700">{manualPages[pageIndex].text}</p>
          <div className="flex justify-between w-full items-center mt-4">
            <Button onClick={prevPage} disabled={pageIndex === 0}>
              Anterior
            </Button>
            <span className="text-gray-600">
              {pageIndex + 1} / {manualPages.length}
            </span>
            <Button onClick={nextPage} disabled={pageIndex === manualPages.length - 1}>
              Siguiente
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
