import { useEffect, useState } from 'react'
import {db} from '../config'


export default function useFirestore() {
    const [notes,setNotes] = useState([]);

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

    
    return {notes};
}


