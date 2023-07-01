import {
    Alert,
    Box,
    Button,
    Grid,
    MenuItem,
    Modal,
    Typography,
} from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { IEmployee } from '../avatars/AvatarGroup'
import { Edit, Close } from '@mui/icons-material'
import moment from 'moment'
import PrimaryInput from '../inputs/PrimaryInput'
import { fetchAllTeams } from '../../api/teams'
import { ITeam } from '../../pages/Home'
import { updateEmployee } from '../../api/employees'

interface Props {
    open: boolean
    onClose: () => void
    employee: IEmployee
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#fff',
    borderRadius: '5px',
    boxShadow: 24,
    p: 4,
}

const EmployeeModal: FC<Props> = ({ open, onClose, employee }) => {
    const { name, position, surname, team, id, startDate } = employee
    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [teams, setTeams] = useState<ITeam[]>([])
    const [modalData, setData] = useState<IEmployee>(employee)
    const [isError, setIsError] = useState<boolean>(false)

    useEffect(() => {
        getTeams()
    }, [])

    useEffect(() => {
        console.log(modalData)
    })

    const getTeams = async () => {
        const { data } = await fetchAllTeams()
        if (data) setTeams(data)
    }

    const onSave = async () => {
        const { data, error } = await updateEmployee(modalData)
        if (error) {
            setIsError(true)
            return
        }

        onClose()
    }

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>
                <Grid display="flex" justifyContent="space-between" mb={3}>
                    <Typography variant="h5" align="center">
                        Zaměstnanec
                    </Typography>
                    {isEditMode ? (
                        <Close
                            sx={{
                                color: 'gray',
                                cursor: 'pointer',
                            }}
                            onClick={() => setIsEditMode(false)}
                        />
                    ) : (
                        <Edit
                            sx={{
                                color: '#10BFFC',
                                cursor: 'pointer',
                            }}
                            onClick={() => setIsEditMode(true)}
                        />
                    )}
                </Grid>
                <Grid mb={3}>
                    <PrimaryInput
                        label="Jméno"
                        disabled={!isEditMode}
                        value={name}
                        onChange={(name) =>
                            setData((prev) => ({ ...prev, name }))
                        }
                    />
                    <PrimaryInput
                        label="Příjmení"
                        disabled={!isEditMode}
                        value={surname}
                        onChange={(surname) =>
                            setData((prev) => ({ ...prev, surname }))
                        }
                    />
                    <PrimaryInput
                        label="Pozice"
                        disabled={!isEditMode}
                        value={position}
                        onChange={(position) =>
                            setData((prev) => ({ ...prev, position }))
                        }
                    />
                    <PrimaryInput
                        label="Tým"
                        disabled={!isEditMode}
                        value={team}
                        select
                        onChange={(team) =>
                            setData((prev) => ({ ...prev, team }))
                        }
                    >
                        {teams.map(({ id, name }) => (
                            <MenuItem key={id} value={id}>
                                {name}
                            </MenuItem>
                        ))}
                    </PrimaryInput>
                    <PrimaryInput
                        label="Nastoupil"
                        disabled={!isEditMode}
                        value={moment(startDate, 'YYYY-MM-DD').format(
                            'DD.MM.YYYY'
                        )}
                        onChange={(startDate) => console.log(startDate)}
                    />
                </Grid>
                {isError && (
                    <Grid display="flex" justifyContent="center" mb={3}>
                        <Alert severity="error">
                            Zaměstnance se nepodařilo uložit
                        </Alert>
                    </Grid>
                )}
                <Grid
                    display="flex"
                    justifyContent={isEditMode ? 'space-between' : 'center'}
                >
                    <Button
                        variant="outlined"
                        onClick={onClose}
                        color="primary"
                    >
                        Zavřít
                    </Button>
                    {isEditMode && (
                        <Button
                            variant="outlined"
                            onClick={onSave}
                            color="primary"
                        >
                            Uložit
                        </Button>
                    )}
                </Grid>
            </Box>
        </Modal>
    )
}

export default EmployeeModal
