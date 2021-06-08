import styled from 'styled-components';

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
export const Disciplinas = styled.div`
  ul li {
    padding: 20px;
    display: flex;
    flex-direction: column;
  }
`;
