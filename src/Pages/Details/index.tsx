import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';

import { FiArrowLeft } from 'react-icons/fi'
import { Container, Disciplinas, Form, Opcoes } from './styles';

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

interface NewInFormDataId {
  id: string;
  disciplina: string;
  professor: string;
  diasemana: string;
  periodo: string;
  horario: string;
}


const Details: React.FC = () => {
  const { params } = useRouteMatch<ProfessoresParametros>();
  //console.log(params)
  const [professores, setProfessores] = useState<NewInFormDataId[]>([])
  const [atualizar, setAtualizar] = useState(false)
  //console.log(professores)

  useEffect(() => {
    async function loadData(): Promise<void> {
      const response = await api.get('/professores')
      //console.log(response.data)
      setProfessores(response.data)
    }
    loadData();
  }, [])

  async function handleSubmit(event: any) {
    event.preventDefault();

    const { target: form } = event

    const professorAtualizado = {
      disciplina: form.disciplina.value,
      professor: form.professor.value,
      diasemana: form.diasemana.value,
      periodo: form.periodo.value,
      horario: form.horario.value,
    }

    await api.put(`/professores/${form.id.value}`, {
      ...professorAtualizado
    })
  }

  async function deletarProfessor(id: string) {
    await api.delete(`/professores/${id}`);
  };

  function formulario( data: NewInFormDataId) {
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name='professor'
          defaultValue={data.professor}
          required />
        <input
          type="text"
          name='disciplina'
          defaultValue={data.disciplina}
          required />
        <input
          type="text"
          name='diasemana'
          defaultValue={data.diasemana}
          required />
        <input
          type="text"
          name='periodo'
          defaultValue={data.periodo}
          required />
        <input
          type="text"
          name='horario'
          defaultValue={data.horario}
          required />
        <input
          style={{ display: 'none' }}
          type="text"
          name="id"
          defaultValue={data.id} />
        <button 
          type="submit"
          onClick={() =>{
            setAtualizar(false)
            window.location.reload()
          }}
        >Atualizar</button>
      </form>
    )
  }
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
  //console.log(prof)

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
              <Opcoes mostrar={atualizar}>
                <Form>
                  {formulario(p)}
                </Form>
              </Opcoes>
              <button 
                type="button"
                onClick={() => {
                  deletarProfessor(p.id);
                  window.location.reload();
                }}
              >Deletar</button>
              <button 
                type="button"
                onClick={() => {
                  formulario(p)
                  setAtualizar(true);
                }}
              >Editar</button>
            </li>
          ))}
        </ul>
      </Disciplinas>
    </Container>
  )
}

export default Details;
