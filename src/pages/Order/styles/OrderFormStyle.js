import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 140vh;
`;

export const Form = styled.form`
  width: 985px;
  background: #ffffff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    color: #3ea175;
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
      border-color: #3ea175;
    }
    font-size: 20px;
    width: 100%;
    &::placeholder {
      color: #999;
    }
  }
  textarea {
    flex: 1;
    height: 20px;
    margin-bottom: 10px;
    padding: 0.5em;
    color: #777;
    border: 1px solid #777;
    border-radius: 4px;
    &:focus {
      outline: none;
      border-color: #3ea175;
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
    background: #3ea175;
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
  select {
    flex: 1;
    height: 20px;
    margin-bottom: 10px;
    padding: 0.5em;
    border-radius: 4px;
    font-size: 20px;
    width: 100%;
  }
`;
