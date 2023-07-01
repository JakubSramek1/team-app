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
import { Edit, Close, Delete } from '@mui/icons-material'
import PrimaryInput from '../inputs/PrimaryInput'
import { fetchAllTeams } from '../../api/teams'
import { ITeam } from '../../pages/Home'
import { addEmployee, updateEmployee } from '../../api/employees'

interface Props {
    open: boolean
    onClose: () => void
    onSave?: () => void
    employee: IEmployee | null
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

const EmployeeModal: FC<Props> = ({ open, onClose, employee, onSave }) => {
    const [isEditMode, setIsEditMode] = useState<boolean>(!employee)
    const [teams, setTeams] = useState<ITeam[]>([])
    const [modalData, setData] = useState<IEmployee | null>(employee)
    const [isError, setIsError] = useState<boolean>(false)

    useEffect(() => {
        getTeams()
    }, [])

    const getTeams = async () => {
        const { data } = await fetchAllTeams()
        if (data) setTeams(data)
    }

    const save = async () => {
        if (modalData) {
            if (employee) {
                const { error } = await updateEmployee(modalData)
                if (error) {
                    setIsError(true)
                    return
                }
            } else {
                const { error } = await addEmployee(modalData)
                if (error) {
                    setIsError(true)
                    return
                }
            }
            onClose()
            if (onSave) onSave()
        }
    }

    const onChange = (
        param: keyof IEmployee,
        value: IEmployee[keyof IEmployee]
    ) => {
        setData((prev) =>
            prev
                ? { ...prev, [param]: value }
                : Object.assign({ [param]: value })
        )
    }

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>
                <Grid display="flex" justifyContent="space-between" mb={3}>
                    <Typography variant="h5" align="center">
                        Zaměstnanec
                    </Typography>
                    <Grid>
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
                        <Delete
                            sx={{ ml: 2, color: 'red', cursor: 'pointer' }}
                        />
                    </Grid>
                </Grid>
                <Grid mb={3}>
                    <PrimaryInput
                        label="Jméno"
                        disabled={!isEditMode}
                        value={modalData?.name ?? null}
                        onChange={(name) => onChange('name', name)}
                    />
                    <PrimaryInput
                        label="Příjmení"
                        disabled={!isEditMode}
                        value={modalData?.surname ?? null}
                        onChange={(surname) => onChange('surname', surname)}
                    />
                    <PrimaryInput
                        label="Pozice"
                        disabled={!isEditMode}
                        value={modalData?.position ?? null}
                        onChange={(position) => onChange('position', position)}
                    />
                    <PrimaryInput
                        label="Tým"
                        disabled={!isEditMode}
                        value={modalData?.team ?? null}
                        select
                        onChange={(team) => onChange('team', team)}
                    >
                        {teams.map(({ id, name }) => (
                            <MenuItem key={id} value={id}>
                                {name}
                            </MenuItem>
                        ))}
                    </PrimaryInput>
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
                            onClick={save}
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
