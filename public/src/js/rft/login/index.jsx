import React from 'react';
import _ from 'lodash';
import {observer} from 'mobx-react';
import {Grid, Row, Col, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {isEmail} from 'validator';



export default observer(['store'], React.createClass({
	displayName: 'Login',
	componentWillMount() {
		this.login = this.props.store.login;
		this.translation = this.props.store.translation;
	},
	emailChange(e) {
		this.login.setEmail(e.target.value);
	},
	codeChange(e) {
		this.login.setCode(e.target.value);
	},
	render() {
		return (
			<Grid className="login">

				<Row className="align-center">
					<Col md={12}>
						<h1>{this.translation.t('login.title')}</h1>
						<hr/>
					</Col>
				</Row>

				<Row className="form-container">
					<Col md={4} xs={2} sm={2}/>
					<Col md={4} xs={8} sm={8}>
						<form>
							<FormGroup
								controlId="formBasicText"
								validationState={this.login.formEmailState}
							>
								<ControlLabel>{this.translation.t('login.email')}</ControlLabel>
								<FormControl
									type="text"
									value={this.login.email}
									placeholder={this.translation.t('login.email_place')}
									onChange={(e) => this.login.setEmail(e.target.value)}
								/>
								<FormControl.Feedback />
							</FormGroup>

							<FormGroup
								controlId="formBasicText"
								validationState={this.login.formCodeState}
							>
								<ControlLabel>{this.translation.t('login.code')}</ControlLabel>
								<FormControl
									type="text"
									value={this.login.code}
									placeholder={this.translation.t('login.code_place')}
									onChange={(e) => this.login.setCode(e.target.value)}
								/>
								<FormControl.Feedback />
							</FormGroup>
						</form>
					</Col>
					<Col md={4} xs={2} sm={2}/>
				</Row>

				<Row>
					<Col md={4} xs={2} sm={2}/>
					<Col md={4} xs={8} sm={8}>
						<Button
							block={true}
							bsStyle="success"
							disabled={this.login.disabled}
						>
								{this.translation.t('login.login')}
						</Button>
					</Col>
					<Col md={4} xs={2} sm={2}/>
				</Row>

				<Row>
					<Col md={4} xs={2} sm={2}/>
					<Col md={4} xs={8} sm={8}>
						<LinkContainer to="/signup">
							<Button block={true} bsStyle="link">{this.translation.t('login.signup')}</Button>
						</LinkContainer>
					</Col>
					<Col md={4} xs={2} sm={2}/>
				</Row>

			</Grid>
		);
	}
}));
