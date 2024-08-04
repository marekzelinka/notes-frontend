import PropTypes from 'prop-types'

export function LoginForm({ onSubmit }) {
  const handleSubmit = async (event) => {
    event.preventDefault()

    const form = event.target
    const formData = new FormData(form)

    const username = formData.get('username')?.toString()
    const password = formData.get('password')?.toString()
    const result = await onSubmit({ username, password })

    if (result.success) {
      form.reset()
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>{' '}
        <input type="text" name="username" id="username" />
      </div>
      <div>
        <label htmlFor="password">Password</label>{' '}
        <input type="password" name="password" id="password" />
      </div>
      <button type="submit">login</button>
    </form>
  )
}
LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}
