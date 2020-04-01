import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2, FiEdit } from 'react-icons/fi'

import api from '../../services/api'

import logoImg from '../../assets/logo.svg'

import './style.css'

export default function Profile() {
  const [incidents, setIncidents] = useState([])

  const history = useHistory()

  // Se não estiver a ong não estiver logada será enviada para logon
  if (!localStorage.getItem('ongId')) {
    history.push('/')
  }

  const ongId = localStorage.getItem('ongId')
  const ongName = localStorage.getItem('ongName')

  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: ongId,
      }
    }).then(res => {
      setIncidents(res.data)
    })
  }, [ongId])

  function handleUpdateIncident(id, title, description, value) {
    localStorage.setItem('incidentId', id)
    localStorage.setItem('incidentTitle', title)
    localStorage.setItem('incidentDescription', description)
    localStorage.setItem('incidentValue', value)

    history.push('incidents/edit')
  }

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId,
        }
      })

      setIncidents(incidents.filter(incident => incident.id !== id))
    } catch (err) {
      alert('Erro ao deletar caso, tente novamente.')
    }
  }

  function handleLogout() {
    localStorage.clear()

    history.push('/')
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />

        <span>Bem vinda, {ongName}</span>

        <div className="responsive-flex">
          <Link className="button" to="/incidents/new">
            Cadastrar novo caso
          </Link>

          <button type="button" onClick={handleLogout}>
            <FiPower size={18} color="#E02041" />
          </button>
        </div>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {incidents.length < 1 ?
          <h3>Nenhum caso cadastrado</h3> :
          incidents.map(incident => (
            <li key={incident.id}>
              <strong>CASO:</strong>
              <p>{incident.title}</p>

              <strong>DESCRIÇÃO:</strong>
              <p>{incident.description}</p>

              <strong>VALOR:</strong>
              <p>
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(incident.value)}
              </p>

              <div className="buttons-group">

                <button type="button" onClick={() => handleUpdateIncident(
                  incident.id,
                  incident.title,
                  incident.description,
                  incident.value
                )}>
                  <FiEdit size={20} color="#E02041" />
                </button>

                <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
                  <FiTrash2 size={20} color="#a8a8b3" />
                </button>
              </div>
            </li>
          ))
        }
      </ul>

    </div>
  )
}
