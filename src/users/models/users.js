
export class User {
  /**
     *
     * @param {Like<User>} userData
     */

  constructor ({ id, isActive, balance, avatar, firstName, lastName, gender }) {
    this.avatar = avatar
    this.balance = balance
    this.firstName = firstName
    this.gender = gender
    this.id = id
    this.isActive = isActive
    this.lastName = lastName
  }
}
