import { useEffect, useState } from 'react'
import { Alert } from './components/Alert.jsx'
import { Note } from './components/Note.jsx'
import { login } from './services/login.js'
import { createNote, getNotes, setToken, updateNote } from './services/note.js'

function App() {
  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note…')

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

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('loggedNoteappUser')
    setToken(null)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await login({ username, password })
      setUser(user)
      localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      setToken(user.token)
      setUsername('')
      setPassword('')
    } catch {
      setErrorMessage('Wrong credentials')
      window.setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const toggleImportance = (noteId) => {
    const note = notes.find((note) => note.id === noteId)
    const changedNote = { ...note, important: !note.important }

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
      {user ? (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <p>Signed in as {user.name}</p>
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault()

              const noteObject = {
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
      ) : (
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="username">Username</label>{' '}
            <input
              type="text"
              name="usernmae"
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>{' '}
            <input
              type="password"
              name="usernmae"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
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
            onToggleImportance={() => toggleImportance(note.id)}
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
