import React, { useRef, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { FiArrowLeft } from 'react-icons/fi';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container } from './styles'
import api from '../../services/api';

interface NewInFormData {
  disciplina: string;
  professor: string;
  diasemana: string;
  periodo: string;
  horario: string;
}

const New: React.FC = () => {
  const [professores, setProfessores] = useState<NewInFormData[]>([]);
  // const [professores, setProfessores] = useState<NewInFormData[]>(() => {
  //     const storagedProfessores = localStorage.getItem('@professores:cadastro');

  //   if(storagedProfessores) {
  //     return JSON.parse(storagedProfessores)
  //   }

  //   return [];
  // });

  const formRef = useRef<FormHandles>(null);

  // useEffect(() => {
  //   api.post('/professores', professores)
  // }, [professores])
  
  // useEffect(() => {
  //   localStorage.setItem(
  //     '@professores:cadastro',
  //     JSON.stringify(professores)
  //   )
  // }, [professores])

  const handleSubmit = useCallback(async (data: NewInFormData) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        disciplina: Yup.string().required('Disciplina obrigatória'),
        professor: Yup.string().required('Professor obrigatório'),
        diasemana: Yup.string().required('Dia Semana obrigatório'),
        periodo: Yup.string().required('Periodo obrigatório'),
        horario: Yup.string().required('Horário obrigatório')
      })
      await schema.validate(data, {
        abortEarly: false,
      });
      //console.log(data)
      await api.post('/professores', data);
      setProfessores([...professores, data])
      //console.log(professores)
      formRef.current?.reset()

    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);
        formRef.current?.setErrors(errors);
      }
    }
  }, [professores]);

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Cadastro Professores/Disciplina</h1>
        <Input name="disciplina" placeholder="Disciplina" />
        <Input name="professor" placeholder="Professor" />
        <Input name="diasemana" placeholder="Dia Semana" />
        <Input name="periodo" placeholder="Periodo" />
        <Input name="horario" placeholder="Horario" />
        <Button type="submit">Entrar</Button>
      </Form>
      <Link to="/dashboard">
        <FiArrowLeft />
        Voltar
      </Link>
    </Container>
  )
}

export default New