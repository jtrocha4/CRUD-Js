import { renderAddButton } from './presentation/render-add-button/render-add-button'
import { renderButtons } from './presentation/render-button/render-buttons'
import { renderModal } from './presentation/render-modal/render-modal'
import { renderTable } from './presentation/render-table/render-table'
import usersStore from './store/users-store'
import { saveUser } from './use-cases/save-users'

export const UserApp = async (elementHtml) => {
  elementHtml.innerHTML = 'Loading...'
  await usersStore.loadNextPage()
  // console.log(usersStore.getUsers())
  elementHtml.innerHTML = ''
  renderTable(elementHtml)
  renderButtons(elementHtml)
  renderAddButton(elementHtml)
  renderModal(elementHtml, async (userLike) => {
    const user = await saveUser(userLike)
    usersStore.onUserChanged(user)
    renderTable()
  })
}
