import React from 'react';
import _ from 'lodash';
import {observer} from 'mobx-react';
import {Row, Col, Button, Glyphicon, Modal, FormControl} from 'react-bootstrap';
import {Combobox} from 'react-widgets';
import DatePicker from 'react-bootstrap-date-picker';
import moment from 'moment';

import Notify from '../../../shared/notify';

export default observer(['store'], React.createClass({
	displayName: 'Add Entry',
	getInitialState() {
		return {
			isWizardOpen: false
		};
	},
	propTypes: {
		stage: React.PropTypes.oneOf(['new', 'update']).isRequired
	},
	getDefaultProps() {
		return {
			stage: 'new'
		};
	},
	componentWillMount() {
		this.translation = this.props.store.translation;
		this.currency = this.props.store.settings.currency;
		this.category = this.props.store.settings.category;
		this.label = this.props.store.settings.label;
		this.entry = this.props.store.entry;

		this.currency.loadCurrency()
			.then(({currency, exchange}) => {
				this.entry.currency = currency;
				this.entry.exchange = _.toNumber(exchange);
			});

		this.category.loadCategories();
		this.label.loadLabels();
	},
	open() {
		this.setState({isWizardOpen: true});
	},
	close() {
		this.setState({isWizardOpen: false});
	},
	setEntryDate(entryDate) {
		if (moment(entryDate, 'YYYY-MM-DD').isValid()) {
			this.entry.entryDate = new Date(entryDate).toISOString();
		} else {
			this.entry.entryDate = new Date().toISOString();
		}
	},
	saveEntry() {
		this.entry.saveEntry()
			.then(() => {
				Notify(this.translation.t('settings.entries.entry_ok'), 'success');
				this.entry.clean();
				this.entry.loadFilteredEntries();
			})
			.catch(() => {
				Notify(this.translation.t('settings.entries.entry_error'), 'error');
				this.entry.loadFilteredEntries();
			});
	},
	render() {
		const title = this.props.stage === 'new' ?
			this.translation.t('settings.entries.add_new_title') :
			this.translation.t('settings.entries.add_update_title');

		const actionText = this.props.stage === 'new' ?
			this.translation.t('actions.save') :
			this.translation.t('actions.update');

		const formatCategories = _.chain(this.category.categories.toJS())
			.filter({active: true})
			.map(({id, category}) => { return {id, category}; })
			.value();

		const formatLabel = _.chain(this.label.labels.toJS())
			.filter({active: true})
			.map(({id, label}) => { return {id, label}; })
			.value();

		const currencies = [this.currency.currency, this.currency.exchangeCurrency];

		return (
			<div className="add-container">
				<Button
					className="add-btn"
					bsStyle="success"
					onClick={this.open}
				>
					<Glyphicon className="add-icon" glyph="plus"/>
				</Button>

				<Modal
					show={this.state.isWizardOpen}
					onHide={this.close}
					className="add-modal-container"
				>

					<Modal.Header closeButton>
						<Modal.Title>{title}</Modal.Title>
					</Modal.Header>

					<Modal.Body className="body-entry-container">

						<Row>
							<Col md={2}/>
							<Col md={4} className="rft-input-group">
								<DatePicker
									value={this.entry.entryDate}
									dateFormat="YYYY-MM-DD"
									onChange={(entryDate) => this.setEntryDate(entryDate)}
									onBlur={(entryDate) => this.setEntryDate(`${_.get(entryDate, 'target.value')}${'T18:08:00.000Z'}`)}
									monthLabels={this.translation.t('calendar_months')}
									dayLabels={this.translation.t('calendar_days')}
									placeholder={this.translation.t('settings.entries.entry_date')}
								/>
							</Col>
							<Col md={4}>
								<FormControl
									type="number"
									value={this.entry.exchange}
									placeholder={this.translation.t('settings.exchange.rate_place')}
									onChange={(exchange) => this.entry.exchange = _.toNumber(exchange.target.value)}
									className="align-center rft-input"
									maxLength={20}
								/>
							</Col>
							<Col md={2}/>
						</Row>

						<Row>
							<Col md={2}/>
							<Col md={4} className="rft-input-group">
								<Combobox
									data={currencies}
									defaultValue={this.entry.currency}
									onChange={(currency) => this.entry.currency = currency}
									suggest={true}
									filter="contains"
									className="align-center"
									placeholder={this.translation.t('settings.exchange.currency')}
									maxLength={3}
								/>
							</Col>
							<Col md={4}>
								<FormControl
									type="number"
									value={this.entry.amount}
									placeholder={this.translation.t('settings.entries.amount_place')}
									onChange={(amount) => this.entry.amount = _.toNumber(amount.target.value)}
									className="align-right rft-input"
									maxLength={20}
								/>
							</Col>
							<Col md={2}/>
						</Row>

						<Row>
							<Col md={2}/>
							<Col md={8} className="rft-input-group">
								<Combobox
									valueField="id"
									textField="category"
									onChange={(category) => this.entry.category = category}
									data={formatCategories}
									suggest={true}
									filter="contains"
									placeholder={this.translation.t('settings.category.category')}
									maxLength={100}
								/>
							</Col>
							<Col md={2}/>
						</Row>

						<Row>
							<Col md={2}/>
							<Col md={8} className="rft-input-group">
								<Combobox
									valueField="id"
									textField="label"
									onChange={(label) => this.entry.label = label}
									data={formatLabel}
									suggest={true}
									filter="contains"
									placeholder={this.translation.t('settings.label.label')}
									maxLength={100}
								/>
							</Col>
							<Col md={2}/>
						</Row>

						<Row>
							<Col md={2}/>
							<Col md={8}>
								<FormControl
									type="text"
									value={this.entry.exchangeAmount}
									className="align-right rft-input exchange-rate"
									disabled={true}
									placeholder={`${this.translation.t('settings.exchange.exchange')} => ${this.entry.exchangeCurrency}`}
								/>
							</Col>
							<Col md={2}/>
						</Row>

						<Row>
							<Col md={2}/>
							<Col md={8}>
								<FormControl
									type="text"
									value={this.entry.description}
									onChange={(description) => this.entry.description = description.target.value}
									className="align-left rft-input"
									placeholder={this.translation.t('settings.entries.description')}
									maxLength={250}
								/>
							</Col>
							<Col md={2}/>
						</Row>

						<Row>
							<Col md={2}/>
							<Col md={8}>
								<Button
									block={true}
									bsStyle="success"
									className="btn-action"
									disabled={!this.entry.isValid}
									onClick={() => this.saveEntry()}
								>
									{actionText}
								</Button>
							</Col>
							<Col md={2}/>
						</Row>
					</Modal.Body>

				</Modal>
			</div>
		);
	}
}));
