import { Plus } from 'lucide-react';
import './App.css';
import { useState, useEffect } from 'react';

import { Link } from "react-router-dom"

function App() {
  const [notes, setNotes] = useState([]);
  const [noteInput, setNoteInput] = useState('');
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes'));
    if (storedNotes) {
      setNotes(storedNotes);
    }
  }, []);

  function createNote() {
    const trimmed = noteInput.trim();
  
    if (trimmed === '') {
      alert('Название заметки не может быть пустым');
      return;
    }
  
    if (notes.some(n => n.title === trimmed)) {
      alert('Заметка с таким названием уже существует');
      return;
    }
  
    const updatedNotes = [...notes, {
      title: trimmed,
      content: '',
      todos: [] // добавим заготовку под To-Do
    }];
  
    setNotes(updatedNotes);
    setNoteInput('');
    setShowInput(false);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  }
  

  function interruptCreation() {
    setNoteInput('');
    setShowInput(false);
  }


  return (
    <>
      <div className='start_div'>
        <h1 className='title'>Заметки</h1>
        <button onClick={() => setShowInput(true)} className='submit'><Plus />Создать заметку</button>
      </div>
      {showInput && (
        <div className='input'>
          <input
            type='text'
            value={noteInput}
            onChange={(e) => setNoteInput(e.target.value)}
            placeholder='Название заметки'
            className='noteName'
          />
          <div className='buttons'>
            <button onClick={createNote} className='submit'>Создать</button>
            <button onClick={interruptCreation} className='interrupt'>Отменить</button>
          </div>
        </div>
      )}
      <div id="cards">
        {notes.map((note, index) => (
          <Link key={index} to={`/note/${note.title}`} className='card'>
            <div className='card'>
              <h2 className='noteTitle'>{note.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default App;