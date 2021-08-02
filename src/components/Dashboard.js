import React,{useState,useEffect} from 'react'
import firebase from 'firebase';
import { db,firebaseApp,timestamp } from '../config';
import { Redirect as RedirectComp } from "react-router-dom";
import Editor from './Editor'
import Sidebar from './Sidebar'

export default function Dashboard({user,setUser}) {
    const [notes,setNotes] = useState([]);
    const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
    const [selectedNote,setSelectedNote] = useState(null);
    const [newNoteId, setNewNoteId] = useState(null);

    useEffect(() => {
      const unsub=  db
        .collection("notes")
        .onSnapshot((serverUpdate) => {
          const notes = serverUpdate.docs.map((_doc) => {
            return { ..._doc.data(), id: _doc.id }
            /*const data = _doc.data();
            data["id"] = _doc.id;
            return data;*/
          });
          setNotes(notes);
          console.log(typeof( notes))
          setNewNoteId(null);
        });
        return () => unsub();
    }, [])

    const _selectNote = (note,index)=>{
        setSelectedNoteIndex(index);
        setSelectedNote(note)
    }

    const newNote = async(title)=>{
        const note ={
          title : title,
          body:'',
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }
        const newNoteDb = await db.collection('notes').add(note);
        const newId = newNoteDb.id;
        setNotes([...notes,note]);
        setNewNoteId(newId);
      }

    const noteUpdate = (id,noteObj)=>{
        db
        .collection('notes')
        .doc(id)
        .update({
          title: noteObj.title,
          body: noteObj.body,
          timestamp
        })
    }

    useEffect(() => {
      if (newNoteId) {
        const newNoteIndex = notes.findIndex((_note) => _note.id === newNoteId);
        
        _selectNote(notes[newNoteIndex], newNoteIndex);
      }
    }, [newNoteId, notes]);

    const _deleteNote = async (note) => {
        const noteIndex = notes.indexOf(note);
        setNotes(notes.filter((_note) => _note.id !== note.id));
        if (selectedNoteIndex === noteIndex) {
          _selectNote(null, null);
        } else if (selectedNoteIndex > noteIndex) {
          setSelectedNote(notes[selectedNoteIndex]);
          setSelectedNoteIndex(selectedNoteIndex - 1);
        }
    
        await db.collection("notes").doc(note.id).delete();
    };

    const handleLogout = ()=>{
      firebase.auth().signOut();
      setUser(false);
      
      console.log('signout');
    }

    if (!user) {
      return <RedirectComp to="/" />;
    }

    return (
        <div>
          
            <main className='main-container'>
              <div className="navigation">
                <ul className="list-non-bullet nav-pills">
                    <li className="nav-brand">
                        <a className="link" href="/">{user.email}</a> 
                    </li>
                    
                    <li className="list-item-inline">
                      <button className='logout' onClick={handleLogout}>Sign out </button>
                    </li>
                </ul>
              </div>
            {selectedNote ?
              <>
              
             <Editor  selectedNote={selectedNote} setSelectedNote={setSelectedNote} 
                selectedNoteIndex={selectedNoteIndex} setSelectedNoteIndex={setSelectedNoteIndex} 
                noteUpdate={noteUpdate} notes={notes} />
              </>
               : null
              }

                <Sidebar  selectedNoteIndex={selectedNoteIndex} 
                setSelectedNoteIndex={setSelectedNoteIndex} 
                _selectNote={_selectNote}
                notes={notes} setNotes={setNotes}
                newNote={newNote} _deleteNote={_deleteNote} />
            </main>
        </div>
    )
}
