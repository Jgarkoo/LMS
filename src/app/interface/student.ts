import { subjects } from "./subjects"

export interface students {
    id: string
    name: string
    lastName: string
    date: string
    grade: string
    email: string
    password: string
    subject?: subjects[]
}
