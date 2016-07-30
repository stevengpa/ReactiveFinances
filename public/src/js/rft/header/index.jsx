import React from 'react';
import {Navbar, Nav, NavItem, Button} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

export default function(props) {
	return (
		<div className="header">
			<Navbar>
				<Navbar.Header>
					<Navbar.Brand>
						<LinkContainer to="/">
							<a href="#" active={false}>Reactive Finance Tracking</a>
						</LinkContainer>
					</Navbar.Brand>
					<Navbar.Toggle />
				</Navbar.Header>
				<Navbar.Collapse>
					<Nav pullRight>
						<NavItem eventKey={1} href="#">Link Right</NavItem>
						<NavItem eventKey={2} href="#">Link Right</NavItem>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
}
