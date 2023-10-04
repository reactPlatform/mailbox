import { createSlice } from "@reduxjs/toolkit";
//import { database } from "../../firebaseConfig";
import { get, getDatabase, ref, set } from "firebase/database";
import { useSelector } from "react-redux";


const MailSlice = createSlice({
    name: 'emails',
    initialState:{
        userDetail: {},
        allEmails: [],
        inboxEmails: []
    },
    reducers: {
        addEmail(state,action){
            let newEmail = action.payload;
            state.allEmails.push(newEmail);
            addEmailInDatabase(state.allEmails);
        },

        updateEmails(state,action){
            debugger
           let allEmails =  action.payload;
           state.allEmails  = allEmails ? allEmails : [];
           state.inboxEmails = getInboxEmails(allEmails,state.userDetail.email);
        },

        updateUserDetails(state,action){
            state.userDetail = action.payload
        },

        updateEmailDetails(state,action){
            debugger
            let id = action.payload;
            let emailDetail = state.allEmails.find(email => email.id == id);
            emailDetail.isEmailRead = true;
            addEmailInDatabase(state.allEmails);
        }
    }
})

export const mailActions = MailSlice.actions;
export const mailReducer = MailSlice.reducer;

export const addEmailInDatabase = (allEmails) => {
    const db = getDatabase();
    set(ref(db, 'emails'), allEmails);
}



const getInboxEmails = (allEmails,email) => {
    if(allEmails){
        let inboxEmails = allEmails.filter(x => x.toAddress == email);
        return inboxEmails
    }
    
}
