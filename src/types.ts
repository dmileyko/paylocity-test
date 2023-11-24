export type PlanType = 'Medical' | 'Dental' | 'Vision' | '';

export interface Plan {
    id: number;
    name: string;
    type: PlanType;
    benefits?: string;
    applicantRate: number;
    dependentRate: number;
}

export interface Enrollment {
    type: PlanType;
    planId: number;
    familyMembers: number[]; // 1 - applicant, 2 - spouse, 3... - children
    cost: number;
}

export interface Dependent {
    firstname: string;
    lastname: string;
    dob: string;
    gender: string;
    type: 'Applicant' | 'Child' | 'Spouse';
}

export interface Employee extends Dependent{
    enrollments: Enrollment[];
    dependents: Dependent[];
}