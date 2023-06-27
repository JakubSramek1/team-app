import { FC, useCallback } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'

interface Props {
    name: string
    parentTeam?: string
}

const TeamCard: FC<Props> = ({ name, parentTeam }) => {
    const handleClick = useCallback(() => {}, [])

    return (
        <Card sx={{ maxWidth: 345, m: 5 }} onClick={handleClick}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default TeamCard
