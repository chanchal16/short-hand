import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import {removeHTMLTags} from '../helper'
import { makeStyles } from '@material-ui/core/styles';
import './sidebarItem.css'

const useStyles = makeStyles((theme) => ({
    
    root: {
        '&$selected': {
          backgroundColor: 'red',
          '&:hover': {
            backgroundColor: 'yellow',
          }
        },
      },
      selected: {},
    
}));


export default function SideBarItem({note,index,selectedNoteIndex,selectNote,deleteNote}) {
    const classes = useStyles();

    const nselectNote = (n,i)=>{selectNote(n,i)}
    const ndeleteNote = (note)=>{
        if(window.confirm(`Are you sure you want to delete:${note.title}`)){
            deleteNote(note);
        }
    }

    return (
        <div key={index} className={classes.selected}>
            <ListItem className='ListItem' classes={{ root: classes.root, selected: classes.selected }} selected={selectedNoteIndex === index} alignItems='flex-start'>
                <div className='textsection' onClick={()=>nselectNote(note,index)}>
                    <ListItemText primary={note.title} secondary={removeHTMLTags(note.body.substring(0,30)) + '...'}></ListItemText>
                    {/* {console.log(note.title,note.body)} */}
                </div>
                <DeleteIcon className='deleteIcon' onClick={()=>ndeleteNote(note)}></DeleteIcon>
            </ListItem>
        </div>
    )
}
