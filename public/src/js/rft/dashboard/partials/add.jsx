import React from 'react';
import _ from 'lodash';
import {Row, Col, Button, Glyphicon, Modal} from 'react-bootstrap';
import {Combobox, DropdownList} from 'react-widgets';
import DatePicker from 'react-bootstrap-date-picker';

export default React.createClass({
	displayName: 'Add Entry',
	getInitialState() {
		var entryDate = new Date().toISOString();
		return {
			isWizardOpen: false,
			category: {},
			label: {},
			entryDate,
			currency: ''
		};
	},
	propTypes: {
		translation: React.PropTypes.object.isRequired,
		currency: React.PropTypes.object.isRequired,
		category: React.PropTypes.object.isRequired,
		label: React.PropTypes.object.isRequired,
		stage: React.PropTypes.oneOf(['new', 'update']).isRequired
	},
	getDefaultProps() {
		return {
			stage: 'new'
		};
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

		const currencies = [this.currency.currency, 'USD'];

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
							<Col md={8}>
								<span>{this.props.translation.t('settings.entries.entry_date')}</span>
								<DatePicker
									value={this.state.entryDate}
									dateFormat="YYYY/MM/DD"
									onChange={(entryDate) => this.setState({entryDate})}
									monthLabels={this.props.translation.t('calendar_months')}
									dayLabels={this.props.translation.t('calendar_days')}
								/>
							</Col>
							<Col md={2}/>
						</Row>

						<Row>
							<Col md={2}/>
							<Col md={4}>
								<span>{this.props.translation.t('settings.exchange.currency')}</span>
								<DropdownList
									data={currencies}
									defaultValue={_.get(currencies, '[0]', '')}
									value={this.state.currency}
									onChange={(currency) => this.setState({currency})}
								/>
							</Col>
							<Col md={4}/>
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
});
