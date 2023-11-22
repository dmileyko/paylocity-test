export interface Plan {
    id: number;
    name: string;
    type: 'Medical' | 'Dental' | 'Vision';
    rate: 1000;
}

export interface Enrollment { 
    planId: number;
    familyMembers: number[]; // 1 - applicant, 2 - spouse, 3... - children
}

export interface Dependent {
    firstname: string;
    lastname: string;
    dob: string;
    gender: string;        
    type: 'Applicant' | 'Child' | 'Spouse';
}

export interface Employee extends Dependent{
    enrollments?: Enrollment[];
    dependents: Dependent[];
}