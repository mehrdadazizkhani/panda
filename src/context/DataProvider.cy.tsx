import React from 'react'
import DataProvider from './DataProvider'

describe('<DataProvider />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<DataProvider />)
  })
})