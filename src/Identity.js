import React from "react";
import * as NetlifyIdentityWidget from "netlify-identity-widget";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const Identity = ({ children }) => {
  const [authed, setAuthed] = React.useState(false);

  const openLogin = () => {
    NetlifyIdentityWidget.open();
  };

  React.useEffect(() => {
    const didNotAuth = () => setAuthed(false);
    const didAuth = user => {
      if (user) {
        setAuthed(user);
      } else didNotAuth();
    };

    NetlifyIdentityWidget.on("init", didAuth);
    NetlifyIdentityWidget.on("login", didAuth);
    NetlifyIdentityWidget.on("logout", didNotAuth);
    NetlifyIdentityWidget.on("error", didNotAuth);

    NetlifyIdentityWidget.init({
      container: "#netlify-modal"
    });
  }, []);

  if (authed) {
    return (
      <div>
        {children(authed, () => {
          NetlifyIdentityWidget.logout();
          setAuthed(false);
        })}
      </div>
    );
  }
  return (
    <Container>
      <Row>
        <Col>
          <Button onClick={openLogin}>Login</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Identity;
