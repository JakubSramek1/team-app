import List from '@mui/material/List'
import { FC, useCallback, useState } from 'react'
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

    const handleClick = useCallback(
        (employeeId: string, employees: IEmployee[]) => {
            const current = employees.find(({ id }) => id === employeeId)
            setCurrentEmployee(current ?? null)
        },
        []
    )

    const onCloseModal = useCallback(() => {
        setCurrentEmployee(null)
        onUpdate()
    }, [])

    return (
        <>
            <Box display="flex" justifyContent="center">
                <List
                    sx={{
                        alignContent: 'center',
                    }}
                >
                    {employees.map(
                        ({ id, name, surname, position, endDate }) => (
                            <EmployeeListItem
                                key={id}
                                active={!endDate}
                                onClick={() => handleClick(id, employees)}
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
