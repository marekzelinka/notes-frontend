export function Note({ note, onToggleImportance }) {
  let label = note.important ? 'make not important' : 'make important'

  return (
    <li>
      {note.content}
      <button type="button" onClick={onToggleImportance}>
        {label}
      </button>
    </li>
  )
}
