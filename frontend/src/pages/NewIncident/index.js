import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api'

import logoImg from '../../assets/logo.svg'

import './style.css'

export default function NewIncident() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [value, setValue] = useState("")

  const history = useHistory()

  const ongId = localStorage.getItem('ongId')

  async function handleNewIncident(e) {
    e.preventDefault()

    const data = {
      title,
      description,
      value
    }

    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: ongId,
        }
      })

      history.push('/profile')
    } catch (err) {
      alert('Erro ao cadastrar caso, tente novamente.')
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Cadastrar novo caso</h1>

          <p>
            Descreva o caso detalhadamente
            para encontar um herói para resolver isso.
          </p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            voltar para home
          </Link>
        </section>

        <form onSubmit={handleNewIncident}>
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

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  )
}
