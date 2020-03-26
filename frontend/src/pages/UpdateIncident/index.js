import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api'

import logoImg from '../../assets/logo.svg'

import "./style.css"

export default function UpdateIncident() {
  const ongId = localStorage.getItem('ongId')
  const incidentId = localStorage.getItem('incidentId')
  const incidentTitle = localStorage.getItem('incidentTitle')
  const incidentDescription = localStorage.getItem('incidentDescription')
  const incidentValue = localStorage.getItem('incidentValue')

  const [title, setTitle] = useState(incidentTitle)
  const [description, setDescription] = useState(incidentDescription)
  const [value, setValue] = useState(incidentValue)

  const history = useHistory()

  function removeLocalStorage() {
    localStorage.removeItem('incidentId')
    localStorage.removeItem('incidentTitle')
    localStorage.removeItem('incidentDescription')
    localStorage.removeItem('incidentValue')
  }

  async function handleUpdateIncident(e) {
    e.preventDefault()

    const data = {
      title,
      description,
      value
    }

    try {
      await api.put(`incidents/edit/${incidentId}`, data, {
        headers: {
          Authorization: ongId,
        }
      })

      removeLocalStorage()
      history.push('/profile')
    } catch (err) {
      removeLocalStorage()
      alert('Erro ao editar caso, tente novamente.')
    }
  }

  return (
    <div className="edit-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Editar o caso</h1>

          <p>
            Edite o caso do seu jeito
            para encontar um herói para resolver isso.
          </p>

          <Link className="back-link" to="/profile" onClick={removeLocalStorage}>
            <FiArrowLeft size={16} color="#E02041" />
              Voltar para home
          </Link>
        </section>

        <form onSubmit={handleUpdateIncident}>
          <input
            placeholder="Título do caso"
            required
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Descrição. Máximo de 250"
            maxLength="250"
            required
            value={description}
            onChange={e => setDescription(e.target.value)}
          />

          <input
            type="number"
            placeholder="Valor em reais. Exemplo: 199.99"
            required
            value={value}
            onChange={e => setValue(e.target.value)}
          />

          <button className="button" type="submit">Editar</button>
        </form>
      </div>
    </div>
  )
}
