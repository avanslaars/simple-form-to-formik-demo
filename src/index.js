import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import uuid from 'uuid/v4'

import './styles.css'

let customers = []

function loadCustomers() {
  return Promise.resolve(customers)
}

function createCustomer(customer) {
  const newCustomer = { id: uuid(), ...customer }
  customers = [...customers, newCustomer]
  return newCustomer
}

export default function App() {
  const [customers, setCustomers] = useState([])

  useEffect(() => {
    loadCustomers().then(setCustomers)
  }, [])

  function handleCreate(customer) {
    const newCustomer = createCustomer(customer)
    setCustomers(existingCustomers => [...existingCustomers, newCustomer])
  }

  return (
    <div>
      <CustomerForm onCreate={handleCreate} />
      <CustomerList customers={customers} />
    </div>
  )
}

function CustomerForm({ onCreate }) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  function handleFirstNameChange(event) {
    const { value } = event.target
    setFirstName(value)
  }

  function handleLastNameChange(event) {
    const { value } = event.target
    setLastName(value)
  }

  function handleSubmit(event) {
    event.preventDefault()
    onCreate({ firstName, lastName })
  }

  function handleCancel() {
    setFirstName('')
    setLastName('')
  }

  return (
    <form onSubmit={handleSubmit} onReset={handleCancel}>
      <div>
        <label htmlFor="firstName">
          First Name:
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={handleFirstNameChange}
          />
        </label>
      </div>
      <div>
        <label htmlFor="lastName">
          Last Name:
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={handleLastNameChange}
          />
        </label>
      </div>
      <div>
        <button type="reset">Cancel</button>
        <button type="submit">Add Customer</button>
      </div>
    </form>
  )
}

function Customer({ firstName, lastName }) {
  return (
    <div>
      <h3>
        {lastName}, {firstName}
      </h3>
    </div>
  )
}

function CustomerList({ customers }) {
  return (
    <>
      <h2>Current Customers</h2>
      <ul>
        {customers.map(c => (
          <Customer key={c.id} {...c} />
        ))}
      </ul>
    </>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
