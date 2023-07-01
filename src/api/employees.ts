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
    const { data, error } = await apiCall()
        .from('employees')
        .update(newData)
        .eq('id', newData.id)
    return handler(data, error)
}
