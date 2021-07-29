import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const Form = styled.form`
  width: 400px;
  background: #ffffff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    color: #0000ff;
    margin-bottom: 20px;
    padding: 10px;
    width: 100%;
    text-align: center;
  }
  input {
    flex: 1;
    height: 20px;
    margin-bottom: 10px;
    padding: 0.5em;
    color: #777;
    border: 1px solid #777;
    border-radius: 4px;
    &:focus {
      outline: none;
      border-color: #0000ff;
    }
    font-size: 20px;
    width: 100%;
    &::placeholder {
      color: #999;
    }
  }
  button {
    color: #ffffff;
    font-size: 1em;
    background: #0000ff;
    height: 68px;
    border: 2px solid;
    border-radius: 5px;
    width: 100%;
  }
  hr {
    margin: 20px 0;
    border: none;
    width: 100px;
    border-bottom: 1px solid #000000;
  }
  a {
    font-size: 20;
    color: #999;
    text-decoration: none;
    font-weight: bold;
  }
`;
