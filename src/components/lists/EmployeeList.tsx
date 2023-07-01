import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import { FC, useState } from 'react'
import { IEmployee } from '../avatars/AvatarGroup'
import { Box } from '@mui/material'
import EmployeeModal from '../modals/EmployeeModal'

interface Props {
    employees: IEmployee[]
    onUpdate: () => void
}

const EmployeeList: FC<Props> = ({ employees, onUpdate }) => {
    const [currentEmployee, setCurrentEmployee] = useState<IEmployee | null>(
        null
    )

    const handleClick = (employeeId: string) => {
        const current = employees.find(({ id }) => id === employeeId)
        setCurrentEmployee(current ?? null)
    }

    const onCloseModal = () => {
        setCurrentEmployee(null)
        onUpdate()
    }

    return (
        <>
            <Box display="flex" justifyContent="center">
                <List
                    sx={{
                        bgcolor: 'background.paper',
                        alignContent: 'center',
                    }}
                >
                    {employees.map(
                        ({ id, name, surname, position, endDate }) => (
                            <ListItem
                                onClick={() => handleClick(id)}
                                sx={{
                                    border: '1px solid #000',
                                    m: 1,
                                    cursor: 'pointer',
                                    backgroundColor: endDate ? 'gray' : '#fff',
                                    '&:hover': {
                                        backgroundColor: '#ccc8c8',
                                        transition: '.5s',
                                    },
                                }}
                            >
                                <ListItemAvatar>
                                    <span key={id} title={`${name} ${surname}`}>
                                        <Avatar
                                            sx={{
                                                backgroundColor: endDate
                                                    ? '#000'
                                                    : '#02D076',
                                            }}
                                            alt={name}
                                            src="1.jpg"
                                        />
                                    </span>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={`${name} ${surname}`}
                                    secondary={position}
                                />
                            </ListItem>
                        )
                    )}
                </List>
            </Box>
            {currentEmployee && (
                <EmployeeModal
                    open={!!currentEmployee}
                    onClose={onCloseModal}
                    employee={currentEmployee}
                />
            )}
        </>
    )
}

export default EmployeeList
