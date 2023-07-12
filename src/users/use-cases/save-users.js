import { localhostUserToModel } from '../mappers/localhost-user.mapper'
import { userModalToLocalhost } from '../mappers/user-to-localhost.mapper'
import { User } from '../models/users'

export const saveUser = async (userLike) => {
  const user = new User(userLike)

  if (!user.firstName || !user.lastName || !user.balance) throw 'First name, last name and balance is required'

  const userToSave = userModalToLocalhost(user)

  let userUpdated
  if (user.id) {
    userUpdated = await updateUser(userToSave)
  } else {
    userUpdated = await createUser(userToSave)
  }
  return localhostUserToModel(userUpdated)
}

/**
 * @param {Like<User>} user
 */
const createUser = async (user) => {
  const url = `${import.meta.env.VITE_BASE_URL}/users`
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const newUser = await res.json()
  console.log({ newUser })
  return newUser
}

const updateUser = async (user) => {
  const url = `${import.meta.env.VITE_BASE_URL}/users/${user.id}`
  const res = await fetch(url, {
    method: 'PATCH',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const updateUser = await res.json()
  // console.log({ updateUser })
  return updateUser
}
