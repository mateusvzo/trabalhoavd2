import styled from 'styled-components';

export const Container = styled.form`
  width: 100%;
  max-width: 580px;
  margin: 30px auto 0;
  padding: 30px;

  display: flex;
  flex-direction: column;

  h1 {
    margin-bottom: 10px;
  }
  
  a {
      background: #ff9000;
      height: 25px;
      border-radius: 10px;
      border: 0;
      padding: 0 16px;
      color: #312e38;
      width: 20%;
      display: block;
      margin-top: 24px;
      transition: color 0.2s;
      text-decoration: none;

      display: flex;
      align-items: center;

      svg {
        margin-right: 16px;
      }
  }
`;