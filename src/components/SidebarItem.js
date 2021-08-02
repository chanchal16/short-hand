import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import {removeHTMLTags} from '../helper'

export default function SidebarItem({note, index, selectedNoteIndex, _selectNote,_deleteNote }) {

    const handleDeleteNote = (note) => {
        if (window.confirm(`Are you sure you want to delete: ${note.title}`)) {
            _deleteNote(note);
        }
    };
    return (
        <div key={index}>
            <ListItem
                  className='listItem'
                  selected={selectedNoteIndex===index}
                  alignItems="flex-start"
                >
                    <div className='textSection'
                       onClick={()=>_selectNote(note,index)}>
                           <ListItemText
                             primary={note.title}
                             secondary={removeHTMLTags(note.body.substring(0,30))+'...'}
                            />
                    </div>
                    <DeleteIcon onClick={()=> handleDeleteNote(note)}
                        className='deleteIcon'></DeleteIcon>
            </ListItem>
        </div>
    )
}
