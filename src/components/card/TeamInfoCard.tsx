import { Card, CardContent, Grid, Typography } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import EmployeeList from '../lists/EmployeeList'
import { fetchTeamEmployees } from '../../api/employees'
import { IEmployee } from '../avatars/AvatarGroup'
import { ITeam } from '../../pages/Home'
import moment from 'moment'
import { useTranslation } from 'react-i18next'

const styles = {
    card: {
        m: 5,
        width: '500px',
        '&:hover': {
            backgroundColor: '#f5f5f5',
            transition: '.5s',
        },
    },
}

interface Props {
    team: ITeam
}

const TeamInfoCard: FC<Props> = ({ team }) => {
    const { t } = useTranslation('common')
    const [teamEmployees, setTeamEmployees] = useState<IEmployee[]>([])
    const { name, createdAt, id } = team

    useEffect(() => {
        getTeamEmployees(id)
    }, [id])

    const getTeamEmployees = async (teamId: string) => {
        const { data } = await fetchTeamEmployees(teamId)
        if (data) setTeamEmployees(data)
    }

    return (
        <Grid display="flex" justifyContent="center">
            <Card sx={styles.card}>
                <CardContent>
                    <Typography variant="h4" align="center" mb={2}>
                        {t('teamInfo.title')}
                    </Typography>
                    <Typography variant="body1" align="center">
                        {t('teamInfo.name')}: {name}
                    </Typography>
                    <Typography variant="body1" align="center">
                        {t('teamInfo.createdAt')}:{' '}
                        {moment(createdAt).format('DD.MM.YYYY, HH:mm')}
                    </Typography>
                    {teamEmployees.length > 0 && (
                        <Typography variant="body1" align="center">
                            {t('teamInfo.teamMembersAmount')}:{' '}
                            {teamEmployees.length}
                        </Typography>
                    )}
                    <Typography variant="h5" align="center" mt={2}>
                        {t('teamInfo.teamMembers')}
                    </Typography>
                    {teamEmployees.length > 0 && (
                        <EmployeeList
                            employees={teamEmployees}
                            onUpdate={() => getTeamEmployees(id)}
                        />
                    )}
                </CardContent>
            </Card>
        </Grid>
    )
}

export default TeamInfoCard
