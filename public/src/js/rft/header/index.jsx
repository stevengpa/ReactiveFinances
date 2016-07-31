import React from 'react';
import {Navbar, Nav, NavItem, Button, Glyphicon} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

export default function(props) {
	return (
		<div className="header">
			<Navbar>
				<Navbar.Header>
					<Navbar.Brand>
						<LinkContainer to="/" className="btn-link header-brandname">
							<Button><span className="label-reactive">Reactive</span> Finance Tracking</Button>
						</LinkContainer>
					</Navbar.Brand>
					<Navbar.Toggle />
				</Navbar.Header>
				<Navbar.Collapse>

					<Nav pullRight>
						<LinkContainer to="/login" className="btn-link header-brandname">
							<NavItem><Glyphicon glyph="user" />&nbsp;&nbsp;Log In</NavItem>
						</LinkContainer>

						<LinkContainer to="/settings" className="btn-link header-brandname">
							<NavItem><Glyphicon glyph="cog" />&nbsp;&nbsp;Settings</NavItem>
						</LinkContainer>
					</Nav>

				</Navbar.Collapse>
			</Navbar>
		</div>
	);
}
