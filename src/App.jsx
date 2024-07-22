import axios from 'axios'
import { useEffect, useState } from 'react'
import { Note } from './components/Note.jsx'

function App() {
  let [notes, setNotes] = useState([])
  let [newNote, setNewNote] = useState('a new note…')
  let [showAll, setShowAll] = useState(true)

  let notesToShow = showAll ? notes : notes.filter((note) => note.important)

  useEffect(() => {
    axios
      .get('http://localhost:3000/notes')
      .then((response) => setNotes(response.data))
  }, [])

  return (
    <>
      <h1>Notes</h1>
      <div>
        <button type="button" onClick={() => setShowAll((showAll) => !showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
      <form
        onSubmit={(event) => {
          event.preventDefault()

          let noteObject = {
            content: newNote,
            important: Math.random() < 0.5,
            id: String(notes.length + 1),
          }
          setNotes((notes) => notes.concat(noteObject))

          setNewNote('')
        }}
      >
        <input
          type="text"
          name="content"
          id="content"
          required
          value={newNote}
          onChange={(event) => setNewNote(event.target.value)}
          aria-label="New note"
          placeholder="Add a note…"
        />
        <button type="submit">Save</button>
      </form>
    </>
  )
}

export default App
