import { Plan } from "./types";

const APPLICANT_RATE = 1000;
const DEPENDENT_RATE = 500;
export const DISCOUNT = 0.1;
export const INCOME_PER_PAYCHECK = 2000;
export const PAY_PERIOD_FACTOR = 1/26;

export const PLANS: Plan[] = [
    {
        id: 0,
        name: 'OptimaFit Bronze 7200 40% Direct M',
        benefits: 'Deductible: $7,200/$14,400',
        type: 'Medical',
        applicantRate: APPLICANT_RATE,
        dependentRate: DEPENDENT_RATE
    }, {
        id: 1,
        name: 'OptimaFit Bronze 6250 20% HSA Direct M',
        benefits: 'Deductible: $6,250/$12,500',
        type: 'Medical',
        applicantRate: APPLICANT_RATE,
        dependentRate: DEPENDENT_RATE
    }, {
        id: 2,
        name: 'OptimaFit Bronze 9100 0% Standard M',
        benefits: 'Deductible: $9,100/$18,200',
        type: 'Medical',
        applicantRate: APPLICANT_RATE,
        dependentRate: DEPENDENT_RATE
    }, {
        id: 3,
        name: 'MetLife Dental - 100/90/60 - $1,500',
        type: 'Dental',
        benefits: 'Deductible: $50/$150',
        applicantRate: APPLICANT_RATE,
        dependentRate: DEPENDENT_RATE
    }, {
        id: 4,
        name: 'MetLife Dental - 100/80/50 - $1,500',
        type: 'Dental',
        benefits: 'Deductible: $50/$150',
        applicantRate: APPLICANT_RATE,
        dependentRate: DEPENDENT_RATE
    }, {
        id: 5,
        name: 'MetLife Dental - 100/80/50 - $1,500',
        type: 'Dental',
        benefits: 'Deductible: $50/$150',
        applicantRate: APPLICANT_RATE,
        dependentRate: DEPENDENT_RATE
    }, {
        id: 6,
        name: 'Blue View Vision A1 $10/$10 12/12/12/12',
        type: 'Vision',
        applicantRate: APPLICANT_RATE,
        dependentRate: DEPENDENT_RATE
    }, {
        id: 7,
        name: 'Blue View Vision A2 $20/$20 12/12/12/12',
        type: 'Vision',
        applicantRate: APPLICANT_RATE,
        dependentRate: DEPENDENT_RATE
    }, {
        id: 8,
        name: 'Blue View Vision A3 $30/$30 12/12/12/12',
        type: 'Vision',
        applicantRate: APPLICANT_RATE,
        dependentRate: DEPENDENT_RATE
    }
];