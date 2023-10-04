import { createSlice } from "@reduxjs/toolkit";
//import { database } from "../../firebaseConfig";
import { get, getDatabase, ref, set } from "firebase/database";
import { useSelector } from "react-redux";


const MailSlice = createSlice({
    name: 'emails',
    initialState:{
        userDetail: {},
        allEmails: [],
        inboxEmails: [],
        trashEmails: []
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
           state.trashEmails = getTrashEmails(allEmails,state.userDetail.email);
        },

        updateUserDetails(state,action){
            state.userDetail = action.payload
        },

        updateEmailDetails(state,action){
            let id = action.payload;
            let emailDetail = state.allEmails.find(email => email.id == id);
            emailDetail.isEmailRead = true;
            addEmailInDatabase(state.allEmails);
        },

        deleteEmails(state,action){
            debugger
            let id = action.payload;
            let deleteEmail = state.allEmails.find(email => email.id == id);
            deleteEmail.isDeleted = true;
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
        let inboxEmails = allEmails.filter(x => x.toAddress == email && x.isDeleted == false);
        return inboxEmails
    }
    
}

const getTrashEmails = (allEmails,email) => {
    if(allEmails){
        let trashEmails = allEmails.filter(x => x.toAddress == email && x.isDeleted == true);
        return trashEmails
    }
    return [];
}
