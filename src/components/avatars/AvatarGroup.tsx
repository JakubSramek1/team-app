import { FC, useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import { apiCall } from '../../pages/Home'

interface IEmployee {
    createdAt: string
    endDate: string | null
    id: string
    name: string
    position: string | null
    startDate: string | null
    surname: string
    team: string | null
}

interface Props {
    teamId: string
}

const AvatarContainer: FC<Props> = ({ teamId }) => {
    const [avatars, setAvatars] = useState<IEmployee[]>([])

    useEffect(() => {
        handler()
    }, [])

    const handler = async () => {
        const { data, error } = await apiCall('employees?select=*')
            .from('')
            .select()
            .eq('team', teamId)
        if (data) setAvatars(data)
        console.log(teamId, data)
    }

    return (
        <AvatarGroup max={4}>
            {avatars.map(({ id, name, surname }) => (
                <span key={id} title={`${name} ${surname}`}>
                    <Avatar alt={name} src="1.jpg" />
                </span>
            ))}
        </AvatarGroup>
    )
}

export default AvatarContainer
