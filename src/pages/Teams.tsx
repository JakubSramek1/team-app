import { createClient } from '@supabase/supabase-js'
import { FC, useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ITeam, apiCall } from './Home'
import TeamCard from '../components/card/TeamCard'

const Teams: FC = () => {
    const [teams, setTeams] = useState<ITeam[]>([])
    const navigate = useNavigate()

    const {
        state: { id },
    } = useLocation()

    useEffect(() => {
        handler()
    }, [id])

    const handler = async () => {
        const { data, error } = await apiCall('teams?select=*')
            .from('')
            .select()

        if (data) {
            const filtered = data.filter((t) => t.parentTeam === id)
            console.log(filtered, id)
            setTeams(filtered)
        }
    }

    const handleClick = useCallback(() => {
        navigate('/teams', { state: { id: id } })
    }, [id])

    return (
        <>
            {teams.map(({ id, name, parentTeam }) => (
                <TeamCard
                    key={id}
                    id={id}
                    name={name}
                    parentTeam={parentTeam}
                    onClick={handleClick}
                />
            ))}
        </>
    )
}

export default Teams
