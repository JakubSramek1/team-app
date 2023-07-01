import { FC, useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import { fetchTeamEmployees } from '../../api/employees'

export interface IEmployee {
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
        const { data } = await fetchTeamEmployees(teamId)
        if (data) setAvatars(data)
    }

    return (
        <AvatarGroup max={4}>
            {avatars.map(({ id, name, surname, endDate }) => (
                <span key={id} title={`${name} ${surname}`}>
                    <Avatar
                        sx={{ backgroundColor: endDate ? '#000' : '#02D076' }}
                        alt={name}
                        src="1.jpg"
                    />
                </span>
            ))}
        </AvatarGroup>
    )
}

export default AvatarContainer
