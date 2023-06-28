import { apiCall, handler } from './apiCall'

export const fetchTeamEmployees = async (teamId: string) => {
    const { data, error } = await apiCall()
        .from('employees')
        .select()
        .eq('team', teamId)
    return handler(data, error)
}
