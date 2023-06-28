import {
    PostgrestError,
    SupabaseClient,
    createClient,
} from '@supabase/supabase-js'
import { Database } from './database/types'

export function apiCall(): SupabaseClient<Database> {
    const supabaseKey = process.env.REACT_APP_SUPABASE_KEY || ''
    const backendUrl = process.env.REACT_APP_BACKEND_URL || ''
    return createClient<Database>(backendUrl, supabaseKey)
}

export const handler = <T>(data: T, error: PostgrestError | null) => {
    if (error) {
        console.log(error)
        return null
    }
    return data
}
