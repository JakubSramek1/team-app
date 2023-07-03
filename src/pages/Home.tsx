import { FC, useCallback, useContext } from 'react'
import { useState } from 'react'
import Typography from '@mui/material/Typography'
import TeamCard from '../components/card/TeamCard'
import { IEmployee } from '../components/avatars/AvatarGroup'
import EmployeeList from '../components/lists/EmployeeList'
import { Button, Card, CardContent, Grid } from '@mui/material'
import { fetchTeam } from '../api/teams'
import { fetchTeamEmployees } from '../api/employees'
import { TeamsContext } from '../context/TeamsContext'
import { ArrowLeftSharp } from '@mui/icons-material'
import TeamInfoCard from '../components/card/TeamInfoCard'

export interface ITeam {
    createdAt: string | null
    id: string
    name: string | null
    parentTeam: string | null
}

const Home: FC = () => {
    const [currentTeam, setCurrentTeam] = useState<ITeam | null>(null)
    const { teams, getChildrenTeams, getInitialTeams } =
        useContext(TeamsContext)

    const handleClick = useCallback((id: string) => {
        getTeam(id)
        getChildrenTeams(id)
    }, [])

    const goBack = useCallback((team: ITeam) => {
        if (team.parentTeam) handleClick(team.parentTeam)
        else {
            getInitialTeams()
            setCurrentTeam(null)
        }
    }, [])

    const getTeam = useCallback(async (id: string) => {
        const { data } = await fetchTeam(id)
        if (data) setCurrentTeam(data)
    }, [])

    return (
        <>
            {!currentTeam ? (
                <Typography variant="h3" align="center" mt={3}>
                    Týmy
                </Typography>
            ) : (
                <Button
                    sx={{ mt: 2, ml: 2 }}
                    onClick={() => goBack(currentTeam)}
                >
                    <ArrowLeftSharp /> Zpět
                </Button>
            )}

            {currentTeam && <TeamInfoCard team={currentTeam} />}
            {currentTeam && teams.length > 0 && (
                <Typography variant="h4" align="center">
                    Podřazené týmy
                </Typography>
            )}

            <Grid display="flex" flexWrap="wrap" flexDirection="row" mb={6}>
                {teams.map(({ id, name, parentTeam }) => (
                    <TeamCard
                        key={id}
                        id={id}
                        name={name || ''}
                        parentTeam={parentTeam || ''}
                        onClick={() => handleClick(id)}
                    />
                ))}
            </Grid>
        </>
    )
}

export default Home
