import React,{useState} from 'react'
import List from '@material-ui/core/List';
import { Divider,Button } from '@material-ui/core';
import SideBarItem from './SidebarItem'

// import useFirestore from '../Hooks/useFirestore'



export default function Sidebar({notes,newNote,selectedNoteIndex,_selectNote,_deleteNote}) {
    

    const [addNote,setAddNote] = useState(false);
    const [title,setTitle] = useState(null);
    // const {notes,newNote} = useFirestore('notes');

    const newNoteBtnClick=()=>{
        setAddNote({
            addNote : !addNote,
        });
    }

    const updateTitle = (title)=>{
        console.log('note...',title);
        setTitle(title);
    }

    const addNewNote = ()=>{
        console.log(title,addNote);
        if(title === ''){
            return;
        }
        newNote(title);
        setTitle('');
        setAddNote(false);
    }

    

    return (
        
            <div className='sidebarContainer'>
            <Button className='newNoteBtn' onClick={newNoteBtnClick}> {addNote ? 'cancel' : 'New Note +'}</Button>
            {addNote ? 
                <div>
                    <input type='text' placeholder='enter note title' className='note-input' 
                    onKeyUp={(e)=>updateTitle(e.target.value)}/>
                    <Button className='newNoteSubmitBtn' onClick={addNewNote}>submit</Button>
                </div> : null
            }


            
            <List>
                {
                    notes  && notes.map((note,index)=>{
                        return(
                            <div key={index}>
                                <SideBarItem 
                                note={note} 
                                index={index} 
                                selectedNoteIndex={selectedNoteIndex}
                                _selectNote={_selectNote}
                                _deleteNote={_deleteNote}></SideBarItem>
                                <Divider></Divider>
                            </div>
                        )
                    })
                }
            </List>
        </div>
       
    )
}


