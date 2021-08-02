import  debounce  from '../helper';
import React,{useState,useEffect} from 'react'
import ReactQuill from 'react-quill';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles(theme => ({
    root: {
      backgroundColor: theme.palette.background.paper,
      minHeight: '100%',
      position: 'absolute',
      left: '0',
      width: '300px',
      boxShadow: '0px 0px 2px black'
    },
    titleInput: {
      height: '50px',
      boxSizing: 'border-box',
      border: 'none',
      padding: '5px',
      fontSize: '24px',
      width: '100%',
      backgroundColor: '#ffc107',
      color: 'white',
      paddingLeft: '50px',
      
    },
    editIcon: {
      position: 'absolute',
      left: '310px',
      top: '95px',
      color: 'white',
      width: '10',
      height: '10'
    },
    editorContainer: {
      height: '100%',
      boxSizing: 'border-box',
      // marginLeft:'300px',
      width:'calc(100% -30%)'
    }
  }));
  


const Editor = ({ notes, selectedNote, selectedNoteIndex, noteUpdate }) => {
    const [text, setText] = useState(selectedNote && selectedNote.body);
    const [title, setTitle] = useState(selectedNote && selectedNote.title);
    const [id, setId] = useState(selectedNote && selectedNote.id);
    const [update, setUpdate] = useState(0);
    
    const classes = useStyles();

    useEffect(() => {
        setText(selectedNote.body);
        setTitle(selectedNote.title);
        setId(selectedNote.id);

    }, [selectedNote]);



    const dupdate = debounce(() => {
          noteUpdate(id,{
              title: title,
              body: text
          })
      }, 1500);

    

    const updateBody = async(val)=> {
        
        await setText(val);
        setUpdate((prev) => prev + 1);
        dupdate();
    }

    const updateTitle=async(val) =>{
        await setTitle(val);
        setUpdate((prev) => prev + 1);
    }
    
    
    return (
        <>
        <div className={classes.editorContainer}> 
            
            {/* <BorderColorIcon className={classes.editIcon}></BorderColorIcon> 
           
            <input
                className={classes.titleInput}
                placeholder="Note title..."
                value={title ? title : ""}
    onChange={(e) => updateTitle(e.target.value)}></input>*/}
        
            <ReactQuill  
            value={text} 
            onChange={updateBody}                
            />
        </div>
        </>
    );
};


export default Editor