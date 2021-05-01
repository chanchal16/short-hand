import React from 'react'
import List from '@material-ui/core/List';
import { Divider,Button } from '@material-ui/core';
import SidebarItem from '../sidebarItem/SidebarItem'
import './sidebar.css'


class Sidebar extends React.Component{
    constructor(){
        super();
        this.state ={
            addNote : false,
            title : null
        }
    }

    render(){
        const { notes, selectedNoteIndex } = this.props;

        if(notes){
        return(
            <div className='sidebarContainer' style={{height: "100vh"}}>
                <Button type="text" onClick={this.newNoteBtnClick} className='newNoteBtn'>{this.state.addNote?"CANCEL":"NEW NOTE "}</Button>
                {
                    this.state.addNote ?
                     <div>
                         <input type="text" className='note-input' placeholder="Enter Note Title" 
                           onKeyUp={(e)=>this.updateTitle(e.target.value)}></input>
                         <Button className='newNoteSubmitBtn' onClick={this.newNote}>Submit</Button>
                     </div>  :
                     null
                }
                <List>
                    {
                        notes.map((_note,_index)=>{
                            return(
                                <div key={_index}>
                                    <SidebarItem 
                                      _note={_note}
                                      _index={_index}
                                      selectedNoteIndex={selectedNoteIndex}
                                      selectNote={this.selectNote}
                                      deleteNote={this.deleteNote}
                                      />
                                      <Divider></Divider>
                                </div>
                            )
                        })
                    }
                </List>
                
            </div>
        
        )
        }
        else{
            return(<div></div>)
        }
    }

    newNoteBtnClick = () =>{
        this.setState({addNote : !this.state.addNote})
    }

    updateTitle=(txt) =>{
        this.setState({title: txt})
    }

    newNote=()=>{ 
        this.props.newNote(this.state.title)
        this.setState({title: null, addNote :false})
    }

    selectNote=(n, i)  => this.props.selectNote(n, i);
    deleteNote=(note)=>this.props.deleteNote(note);
 
}

export default (Sidebar)
