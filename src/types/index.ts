export interface Schedule {
    day: string;
    startTime: string;
    endTime: string;
  }
  
  export interface Group {
    number: number;  // Agregamos el número de grupo
    schedule: Schedule[];
    room: string;
  }
  
  export interface Teacher {
    professor: string;
    groups: Group[];  // Cambio de múltiples propiedades a un array de grupos
  }
  
  export interface Subject {
    code: string;
    name: string;
    semester: string;
    teachers: Teacher[];
    credits: number;
  }
  
  export interface CalendarSubject {
    code: string;
    name: string;
    group: number;
    day: string;
    startTime: string;
    endTime: string;
    professor: string;
    room: string;
  }
  