import React, { useEffect, useState } from 'react';

import Header from '../../components/Header'

import { Link } from 'react-router-dom'
import { Container } from './styles'

import api from '../../services/api';

interface NewInFormData {
  disciplina: string;
  professor: string;
  diasemana: string;
  periodo: string;
  horario: string;
}

const Dashboard: React.FC = () => {
  const [professores, setProfessores] = useState<NewInFormData[]>([])
  //console.log(professores)

  useEffect(() => {
    async function loadData(): Promise<void> {
      const response = await api.get('/professores')
      //console.log(response.data)
      setProfessores(response.data)
    }
    loadData();
  }, [])

  let professorUnico = []
  professorUnico = Array.from(new Set (professores.map(prof => prof.professor)))
  //console.log(professorUnico)

  return (
    <>
      <Header />
      <Container>
        <ul>
          {professorUnico.map((prof, index) => (
            <li key={index.toString()}>
              <Link to={`/details/${prof}`}>{prof}</Link>
            </li>
          ))}
        </ul>
      </Container>
    </>
  )
};

export default Dashboard;
