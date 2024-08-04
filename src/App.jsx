import { useEffect, useState } from 'react'
import { Alert } from './components/Alert.jsx'
import { LoginForm } from './components/LoginForm.jsx'
import { Note } from './components/Note.jsx'
import { NoteForm } from './components/NoteForm.jsx'
import { login } from './services/login.js'
import { createNote, getNotes, setToken, updateNote } from './services/note.js'

function App() {
  const [user, setUser] = useState(null)

  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const notesToShow = showAll ? notes : notes.filter((note) => note.important)

  useEffect(() => {
    getNotes().then(setNotes)
  }, [])

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedNoteappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setToken(user.token)
    }
  }, [])

  const [errorMessage, setErrorMessage] = useState(null)
  const notify = (errorMessage, timeoutMs = 5000) => {
    setErrorMessage(errorMessage)
    window.setTimeout(() => setErrorMessage(null), timeoutMs)
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('loggedNoteappUser')
    setToken(null)
  }

  const handleLogin = async (credentials) => {
    try {
      const user = await login(credentials)
      setUser(user)
      localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      setToken(user.token)

      return { success: true }
    } catch {
      notify('Wrong credentials')

      return { success: false }
    }
  }

  const handleToggleNoteImportance = async (id) => {
    const note = notes.find((note) => note.id === id)
    const updates = { ...note, important: !note.important }

    try {
      const updatedNote = await updateNote(id, updates)
      setNotes((notes) =>
        notes.map((note) => (note.id === id ? updatedNote : note)),
      )
    } catch {
      notify(`the note "${note.content}" was already deleted from server`)
      setNotes((notes) => notes.filter((note) => note.id !== id))
    }
  }

  const handleAddNote = async (noteObject) => {
    const note = await createNote(noteObject)
    setNotes((notes) => notes.concat(note))

    return { success: true }
  }

  return (
    <>
      <h1>Notes</h1>
      <Alert message={errorMessage} />
      {user ? (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <p>Signed in as {user.name}</p>
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          </div>
          <NoteForm onSubmit={handleAddNote} />
        </>
      ) : (
        <LoginForm onSubmit={handleLogin} />
      )}
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
            onToggleImportance={() => handleToggleNoteImportance(note.id)}
          />
        ))}
      </ul>
      <Footer />
    </>
  )
}

export default App

function Footer() {
  const style = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 14,
    marginTop: '24px',
  }

  return (
    <footer style={style}>
      <em>
        Note app, Department of Computer Science, University of Helsinki 2025
      </em>
    </footer>
  )
}
