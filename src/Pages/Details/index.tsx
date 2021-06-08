import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';

import { FiArrowLeft } from 'react-icons/fi'
import { Container, Disciplinas } from './styles';

import api from '../../services/api';


interface ProfessoresParametros {
  professor: string;
}

interface NewInFormData {
  disciplina: string;
  professor: string;
  diasemana: string;
  periodo: string;
  horario: string;
}


const Details: React.FC = () => {
  const { params } = useRouteMatch<ProfessoresParametros>();
  console.log(params)
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
  // const [professores, setProfessores] = useState<NewInFormData[]>(() => {
  //   const storagedProfessores = localStorage.getItem('@professores:cadastro')

  //   if (storagedProfessores) {
  //     return JSON.parse(storagedProfessores)
  //   }

  //   return [];
  // });

  let prof = professores.filter(e => {
    return e.professor === params.professor}
  )
  console.log(prof)

  return (
    <Container>
      <Link to="/dashboard">
        <FiArrowLeft />
      </Link>
      <Disciplinas>
        <ul>
          {prof.map((p, index) =>(
            <li key={index}>
              <span>Professor: {p.professor}</span>
              <span>Disciplina: {p.disciplina}</span>
              <span>Dia Semana: {p.diasemana}</span>
              <span>Periodo: {p.periodo}</span>
              <span>Horario: {p.horario}</span>
            </li>
          ))}
        </ul>
      </Disciplinas>
    </Container>
  )
}

export default Details;
