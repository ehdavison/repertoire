import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { NavDropdown } from 'react-bootstrap'

const authenticatedOptions = (
  <Fragment>
    {/* <Nav.Link href="#change-password">Change Password</Nav.Link> */}
    {/* <Nav.Link href="#sign-out">Sign Out</Nav.Link> */}
    <Nav.Link href="#song-create">Create Song</Nav.Link>
    <NavDropdown title="Account" id="basic-nav-dropdown">
      <NavDropdown.Item href="#sign-out">Sign Out</NavDropdown.Item>
      <NavDropdown.Item href="#change-password">Change Password</NavDropdown.Item>
    </NavDropdown>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
  </Fragment>
)

// const alwaysOptions = (
//   <Fragment>
//     <Nav.Link href="#/">Home</Nav.Link>
//   </Fragment>
// )

const Header = ({ user }) => (
  <Navbar className="nav" variant="dark" expand="md">
    <Navbar.Brand href="#songs">
      repertoire
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>}
        {/* { alwaysOptions } */}
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
