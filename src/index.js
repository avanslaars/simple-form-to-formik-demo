import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import uuid from 'uuid/v4'
import { Formik, Form, Field } from 'formik'
import { string, object } from 'yup'

import './styles.css'

const customerSchema = object().shape({
  firstName: string().required('First name is required'),
  lastName: string().required('Last name is required'),
})

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
  function handleSubmit({ firstName, lastName }, { resetForm }) {
    onCreate({ firstName, lastName })
    resetForm()
  }

  return (
    <Formik
      initialValues={{ firstName: '', lastName: '' }}
      onSubmit={handleSubmit}
      validationSchema={customerSchema}
    >
      {({ errors, touched }) => (
        <Form>
          <div>
            <label htmlFor="firstName">
              First Name:
              <Field name="firstName" />
            </label>
            {touched && errors.firstName && (
              <div className="feedback">{errors.firstName}</div>
            )}
          </div>
          <div>
            <label htmlFor="lastName">
              Last Name:
              <Field name="lastName" />
            </label>
            {touched && errors.lastName && (
              <div className="feedback">{errors.lastName}</div>
            )}
          </div>
          <div>
            <button type="reset">Cancel</button>
            <button type="submit">Add Customer</button>
          </div>
        </Form>
      )}
    </Formik>
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
