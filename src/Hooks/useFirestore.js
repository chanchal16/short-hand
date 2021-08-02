import { useEffect, useState } from 'react'
import {db} from '../config'


export default function useFirestore() {
    const [notes,setNotes] = useState(null);
    const [newNoteId,setNewNoteId] = useState(null);

    useEffect(() => {
        const unsub = db.collection('notes')
        .onSnapshot((snapshot)=>{
            let documents = [];
            snapshot.forEach(doc =>{
                documents.push({...doc.data(),id:doc.id});
                
            });
            setNotes(documents);
        });
        return () => unsub();
    }, [])

    const newNote = async(title)=>{
        const note ={
          title : title,
          body:''
        }
        const noteNoteDb = await db.collection('notes').add({
          title,
          body:note.body
        });
        const newId = noteNoteDb.id;
        setNotes([...notes,note]);
        setNewNoteId(newId);
      }

      

    
    return {notes,newNoteId,newNote};
}


