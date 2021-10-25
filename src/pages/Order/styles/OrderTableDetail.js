import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 85vh;
`;

export const Table = styled.form`
  width: 985px;
  background: #ffffff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  table {
    border-spacing: 0;
    width: 50%;
    height: 20%;
    border: 0.1px black;
  }
  tr {
    :last-child {
      td {
        border-bottom: 0;
      }
    }
  }
  th,
  td {
    padding: 0.5rem;
    border-bottom: 1px black;
    border-right: 1px black;
    :last-child {
      border-right: 0;
    }
  }
`;
