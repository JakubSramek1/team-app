import { FC } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'
import AvatarContainer from '../avatars/AvatarGroup'

interface Props {
    id: string
    name: string
    parentTeam?: string
    onClick?: (id: string) => void
}

const TeamCard: FC<Props> = ({ id, name, onClick }) => {
    return (
        <Card
            sx={{ m: 5, width: '300px' }}
            onClick={() => onClick && onClick(id)}
        >
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <AvatarContainer teamId={id} />
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default TeamCard
