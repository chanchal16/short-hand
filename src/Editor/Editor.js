import  debounce  from '../helper';
import React,{useState,useEffect} from 'react'
import ReactQuill from 'react-quill';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    root: {
      backgroundColor: theme.palette.background.paper,
      height: 'calc(100% - 35px)',
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
      width: 'calc(100% - 300px)',
      backgroundColor: '#29487d',
      color: 'white',
      paddingLeft: '50px'
    },
    editIcon: {
      position: 'absolute',
      left: '310px',
      top: '12px',
      color: 'white',
      width: '10',
      height: '10'
    },
    editorContainer: {
      height: '100%',
      boxSizing: 'border-box'
    }
  });

function Editor({notes,selectedNote,setSelectedNote}) {
  
    const[text,setText] = useState('');
    const [title,setTitle]=useState('');
    const[id,setId]=useState('');

    const updateState = ()=>{
      console.log(selectedNote.body);
      setText({text: selectedNote.body});
      console.log(selectedNote.id);
      setTitle({title: selectedNote.title});
      setId({ id: selectedNote.id});
    }

    useEffect(() => {
     
      updateState();
      return () => {
        
      }
    }, [])

    const updateBody = async(val)=>{
        await setText(val);
        console.log(text);
        update();
    }
    
    const update = debounce(()=>{
        console.log('updating db');
    },1500);
   
    return (
        <div>
            <ReactQuill theme="snow" value={text,title} onChange={updateBody} />
        </div>
    )
}


export default withStyles(styles)(Editor);