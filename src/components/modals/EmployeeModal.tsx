import {
    Avatar,
    Box,
    Button,
    Modal,
    TextField,
    Typography,
} from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { IEmployee } from '../avatars/AvatarGroup'
import { Edit } from '@mui/icons-material'
import moment from 'moment'

interface Props {
    open: boolean
    onClose: () => void
    employee: IEmployee
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

const EmployeeModal: FC<Props> = ({ open, onClose, employee }) => {
    const { createdAt, endDate, name, position, surname, team, id, startDate } =
        employee
    const [isEditMode, setIsEditMode] = useState<boolean>(false)

    useEffect(() => {
        console.log(startDate, createdAt, endDate)
    }, [])

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>
                <Edit
                    sx={{ color: '#10BFFC', cursor: 'pointer' }}
                    onClick={() => setIsEditMode((prev) => !prev)}
                />
                <span title={`${name} ${surname}`}>
                    <Avatar
                        sx={{ backgroundColor: endDate ? '#000' : '#02D076' }}
                        alt="avatar"
                    >
                        {name.charAt(0)}
                    </Avatar>
                </span>
                <TextField
                    label="Jméno"
                    variant="standard"
                    disabled={!isEditMode}
                    value={name}
                />
                <TextField
                    label="Příjmení"
                    variant="standard"
                    disabled={!isEditMode}
                    value={surname}
                />
                <TextField
                    label="Pozice"
                    variant="standard"
                    disabled={!isEditMode}
                    value={position}
                />
                <TextField
                    label="Tým"
                    variant="standard"
                    disabled={!isEditMode}
                    value={team}
                    select
                />
                <TextField
                    label="Nastoupil"
                    variant="standard"
                    disabled={!isEditMode}
                    value={moment(startDate, 'YYYY-MM-DD').format('DD.MM.YYYY')}
                />

                <Button onClick={onClose}>Zavřít</Button>
            </Box>
        </Modal>
    )
}

export default EmployeeModal
