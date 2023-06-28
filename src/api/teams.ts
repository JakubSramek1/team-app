import { apiCall, handler } from './apiCall'

export const fetchAllTeams = async () => {
    const { data, error } = await apiCall().from('teams').select('*')
    return handler(data, error)
}

export const fetchChildrenTeams = async (teamId: string) => {
    const { data, error } = await apiCall()
        .from('teams')
        .select('*')
        .eq('parentTeam', teamId)
    return handler(data, error)
}

export const fetchTeam = async (teamId: string) => {
    const { data, error } = await apiCall()
        .from('teams')
        .select('*')
        .eq('id', teamId)
        .single()
    return handler(data, error)
}

export const fetchParentTeam = async (parentId: string) => {
    const { data, error } = await apiCall()
        .from('teams')
        .select('*')
        .eq('id', parentId)
        .single()
    return handler(data, error)
}
