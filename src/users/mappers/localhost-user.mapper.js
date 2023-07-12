import { User } from '../models/users'

/**
 *
 * @param {Like<User>} localhostUser
 * @returns {User}
 */

export const localhostUserToModel = (localhostUser) => {
  const { id, isActive, balance, avatar, first_name, last_name, gender } = localhostUser

  return new User({
    avatar,
    balance,
    firstName: first_name,
    gender,
    id,
    isActive,
    // Como viene del localhost: como lo quiero trabajar
    lastName: last_name
  })
}
