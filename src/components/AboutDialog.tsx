import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface AboutDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AboutDialog({ isOpen, onClose }: AboutDialogProps) {

    return (
        <Dialog open={isOpen} onOpenChange={onClose} >
            <DialogTrigger asChild>
                <Button variant="outline">Acerca de</Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl text-justify p-10">
                <DialogTitle>Acerca de la Plataforma</DialogTitle>
                <DialogDescription>
                    Esta plataforma ha sido desarrollada con el objetivo de facilitar la generación de horarios académicos y verificar posibles conflictos entre materias de manera eficiente. La información utilizada para la generación del horario es proporcionada
                    directamente por la universidad a los estudiantes en formatos que pueden ser complejos de analizar. Nosotros trabajamos con esa información y la representamos 
                    de una manera mucho más sencilla, optimizando así el proceso de planificación académica para una mejor experiencia al matricularse en la universidad.
                    <br /><br />
                    A través de una interfaz intuitiva y herramientas automatizadas, los estudiantes pueden organizar su carga académica de manera precisa,
                    optimizando su planificación y evitando posibles errores en la selección de materias y horarios. La plataforma permite visualizar los horarios 
                    de las materias seleccionadas, identificar choques de horarios y seleccionar los grupos y profesores deseados. Además, se ofrece la posibilidad 
                    de descargar el horario en formato PDF para su posterior consulta. Todo esto con el objetivo de brindar una experiencia más eficiente y cómoda a los estudiantes.
                    <br /><br />
                    Cabe destacar que en ningún momento se solicita información privada relacionada con la universidad, asegurando la privacidad y seguridad de los usuarios.
                    Además, esta plataforma ha sido desarrollada de manera independiente y no está afiliada ni tiene relación oficial con la universidad. También es importante mencionar
                    que la información proporcionada en la plataforma puede variar y es responsabilidad del usuario verificar la exactitud de la misma mediante los canales oficiales de la universidad. 
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
}
