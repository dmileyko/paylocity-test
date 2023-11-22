import { Plan } from "./types";

const PLAN_RATE = 1000;

export const PLANS: Plan[] = [
    {
        id: 0, 
        name: 'Medical Plan 1',
        type: 'Medical',
        rate: PLAN_RATE
    }, {
        id: 1, 
        name: 'Medical Plan 2',
        type: 'Medical',
        rate: PLAN_RATE
    }, {
        id: 2, 
        name: 'Medical Plan 3',
        type: 'Medical',
        rate: PLAN_RATE
    }, {
        id: 3, 
        name: 'Vision Plan 1',
        type: 'Vision',
        rate: PLAN_RATE
    }, {
        id: 4, 
        name: 'Vision Plan 2',
        type: 'Vision',
        rate: PLAN_RATE
    }, {
        id: 5, 
        name: 'Vision Plan 3',
        type: 'Vision',
        rate: PLAN_RATE
    }
];