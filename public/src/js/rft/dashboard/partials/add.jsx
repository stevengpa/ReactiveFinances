import React from 'react';
import _ from 'lodash';
import {observer} from 'mobx-react';
import {Row, Col, Button, Glyphicon, Modal, FormControl} from 'react-bootstrap';
import {Combobox} from 'react-widgets';
import DatePicker from 'react-bootstrap-date-picker';

export default observer(['store'], React.createClass({
	displayName: 'Add Entry',
	getInitialState() {
		var entryDate = new Date().toISOString();
		return {
			isWizardOpen: false,
			category: {},
			label: {},
			entryDate,
			currency: '',
			exchange: '',
			amount: 0
		};
	},
	propTypes: {
		translation: React.PropTypes.object.isRequired,
		category: React.PropTypes.object.isRequired,
		label: React.PropTypes.object.isRequired,
		stage: React.PropTypes.oneOf(['new', 'update']).isRequired
	},
	getDefaultProps() {
		return {
			stage: 'new'
		};
	},
	componentWillMount() {
		_.delay(() => {
			const {currency, exchange} = this.props.currency;
			if (_.size(this.state.exchange) === 0) {
				this.setState({exchange});
			}

			if (_.size(this.state.currency.currency) === 0) {
				this.setState({currency});
			}
		}, 1000);
	},
	open() {
		this.setState({isWizardOpen: true});
	},
	close() {
		this.setState({isWizardOpen: false});
	},
	render() {
		const title = this.props.stage === 'new' ?
			this.props.translation.t('settings.entries.add_new_title') :
			this.props.translation.t('settings.entries.add_update_title');

		const formatCategories = _.chain(this.props.category.categories.toJS())
			.filter({active: true})
			.map(({id, category}) => { return {id, category}; })
			.value();

		const formatLabel = _.chain(this.props.label.labels.toJS())
			.filter({active: true})
			.map(({id, label}) => { return {id, label}; })
			.value();

		const currencies = [this.props.currency.currency, 'USD'];

		return (
			<div className="add-container">
				<Button
					className="add-btn"
					bsStyle="success"
					onClick={this.open}
				>
					<Glyphicon className="add-icon" glyph="plus"/>
				</Button>

				<Modal show={this.state.isWizardOpen} onHide={this.close}>

					<Modal.Header closeButton>
						<Modal.Title>{title}</Modal.Title>
					</Modal.Header>

					<Modal.Body>

						<Row>
							<Col md={2}/>
							<Col md={4}>
								<span>{this.props.translation.t('settings.entries.entry_date')}</span>
								<DatePicker
									value={this.state.entryDate}
									dateFormat="YYYY-MM-DD"
									onChange={(entryDate) => this.setState({entryDate})}
									monthLabels={this.props.translation.t('calendar_months')}
									dayLabels={this.props.translation.t('calendar_days')}
								/>
							</Col>
							<Col md={4}>
								<span>{this.props.translation.t('settings.exchange.exchange')}</span>
								<FormControl
									type="number"
									value={this.state.exchange}
									placeholder={this.props.translation.t('settings.exchange.rate_place')}
									onChange={(exchange) => this.setState({exchange})}
									className="align-center"
								/>
							</Col>
							<Col md={2}/>
						</Row>

						<Row>
							<Col md={2}/>
							<Col md={4}>
								<span>{this.props.translation.t('settings.exchange.currency')}</span>
								<Combobox
									data={currencies}
									value={this.state.currency}
									onChange={(currency) => this.setState({currency: currency.target.value})}
									suggest={true}
									filter="contains"
									className="align-center"
								/>
							</Col>
							<Col md={4}>
								<span>{this.props.translation.t('settings.entries.amount')}</span>
								<FormControl
									type="number"
									value={this.state.amount}
									placeholder={this.props.translation.t('settings.entries.amount_place')}
									onChange={(amount) => this.setState({amount: amount.target.value})}
									className="align-right"
								/>
							</Col>
							<Col md={2}/>
						</Row>

						<Row>
							<Col md={2}/>
							<Col md={8}>
								<span>{this.props.translation.t('settings.category.category')}</span>
								<Combobox
									valueField='id' textField='category'
									onChange={(category) => this.setState({category})}
									data={formatCategories}
									suggest={true}
									filter="contains"
								/>
							</Col>
							<Col md={2}/>
						</Row>

						<Row>
							<Col md={2}/>
							<Col md={8}>
								<span>{this.props.translation.t('settings.label.label')}</span>
								<Combobox
									valueField='id' textField='label'
									onChange={(label) => this.setState({label})}
									data={formatLabel}
									suggest={true}
									filter="contains"
								/>
							</Col>
							<Col md={2}/>
						</Row>

					</Modal.Body>

					<Modal.Footer>
						<Button onClick={this.close}>Close</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	}
}));
