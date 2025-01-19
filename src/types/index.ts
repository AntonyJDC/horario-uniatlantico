export interface Schedule {
    day: string;
    startTime: string;
    endTime: string;
  }
  
  export interface Group {
    schedule: Schedule[];
    room: string;
  }
  
  export interface Teacher {
    professor: string;
    groupNumber1?: Group;
    groupNumber2?: Group;
    groupNumber3?: Group;
  }
  
  export interface Subject {
    code: string;
    name: string;
    semester: string;
    teachers: Teacher[];
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
  