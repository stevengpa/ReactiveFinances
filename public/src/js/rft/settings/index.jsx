import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {observer} from 'mobx-react';

import ExchangeRate from './partials/exchange-rate';
import Category from './partials/category';

export default observer(['store'], React.createClass({
	displayName: 'Settings',
	componentWillMount() {
		this.translation = this.props.store.translation;
		this.currency = this.props.store.settings.currency;
		this.category = this.props.store.settings.category;

		this.currency.loadCurrency();
		this.category.loadCategories();
	},
	render() {
		return (
			<div>
				<ExchangeRate
					translation={this.translation}
					currency={this.currency}
				/>
				<Grid>
					<Row>
						<Col md={6}>
							<Category
								translation={this.translation}
								category={this.category}
							/>
						</Col>
						<Col md={6}/>
					</Row>
				</Grid>
			</div>
		);
	}
}));
