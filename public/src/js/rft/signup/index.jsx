import React from 'react';
import _ from 'lodash';
import {observer} from 'mobx-react';
import {Grid, Row, Col, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {isEmail} from 'validator';

const CODE_LEN = 10;

export default observer(['store'], React.createClass({
	displayName: 'SignUp',
	getInitialState() {
		return {
			email: '',
			code: ''
		};
	},
	componentWillMount() {
		this.login = this.props.store.login;
		this.translation = this.props.store.translation;
	},
	emailChange(e) {
		this.setState({ email: e.target.value });
	},
	codeChange(e) {
		this.setState({ code: e.target.value });
	},
	validateEmail() {
		const {email} = this.state;
		if (isEmail(email) && _.size(email) > 0) {
			this.login.setIsEmailOK(true);
			return 'success';

		} else if (!isEmail(email) && _.size(email) > 0) {
			this.login.setIsEmailOK(false);
			return 'error';
		}
	},
	validateCode() {
		const {code} = this.state;
		const codeLen = _.size(code);

		if (codeLen === CODE_LEN) {
			this.login.setIsCodeOK(true);
			return 'success';

		} else if (codeLen < CODE_LEN && code !== '') {
			this.login.setIsCodeOK(false);
			return 'error';
		}
	},
	getFormState() {
		return false;
	},
	render() {
		return (
			<Grid className="login">

				<Row className="align-center">
					<Col md={12}>
						<h1>{this.translation.t('signup.title')}</h1>
						<hr/>
					</Col>
				</Row>

				<Row className="form-container">
					<Col md={4} xs={2} sm={2}/>
					<Col md={4} xs={8} sm={8}>
						<form>
							<FormGroup
								controlId="formBasicText"
								validationState={this.validateEmail()}
							>
								<ControlLabel>{this.translation.t('signup.email')}</ControlLabel>
								<FormControl
									type="text"
									value={this.state.email}
									placeholder={this.translation.t('signup.email_place')}
									onChange={this.emailChange}
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
							disabled={this.login.isFormOK}
						>
							{this.translation.t('signup.signup')}
						</Button>
					</Col>
					<Col md={4} xs={2} sm={2}/>
				</Row>

			</Grid>
		);
	}
}));
