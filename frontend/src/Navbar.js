import { Container, Nav, Navbar, Button, Form, NavDropdown} from 'react-bootstrap';


function NavBarMain(prop) {
  return (
    <Navbar expand="md" className="bg-body-tertiary py-3 fixed-top" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand href="#home" className="fs-4 text-white mb-0">
            <img
              alt=""
              src={prop.logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Megasub AutoBot
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Backtest</Nav.Link>
            <Nav.Link href="#pricing">Strategy</Nav.Link>
            <NavDropdown title="Settings" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">API Settings</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
              
            </NavDropdown>
            <Nav.Link href="#wwqewe" className="d-block d-md-none">Sign-up</Nav.Link>
            <Nav.Link href="#pricing" className="d-block d-md-none">Login</Nav.Link>
          </Nav>
          <Nav className="ms-auto link-light d-flex">
            <Container fluid="md">
              <Form className="d-flex d-none d-md-block">
                <Button variant="primary" className = "me-2">Sign-up</Button>{' '}
                <Button variant="primary">Login</Button>{' '}
              </Form>
            </Container>
          </Nav>
        </Navbar.Collapse>
        
      </Container>
    </Navbar>

  );
}

export default NavBarMain;
