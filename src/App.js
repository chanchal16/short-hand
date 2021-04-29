import React, { useState } from 'react'

import './App.css';
import Editor from './Editor/Editor';
import Sidebar from './sidebar/Sidebar';


function App() {
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
  const [selectedNote,setSelectedNote] = useState(null);



  const _selectNote = (note,index)=>{
    setSelectedNoteIndex({selectedNoteIndex:index});
    setSelectedNote({selectedNote:note})
  }

  const noteUpdate = (id,noteObj)=>{
    console.log(id,noteObj);
  }

 
  return (
    <div className="App">
      <main className='main-container'>
        {selectedNote ? <Editor  selectedNote={selectedNote} setSelectedNote={setSelectedNote} 
        selectedNoteIndex={selectedNoteIndex} setSelectedNoteIndex={setSelectedNoteIndex} 
        noteUpdate={noteUpdate} /> : null}
        <Sidebar  selectedNoteIndex={selectedNoteIndex} 
        setSelectedNoteIndex={setSelectedNoteIndex} _selectNote={_selectNote} />
      </main>
    </div>
  );
}

export default App;
