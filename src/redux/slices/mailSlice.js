import { createSlice } from "@reduxjs/toolkit";
//import { database } from "../../firebaseConfig";
import { get, getDatabase, ref, set } from "firebase/database";
const MailSlice = createSlice({
    name: 'emails',
    initialState:{
        allEmails: []
    },
    reducers: {
        addEmail(state,action){
            let newEmail = action.payload;
            state.allEmails.push(newEmail);
            addEmailInDatabase(state.allEmails);
        },

        getEmails(state,action){
           let allEmails =  getEmailsFromDatabase();
           state.allEmails = allEmails;
        }
    }
})

export const mailActions = MailSlice.actions;
export const mailReducer = MailSlice.reducer;

export const addEmailInDatabase = (allEmails) => {
    const db = getDatabase();
    set(ref(db, 'emails'), allEmails);
}

const getEmailsFromDatabase = () => {
    const db = getDatabase();

    const emails = [];
    get(ref(db,'emails')).then((data) => console.log(data.val()))
    
    return emails
}