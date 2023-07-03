import { ListItem } from '@mui/material'
import { FC, useCallback, useState } from 'react'
import EmployeeModal from '../modals/EmployeeModal'
import { useTranslation } from 'react-i18next'

const styles = {
    listItem: {
        border: '1px solid #000',
        m: 1,
        cursor: 'pointer',
        backgroundColor: '#02D076',
        color: '#fff',
        justifyContent: 'center',
        '&:hover': {
            opacity: '.7',
            transition: '.5s',
        },
    },
} as const

interface Props {
    reload: () => void
}

const EmployeeAddItem: FC<Props> = ({ reload }) => {
    const { t } = useTranslation('common')
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)

    const onClick = useCallback(() => {
        setModalIsOpen(true)
    }, [])

    const onCloseModal = useCallback(() => {
        setModalIsOpen(false)
    }, [])

    return (
        <>
            <ListItem onClick={onClick} sx={styles.listItem}>
                {t('addEmployee.title')}
            </ListItem>
            {modalIsOpen && (
                <EmployeeModal
                    open={modalIsOpen}
                    onClose={onCloseModal}
                    employee={null}
                    reload={reload}
                />
            )}
        </>
    )
}

export default EmployeeAddItem
