import { ListItem } from '@mui/material'
import { FC, useState } from 'react'
import { addEmployee } from '../../api/employees'
import EmployeeModal from '../modals/EmployeeModal'

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
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)

    const onClick = async () => {
        setModalIsOpen(true)
    }

    const onCloseModal = async () => {
        setModalIsOpen(false)
    }

    return (
        <>
            <ListItem onClick={onClick} sx={styles.listItem}>
                Přidat zaměstnance
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
