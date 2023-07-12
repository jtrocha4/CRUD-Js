import modalHTML from './render-modal.html?raw'
import './render-modal.css'
import { getUserByID } from '../../use-cases/get-user-by-id'
import { User } from '../../models/users'

let modal; let form; let loadUsers = {}

export const showModal = async (id) => {
  modal?.classList.remove('hide-modal')
  loadUsers = {}
  if (!id) return
  const user = await getUserByID(id)
  setFormValues(user)
}

export const hideModal = () => {
  modal?.classList.add('hide-modal')
  form?.reset()
}
/**
 *
 * @param {User} user
 */
const setFormValues = (user) => {
  form.querySelector('[name="firstName"]').value = user.firstName
  form.querySelector('[name="lastName"]').value = user.lastName
  form.querySelector('[name="balance"]').value = user.balance
  form.querySelector('[name="isActive"]').checked = user.isActive
  loadUsers = user
}

/**
 *
 * @param {HTMLElement} element
 * @param {(userLike) => Promise<void>} callback
 */
export const renderModal = (element, callback) => {
  if (modal) return

  modal = document.createElement('div')
  modal.innerHTML = modalHTML
  modal.classList.add('modal-container')
  modal.classList.add('hide-modal')

  form = modal.querySelector('form')

  form.addEventListener('submit', async (event) => {
    event.preventDefault()

    const formData = new FormData(form)
    const userLike = { ...loadUsers }

    if (!formData.get('isActive')) {
      formData.set('isActive', 'off')
    }

    for (const [key, value] of formData) {
      if (key === 'balance') {
        userLike[key] = +value
        continue
      }
      if (key === 'isActive') {
        userLike[key] = (value === 'on')
        continue
      }
      userLike[key] = value
    }
    // console.log(userLike)
    await callback(userLike)
    hideModal()
  })

  modal.addEventListener('click', (event) => {
    if (event.target.textContent === 'Cancel') hideModal()
    if (event.target.className !== 'modal-container') return
    hideModal()
  })

  element.append(modal)
}
