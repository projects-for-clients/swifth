import { createSlice } from "@reduxjs/toolkit"


interface UI {
    is_sidebar_open: boolean
}

const initialState = {
    is_sidebar_open: false
} satisfies UI

const UI_slice = createSlice({
    name: 'UI_slice', 
    initialState,
    reducers: ({

        
    })
})