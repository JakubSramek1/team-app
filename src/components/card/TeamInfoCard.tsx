import { FC, useState } from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { ITeam } from '../../pages/Home'
import { IEmployee } from '../avatars/AvatarGroup'

const TeamInfoCard: FC = () => {
    const [parentTeam, setParentTeam] = useState<ITeam | null>(null)
    const [teamEmployees, setTeamEmployees] = useState<IEmployee[]>([])

    // const getParentTeam = async (parentId: string) => {
    //     const { data, error } = await apiCall('teams?select=*')
    //         .from('')
    //         .select()
    //         .eq('id', parentId)
    //         .single()
    //     if (data) setParentTeam(data)
    // }

    // const getTeamEmployees = async (teamId: string) => {
    //     const { data, error } = await apiCall('employees?select=*')
    //         .from('')
    //         .select()
    //         .eq('team', teamId)
    //     if (data) setTeamEmployees(data)
    // }

    return <></>
}

export default TeamInfoCard
