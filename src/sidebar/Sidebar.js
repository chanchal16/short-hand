import React,{useState} from 'react'
import List from '@material-ui/core/List';
import { Divider,Button } from '@material-ui/core';
import SideBarItem from '../sidebarItem/SidebarItem'
import './sidebar.css'
import useFirestore from '../Hooks/useFirestore'



export default function Sidebar({selectedNoteIndex,setSelectedNoteIndex,_selectNote,setSelectedNote}) {
    

    const [addNote,setAddNote] = useState(false);
    const [title,setTitle] = useState(null);
    const {notes} = useFirestore('notes');

    const newNoteBtnClick=()=>{
        setAddNote({
            addNote : !addNote,
        });
    }

    const updateTitle = (txt)=>{
        console.log('note...',txt);
        setTitle({title:txt});
    }

    const newNote = ()=>{
        console.log(title,addNote);
    }

    const selectNote = (n,i)=>{
        console.log('select note');
        
        _selectNote(n,i);
    }

    const deleteNote = ()=>{
        console.log('delete note');
    }

    return (
        
            <div className='sidebarContainer'>
            <Button className='newNoteBtn' onClick={newNoteBtnClick}> {addNote ? 'cancel' : 'New Note'}</Button>
            {addNote ? 
            <div>
                <input type='text' placeholder='enter note title' className='note-input' 
                onKeyUp={(e)=>updateTitle(e.target.value)}/>
                <Button className='newNoteSubmitBtn' onClick={newNote}>submit</Button>
            </div> : null
            }


            
            <List>
                {
                    notes && notes.map((note,index)=>{
                        return(
                            <div key={index}>
                                <SideBarItem 
                                note={note} 
                                index={index} 
                                selectedNoteIndex={selectedNoteIndex}
                                selectNote={selectNote}
                                deleteNote={deleteNote}></SideBarItem>
                                <Divider></Divider>
                            </div>
                        )
                    })
                }
            </List>
        </div>
       
    )
}


