import { localhostUserToModel } from '../mappers/localhost-user.mapper'

/**
 *
 * @param {String|Number} id
 * @returns {Promise<User>}
 */

export const getUserByID = async (id) => {
  const url = `${import.meta.env.VITE_BASE_URL}/users/${id}`

  try {
    const res = await fetch(url)
    const data = await res.json()
    const user = localhostUserToModel(data)
    // console.log({user})
    return user
  } catch (error) {
    console.log(error)
  }
}
