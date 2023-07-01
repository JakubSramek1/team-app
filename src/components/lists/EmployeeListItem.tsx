import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import { FC } from 'react'

const styles = {
    listItemActive: {
        border: '1px solid #000',
        m: 1,
        cursor: 'pointer',
        backgroundColor: '#fff',
        '&:hover': {
            backgroundColor: '#ccc8c8',
            transition: '.5s',
        },
    },
    listItem: {
        border: '1px solid #000',
        m: 1,
        cursor: 'pointer',
        backgroundColor: 'gray',
        '&:hover': {
            backgroundColor: '#ccc8c8',
            transition: '.5s',
        },
    },
} as const

interface Props {
    onClick: () => void
    active: boolean
    avatarAlt: string
    primaryItemText?: string | null
    secondaryItemText?: string | null
}

const EmployeeListItem: FC<Props> = ({
    onClick,
    active,
    avatarAlt,
    primaryItemText,
    secondaryItemText,
}) => {
    return (
        <ListItem
            onClick={onClick}
            sx={!active ? styles.listItem : styles.listItemActive}
        >
            <ListItemAvatar>
                <span title={avatarAlt}>
                    <Avatar
                        sx={{
                            backgroundColor: !active ? '#000' : '#02D076',
                        }}
                    >
                        {avatarAlt.charAt(0)}
                    </Avatar>
                </span>
            </ListItemAvatar>
            <ListItemText
                primary={primaryItemText}
                secondary={secondaryItemText}
            />
        </ListItem>
    )
}

export default EmployeeListItem
