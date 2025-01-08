import { createSlice } from "@reduxjs/toolkit";

const initialState={
    status:false,
    userData:null
    /*
    userData format
    {
        Name:
        Age:
        Email:
        ph_no:
        Address:
        PinCode:
    }
    */
}
const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        login: (state,action)=>{
            state.status=true;
            state.userData=action.payload.userData;
        },
        logout: (state)=>{
            state.status=false;
            state.userData=null;
        }
    }

})
export const {login,logout} =authSlice.actions;
export default authSlice.reducer;

