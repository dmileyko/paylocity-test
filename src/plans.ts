import { Plan } from "./types";

const APPLICANT_RATE = 1000;
const DEPENDENT_RATE = 500;
export const DISCOUNT = 0.1;

export const PLANS: Plan[] = [
    {
        id: 0, 
        name: 'Medical Plan 1',
        type: 'Medical',
        applicantRate: APPLICANT_RATE,
        dependentRate: DEPENDENT_RATE
    }, {
        id: 1, 
        name: 'Medical Plan 2',
        type: 'Medical',
        applicantRate: APPLICANT_RATE,
        dependentRate: DEPENDENT_RATE
    }, {
        id: 2, 
        name: 'Medical Plan 3',
        type: 'Medical',
        applicantRate: APPLICANT_RATE,
        dependentRate: DEPENDENT_RATE
    }, {
        id: 3, 
        name: 'Vision Plan 1',
        type: 'Vision',
        applicantRate: APPLICANT_RATE,
        dependentRate: DEPENDENT_RATE
    }, {
        id: 4, 
        name: 'Vision Plan 2',
        type: 'Vision',
        applicantRate: APPLICANT_RATE,
        dependentRate: DEPENDENT_RATE
    }, {
        id: 5, 
        name: 'Vision Plan 3',
        type: 'Vision',
        applicantRate: APPLICANT_RATE,
        dependentRate: DEPENDENT_RATE
    }
];