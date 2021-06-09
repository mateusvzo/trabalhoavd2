import styled, { css } from 'styled-components';

interface Op {
  mostrar: boolean;
}

export const Container = styled.section`
  width: 100%;
  max-width: 580px;
  margin: 0 auto;
  padding: 0 30px;
  /* border: 1px solid #DDD; */
  border: 1px solid #ff9000;
  margin-top: 30px;

  a {
        color: #f4ede8;
        display: block;
        margin-top: 24px;
        transition: color 0.2s;
    }
`;

export const Opcoes = styled.div<Op>`
  width: 100%;
  visibility: hidden;
  height: 0;

  ${props =>
    props.mostrar === true &&
    css`
      visibility: visible;
      height: 10rem;
    `}
`;

export const Form = styled.div`
  form {
    width: 100%;
    input {
      width: 100%;
      margin-top: 0.2rem;
    }
  }
`;

export const Disciplinas = styled.div`
  ul li {
    padding: 20px;
    display: flex;
    flex-direction: column;
  }
`;

