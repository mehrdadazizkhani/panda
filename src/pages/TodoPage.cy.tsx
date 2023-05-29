import React from 'react'
import TodoPage from './TodoPage'

describe('<TodoPage />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<TodoPage />)
  })
})