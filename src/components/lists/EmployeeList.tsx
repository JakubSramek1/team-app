import List from '@mui/material/List'
import { FC, useState } from 'react'
import { IEmployee } from '../avatars/AvatarGroup'
import { Box } from '@mui/material'
import EmployeeModal from '../modals/EmployeeModal'
import EmployeeListItem from './EmployeeListItem'
import EmployeeAddItem from './EmployeeAddItem'

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
                            <EmployeeListItem
                                key={id}
                                active={!endDate}
                                onClick={() => handleClick(id)}
                                avatarAlt={name}
                                primaryItemText={`${name} ${surname}`}
                                secondaryItemText={position}
                            />
                        )
                    )}
                    <EmployeeAddItem reload={() => onUpdate()} />
                </List>
            </Box>
            {currentEmployee && (
                <EmployeeModal
                    open={!!currentEmployee}
                    onClose={onCloseModal}
                    employee={currentEmployee}
                    reload={() => onUpdate()}
                />
            )}
        </>
    )
}

export default EmployeeList
