import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import './NotePage.css';
import { Circle, CircleCheck } from 'lucide-react';

function NotePage() {
  const { title } = useParams();
  const [note, setNote] = useState(null);
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    const foundNote = storedNotes.find(n => n.title === title);
    if (foundNote) {
      setNote(foundNote);
      setText(foundNote.content);
      setTodos(foundNote.todos || []);
    }
  }, [title]);

  function saveContent() {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    const updatedNotes = storedNotes.map(n =>
      n.title === title ? { ...n, content: text, todos } : n
    );
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    alert('Содержимое сохранено');
  }

  function deleteNote() {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    const filtered = storedNotes.filter(n => n.title !== title);
    localStorage.setItem('notes', JSON.stringify(filtered));
    window.location.href = '/';
  }

  function addTodo() {
    if (newTodo.trim() === '') return;
    const updated = [...todos, { text: newTodo, done: false }];
    setTodos(updated);
    setNewTodo('');
  }

  function toggleTodo(index) {
    const updated = [...todos];
    updated[index].done = !updated[index].done;
    setTodos(updated);
  }

  if (!note) return <p>Заметка не найдена</p>;

  return (
    <div style={{ padding: '5%', margin: 'auto' }}>
      <h1>{note.title}</h1>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center', marginBottom: '20px', marginTop: '25px' }}>
        <button onClick={saveContent}>💾 Сохранить</button>
        <button onClick={deleteNote}>❌ Удалить</button>
        <Link to="/">← Назад</Link>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Введите содержимое заметки..."
        rows="10"
        style={{ width: '85vw', marginBottom: '10px', marginTop: '10px' }}
      />

      <h2>Задачи:</h2>
      {todos.map((todo, idx) => (
        <div key={idx} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <button onClick={() => toggleTodo(idx)} style={{ background: 'none', border: 'none' }}>
            {todo.done ? <CircleCheck color="green" /> : <Circle />}
          </button>
          <span style={{ marginLeft: '10px', textDecoration: todo.done ? 'line-through' : 'none' }}>
            {todo.text}
          </span>
        </div>
      ))}

      <div style={{ marginTop: '10px' }}>
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Новая задача"
          style={{ marginRight: '10px', marginBottom: '25px' }}
        />
        <button onClick={addTodo}>➕ Добавить</button>
      </div>
    </div>
  );
}

export default NotePage;
