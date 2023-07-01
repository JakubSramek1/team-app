import { IEmployee } from '../components/avatars/AvatarGroup'
import { apiCall, handler } from './apiCall'

export const fetchTeamEmployees = async (teamId: string) => {
    const { data, error } = await apiCall()
        .from('employees')
        .select()
        .eq('team', teamId)
    return handler(data, error)
}

export const updateEmployee = async (newData: IEmployee) => {
    const { createdAt, ...rest } = newData
    const { data, error } = await apiCall()
        .from('employees')
        .update(rest)
        .eq('id', newData.id)
    return handler(data, error)
}

type EmployeeAddType = Omit<IEmployee, 'id' | 'startDate'>

export const addEmployee = async (newData: EmployeeAddType) => {
    const { data, error } = await apiCall().from('employees').insert(newData)

    return handler(data, error)
}

export const deleteEmployee = async (employeeId: string) => {
    const { data, error } = await apiCall()
        .from('employees')
        .delete()
        .eq('id', employeeId)

    return handler(data, error)
}
