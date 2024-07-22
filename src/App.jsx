import { useEffect, useState } from 'react'
import { Alert } from './components/Alert.jsx'
import { Note } from './components/Note.jsx'
import { createNote, getNotes, updateNote } from './services/note.js'

function App() {
  let [notes, setNotes] = useState([])
  let [newNote, setNewNote] = useState('a new note…')
  let [showAll, setShowAll] = useState(true)
  let [errorMessage, setErrorMessage] = useState(null)

  let notesToShow = showAll ? notes : notes.filter((note) => note.important)

  useEffect(() => {
    getNotes().then(setNotes)
  }, [])

  let toggleImportance = (noteId) => {
    let note = notes.find((note) => note.id === noteId)
    let changedNote = { ...note, important: !note.important }

    updateNote(noteId, changedNote)
      .then((data) => {
        setNotes((notes) =>
          notes.map((note) => (note.id === noteId ? data : note)),
        )
      })
      .catch(() => {
        setErrorMessage(
          `the note "${note.content}" was already deleted from server`,
        )
        window.setTimeout(() => setErrorMessage(null), 5000)
        setNotes((notes) => notes.filter((note) => note.id !== noteId))
      })
  }

  return (
    <>
      <h1>Notes</h1>
      <Alert message={errorMessage} />
      <div>
        <button type="button" onClick={() => setShowAll((showAll) => !showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            onToggleImportance={() => toggleImportance(note.id)}
          />
        ))}
      </ul>
      <form
        onSubmit={(event) => {
          event.preventDefault()

          let noteObject = {
            content: newNote,
            important: Math.random() < 0.5,
          }
          createNote(noteObject).then((data) => {
            setNotes((notes) => notes.concat(data))
            setNewNote('')
          })
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
