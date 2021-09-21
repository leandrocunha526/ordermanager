import { Component } from "react";
import { withRouter } from "react-router-dom";
import { Container } from "./style.js";
import Title from "../../components/title";
import notFound from "../../assets/notfound.svg";
import {Link} from "react-router-dom";

class NotFound extends Component {
  render() {
    return (
      <Container>
        <Title title="Error 404" />
        <p>A página que você está procurando não está aqui</p>
        <img
          alt="Error 404"
          src={notFound}
          style={{
            marginTop: 50,
            display: "inline-block",
            maxWidth: "100%",
            width: 560,
          }}
        />
        <Link to="/dashboard">Retornar ao dashboard</Link>
      </Container>
    );
  }
}

export default withRouter(NotFound);
