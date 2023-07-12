import { localhostUserToModel } from '../mappers/localhost-user.mapper'

/**
 *
 * @param {Number} page
 * @returns {Promise<User[]>}
 */

export const loadUsersByPage = async (page = 1) => {
  const url = `${import.meta.env.VITE_BASE_URL}/users?_page=${page}`

  try {
    const res = await fetch(url)
    const data = await res.json()
    const newData = data.map(el => localhostUserToModel(el))
    // console.log(newData)
    return newData
  } catch (error) {
    console.log(error)
  }
}
