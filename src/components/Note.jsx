import PropTypes from 'prop-types'

export function Note({ note, onToggleImportance }) {
  const label = note.important ? 'make not important' : 'make important'

  return (
    <li className="note">
      {note.content}
      <button type="button" onClick={onToggleImportance}>
        {label}
      </button>
    </li>
  )
}
Note.propTypes = {
  note: PropTypes.shape({
    content: PropTypes.string.isRequired,
    important: PropTypes.bool.isRequired,
  }).isRequired,
  onToggleImportance: PropTypes.func.isRequired,
}
