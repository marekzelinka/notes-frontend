import PropTypes from 'prop-types'

export function NoteForm({ onSubmit }) {
  const handleSubmit = async (event) => {
    event.preventDefault()

    const form = event.target
    const formData = new FormData(form)

    const content = formData.get('content')?.toString()
    const result = await onSubmit({ content })

    if (result.success) {
      form.reset()
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="content"
        id="content"
        required
        aria-label="New note"
        placeholder="Add a note…"
      />
      <button type="submit">Save</button>
    </form>
  )
}
NoteForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}
