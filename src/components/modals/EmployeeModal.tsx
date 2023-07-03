import { Close, Delete, Edit } from '@mui/icons-material'
import { Alert, Button, Grid, MenuItem, Modal, Typography } from '@mui/material'
import { FC, useCallback, useEffect, useState } from 'react'
import {
    addEmployee,
    deleteEmployee,
    updateEmployee,
} from '../../api/employees'
import { fetchAllTeams } from '../../api/teams'
import { ITeam } from '../../pages/Home'
import { IEmployee } from '../avatars/AvatarGroup'
import PrimaryInput from '../inputs/PrimaryInput'
import { useTranslation } from 'react-i18next'

interface Props {
    open: boolean
    onClose: () => void
    reload?: () => void
    employee: IEmployee | null
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: '#fff',
    borderRadius: '5px',
    boxShadow: 24,
    p: 4,
}

const EmployeeModal: FC<Props> = ({ open, onClose, employee, reload }) => {
    const { t } = useTranslation('common')
    const [isEditMode, setIsEditMode] = useState<boolean>(!employee)
    const [teams, setTeams] = useState<ITeam[]>([])
    const [modalData, setData] = useState<IEmployee | null>(employee)
    const [isError, setIsError] = useState<boolean>(false)

    useEffect(() => {
        getTeams()
    }, [])

    const getTeams = useCallback(async () => {
        const { data } = await fetchAllTeams()
        if (data) setTeams(data)
    }, [])

    const handleSave = useCallback(
        async (data: IEmployee) => {
            if (data) {
                if (!employee) await add(data)
                else await update(data)
            }
        },
        [employee]
    )

    const update = useCallback(async (data: IEmployee) => {
        const { error } = await updateEmployee(data)
        if (error) {
            setIsError(true)
            return
        }

        close()
    }, [])

    const add = useCallback(async (data: IEmployee) => {
        const { error } = await addEmployee(data)
        if (error) {
            setIsError(true)
            return
        }

        close()
    }, [])

    const handleDelete = useCallback(async (employeeId: string) => {
        const { error } = await deleteEmployee(employeeId)
        if (error) {
            setIsError(true)
            return
        }
        close()
    }, [])

    const onChange = useCallback(
        (param: keyof IEmployee, value: IEmployee[keyof IEmployee]) => {
            setData((prev) =>
                prev
                    ? { ...prev, [param]: value }
                    : Object.assign({ [param]: value })
            )
        },
        []
    )

    const close = useCallback(() => {
        if (reload) reload()
        onClose()
    }, [])

    return (
        <Modal open={open} onClose={onClose}>
            <Grid sx={style}>
                <Grid display="flex" justifyContent="space-between" mb={3}>
                    <Typography variant="h5" align="center">
                        {t('employeeModal.title')}
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
                            onClick={() =>
                                employee && handleDelete(employee.id)
                            }
                        />
                    </Grid>
                </Grid>
                <Grid mb={3}>
                    <PrimaryInput
                        label={t('employeeModal.name')}
                        disabled={!isEditMode}
                        value={modalData?.name ?? null}
                        onChange={(name) => onChange('name', name)}
                    />
                    <PrimaryInput
                        label={t('employeeModal.surname')}
                        disabled={!isEditMode}
                        value={modalData?.surname ?? null}
                        onChange={(surname) => onChange('surname', surname)}
                    />
                    <PrimaryInput
                        label={t('employeeModal.position')}
                        disabled={!isEditMode}
                        value={modalData?.position ?? null}
                        onChange={(position) => onChange('position', position)}
                    />
                    <PrimaryInput
                        label={t('employeeModal.team')}
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
                            {t('employeeModal.error')}
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
                        {t('employeeModal.actions.cancel')}
                    </Button>
                    {isEditMode && (
                        <Button
                            variant="outlined"
                            onClick={() => modalData && handleSave(modalData)}
                            color="primary"
                        >
                            {t('employeeModal.actions.save')}
                        </Button>
                    )}
                </Grid>
            </Grid>
        </Modal>
    )
}

export default EmployeeModal
