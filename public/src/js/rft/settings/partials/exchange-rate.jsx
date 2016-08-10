import React from 'react';
import {Grid, Row, Col, Form, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import {observer} from 'mobx-react';

export default observer(function (props) {
	return (
		<Grid className="exchange-container">
			<Row className="exchange-form">
				<Col md={2}/>
				<Col md={4} className="align-center">
					<Form inline>
						<FormGroup controlId="formInlineName">
							<ControlLabel>{props.translation.t('settings.local_currency')}</ControlLabel>
							{' '}
							<FormControl
								type="text"
								placeholder={props.translation.t('settings.local_currency_place')}
								className="align-center"
							/>
						</FormGroup>
					</Form>
				</Col>
				<Col md={4} className="align-center">
					<Form inline>
						<FormGroup controlId="formInlineName">
							<ControlLabel>{props.translation.t('settings.exchange_rate')}</ControlLabel>
							{' '}
							<FormControl
								type="text"
								placeholder={props.translation.t('settings.exchange_place')}
								className="align-center"
							/>
						</FormGroup>
					</Form>
				</Col>
				<Col md={2}/>
			</Row>
		</Grid>
	);
});
