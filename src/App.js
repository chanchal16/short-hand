import React from 'react'
import {db,firebaseApp} from './config'
import withFirebaseAuth from 'react-with-firebase-auth'
import 'firebase/auth';
import firebase from 'firebase';
import './App.css';
import Editor from './Editor/Editor';
import Sidebar from './sidebar/Sidebar';


class App extends React.Component{
  

  constructor(){
    super();
    this.state={
      selectedNoteIndex:null,
      selectedNote:null,
      notes:null,
      user: null
    };
    
  }

  render(){
    const {
      user,
      signOut,
      signInWithGoogle,
    } = this.props;
    return(
     
      <div className= "app-container">
        {user ? <>
          <div class="navigation">
              <ul class="list-non-bullet nav-pills">
                  <li class="nav-brand">
                      <a class="link" href="/">{user.displayName}</a>
                  </li>
                  
                  <li class="list-item-inline">
                    <button className='logout' onClick={signOut}>Sign out</button>
                  </li>
              </ul>
          </div>
        <Sidebar 
            selectedNoteIndex={this.state.selectedNoteIndex} 
            notes={this.state.notes}
            selectNote={this.selectNote}
            newNote={this.newNote}
            deleteNote={this.deleteNote} />
        {
          this.state.selectedNote ?
          <Editor selectedNote={this.state.selectedNote}
          selectedNoteIndex={this.state.selectedNoteIndex}
          notes={this.state.notes}
          noteUpdate={this.noteUpdate} /> :
          null
        }</> :
        <>
          <div class="card">
            <div class="container">
              <h3><b>One Time Sign In</b></h3>
              <p>Sign in with your google account to get started.</p>
              <button className='signin-btn' onClick={signInWithGoogle}>Sign in with Google</button>
              
            </div>
          </div>
        </>
        }
      </div>
      
    )
  }



  componentDidMount = () => {
      db.collection('notes')
      .onSnapshot((snapshot)=>{
          let documents = [];
          snapshot.forEach(doc =>{
              documents.push({...doc.data(),id:doc.id});
              
          });
          // console.log(documents);
          this.setState({notes:documents});
      });
  }

  selectNote=(note, index) =>    this.setState({selectedNoteIndex:index , selectedNote: note});
  noteUpdate=(id,noteObj) => {
    db
      .collection('notes')
      .doc(id)
      .update({
        title: noteObj.title,
        body: noteObj.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })

  }

  newNote = async(title) =>{
    const note={
      title:title,
      body:''
    };
    const newFromDB = await 
      db
      .collection('notes')
      .add({
        title:note.title,
        body:note.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
    const newID = newFromDB.id;
    await this.setState({ notes: [...this.state.notes, note]});

    const newNoteIndex = this.state.notes.indexOf(this.state.notes.filter(_note => _note.id === newID )[0])
    this.setState({ selectedNote: this.state.notes[newNoteIndex], selectedNoteIndex:newNoteIndex});
  }

  deleteNote =async(note) =>{
    const noteIndex = this.state.notes.indexOf(note);
    await this.setState({notes:this.state.notes.filter(_note => _note !== note)})
    if(this.state.selectedNoteIndex === noteIndex) { 
      this.setState({
        selectedNoteIndex:null,
        selectedNote:null
      })}

      else{
        this.state.length > 1?
        this.selectNote(this.state.notes[this.state.selectedNoteIndex-1],this.state.selectedNoteIndex-1):
        this.setState({ selectedNoteIndex: null, selectedNote: null});
      }
      db
        .collection('notes')
        .doc(note.id)
        .delete();
    }
  }

  const firebaseAppAuth = firebaseApp.auth();
  const providers = {
    googleProvider: new firebase.auth.GoogleAuthProvider(),
  };


  export default withFirebaseAuth({
    providers,
    firebaseAppAuth,
  })(App);

// export default App;
