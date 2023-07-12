import usersStore from '../../store/users-store'
import { renderTable } from '../render-table/render-table'
import './render-buttons.css'

/**
 *
 * @param {HTMLElement} element
 */
export const renderButtons = (element) => {
  const nextButton = document.createElement('button')
  nextButton.innerText = 'Next>'
  const previousButton = document.createElement('button')
  previousButton.innerText = '<Previous'
  const currentPage = document.createElement('span')
  currentPage.id = 'current-page'
  currentPage.innerText = usersStore.currentPage()

  element.append(previousButton, currentPage, nextButton)

  nextButton.addEventListener('click', async () => {
    await usersStore.loadNextPage()
    currentPage.innerHTML = usersStore.currentPage()
    renderTable(element)
  })

  previousButton.addEventListener('click', async () => {
    await usersStore.loadPreviousPage()
    currentPage.innerText = usersStore.currentPage()
    renderTable(element)
  })
}
