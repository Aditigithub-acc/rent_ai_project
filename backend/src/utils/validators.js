const validateEmail = (email) => {
  const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  return re.test(email)
}

const validatePassword = (password) => {
  return password.length >= 6
}

const validatePhone = (phone) => {
  const re = /^\d{10}$/
  return re.test(phone.replace(/\D/g, ""))
}

module.exports = { validateEmail, validatePassword, validatePhone }
