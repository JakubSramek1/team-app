import { useState } from 'react'

export const useOnChange = <T>(initialState: T) => {
    const [state, setState] = useState<T>(initialState)

    const onChange = (param: keyof T, value: T[keyof T]) => {
        setState((prev) =>
            prev
                ? { ...prev, [param]: value }
                : Object.assign({ [param]: value })
        )
    }

    return [state, onChange] as const
}
