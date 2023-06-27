import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import { FC } from 'react'
import { IEmployee } from '../avatars/AvatarGroup'
import { Box } from '@mui/material'

interface Props {
    employees: IEmployee[]
}

const EmployeeList: FC<Props> = ({ employees }) => {
    return (
        <Box display="flex" justifyContent="center">
            <List
                sx={{
                    bgcolor: 'background.paper',
                    alignContent: 'center',
                }}
            >
                {employees.map(({ id, name, surname, position }) => (
                    <ListItem>
                        <ListItemAvatar>
                            <span key={id} title={`${name} ${surname}`}>
                                <Avatar alt={name} src="1.jpg" />
                            </span>
                        </ListItemAvatar>
                        <ListItemText
                            primary={`${name} ${surname}`}
                            secondary={position}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}

export default EmployeeList
