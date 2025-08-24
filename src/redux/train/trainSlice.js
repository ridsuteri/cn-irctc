import { createSlice } from "@reduxjs/toolkit";



const trainSlice = createSlice({
    name: 'train',
    initialState:{
        trainsData: [],
        loading: true,
        errors: null,


        searchParams: {
            to: "",
            from: "",
            travelClass: "",
            journeyDate: null
        },

        filter: {

        }
    },

    reducers: {
        setFilters: (state, action)=>{

        },
        resetFilters: (state, action)=>{

        }


    }

})

