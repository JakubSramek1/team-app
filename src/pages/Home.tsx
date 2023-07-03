import { FC, useContext } from 'react'
import { useState } from 'react'
import Typography from '@mui/material/Typography'
import TeamCard from '../components/card/TeamCard'
import { Button, Grid } from '@mui/material'
import { fetchTeam } from '../api/teams'
import { TeamsContext } from '../context/TeamsContext'
import { ArrowLeftSharp } from '@mui/icons-material'
import TeamInfoCard from '../components/card/TeamInfoCard'
import { useTranslation } from 'react-i18next'

export interface ITeam {
    createdAt: string | null
    id: string
    name: string | null
    parentTeam: string | null
}

const Home: FC = () => {
    const { t } = useTranslation('common')
    const [currentTeam, setCurrentTeam] = useState<ITeam | null>(null)
    const { teams, getChildrenTeams, getInitialTeams } =
        useContext(TeamsContext)

    const handleClick = (id: string) => {
        getTeam(id)
        getChildrenTeams(id)
    }

    const goBack = (team: ITeam) => {
        if (team.parentTeam) handleClick(team.parentTeam)
        else {
            getInitialTeams()
            setCurrentTeam(null)
        }
    }

    const getTeam = async (id: string) => {
        const { data } = await fetchTeam(id)
        if (data) setCurrentTeam(data)
    }

    return (
        <>
            {!currentTeam ? (
                <Typography variant="h3" align="center" mt={3}>
                    {t('home.title')}
                </Typography>
            ) : (
                <Button
                    sx={{ mt: 2, ml: 2 }}
                    onClick={() => goBack(currentTeam)}
                >
                    <ArrowLeftSharp /> {t('controls.back')}
                </Button>
            )}

            {currentTeam && <TeamInfoCard team={currentTeam} />}
            {currentTeam && teams.length > 0 && (
                <Typography variant="h4" align="center">
                    {t('childrenComponent.title')}
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
