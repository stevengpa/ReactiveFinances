import React from 'react';
import {Grid, Row, Col, Form, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import {observer} from 'mobx-react';
import Notify from '../../../shared/notify';

import _ from 'lodash';
import classNames from 'classnames';

export default observer(function (props) {

	function onCurrencyChange(e) {
		props.currency.currency = _.toUpper(e.target.value);
	}

	function saveCurrency() {
		props.currency.saveCurrency()
			.then(() => Notify(props.translation.t('settings.exchange.currency_ok'), 'success'))
			.catch(() => {
				Notify(props.translation.t('settings.exchange.currency_error'), 'error');
				props.currency.loadCurrency();
			});
	}

	function saveExchange() {
		props.currency.saveExchange()
			.then(() => Notify(props.translation.t('settings.exchange.rate_ok'), 'success'))
			.catch(() => {
				Notify(props.translation.t('settings.exchange.rate_error'), 'error');
				props.currency.loadCurrency();
			});
	}

	function onExchangeRateChange(e) {
		props.currency.exchange = _.toInteger(e.target.value);
	}

	return (
		<Grid className="exchange-container">
			<Row className="exchange-form">
				<Col md={2}/>
				<Col md={4} className="align-center">
					<Form inline>
						<FormGroup controlId="formInlineName">
							<ControlLabel>{props.translation.t('settings.exchange.currency')}</ControlLabel>
							{' '}
							<FormControl
								type="text"
								placeholder={props.translation.t('settings.exchange.currency_place')}
								className={
									classNames({
										'align-center': true,
										'rft-input': props.currency.isValidCurrency,
										'rft-input-error': !props.currency.isValidCurrency
									})
								}
								value={props.currency.currency}
							  onChange={onCurrencyChange}
							  onBlur={saveCurrency}
							/>
						</FormGroup>
					</Form>
				</Col>
				<Col md={4} className="align-center">
					<Form inline>
						<FormGroup controlId="formInlineName">
							<ControlLabel>{props.translation.t('settings.exchange.rate')}</ControlLabel>
							{' '}
							<FormControl
								type="number"
								placeholder={props.translation.t('settings.exchange.rate_place')}
								className={
									classNames({
										'align-center': true,
										'rft-input': props.currency.isValidExchange,
										'rft-input-error': !props.currency.isValidExchange
									})
								}
								value={props.currency.exchange}
							  onChange={onExchangeRateChange}
							  onBlur={saveExchange}
							/>
						</FormGroup>
					</Form>
				</Col>
				<Col md={2}/>
			</Row>
		</Grid>
	);
});
