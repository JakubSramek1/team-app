import { FC, useCallback } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'
import { useNavigate } from 'react-router-dom'

interface Props {
    id: string
    name: string
    parentTeam?: string
    onClick?: (id: string) => void
}

const TeamCard: FC<Props> = ({ id, name, parentTeam, onClick }) => {
    return (
        <Card
            sx={{ maxWidth: 345, m: 5 }}
            onClick={() => onClick && onClick(id)}
        >
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
