import React from 'react';
import _ from 'lodash';
import {observer} from 'mobx-react';
import {Row, Col, Button, Glyphicon} from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import numeral from 'numeral';
import moment from 'moment';

import Notify from '../../../shared/notify';

export default observer(['store'], React.createClass({
	componentWillMount() {
		this.tables = this.props.store.tables;
		this.translation = this.props.store.translation;
		this.entry = this.props.store.entry;
	},
	deleteEntry(id) {
		this.entry.deleteEntry(id)
			.then(({status}) => {
				if (status === 200) {
					Notify(this.translation.t('settings.entries.delete_ok'), 'success');
					this.entry.loadFilteredEntries();
				} else {
					throw new Error('Something wrong happened');
				}
			})
			.catch(() => {
				Notify(this.translation.t('settings.entries.delete_error'), 'error');
				this.entry.loadFilteredEntries();
			});
	},
	formatAmount(cell) {
		return numeral(_.toNumber(cell)).format('0,0.[00]');
	},
	formatDate(cell) {
		return moment(new Date(cell)).format('YYYY-MM-DD');
	},
	formatDelete(cell, {id}) {
		return (
			<Button
				bsStyle="danger"
				bsSize="xsmall"
				className="delete-entry"
				onClick={() => this.deleteEntry(id)}
			>
				<Glyphicon glyph="trash"/>{this.translation.t('table_summary.columns.delete')}
			</Button>
		);
	},
	render() {
		return (
			<Row className="summary-table-container">
				<Col xs={1}/>
					<Col xs={10}>
						<BootstrapTable
							data={this.tables.tableSummary}
							striped={true}
							hover={true}
							condensed={true}
							pagination={true}
							search={true}
							exportCSV={true}
							csvFileName="reactive-finances.csv"
							searchPlaceholder={this.translation.t('table_summary.columns.search')}
						>
							{/*ID*/}
							<TableHeaderColumn
								dataField="id"
								isKey={true}
								hidden={true}
								width="70"
							>
								{this.translation.t('table_summary.columns.id')}
							</TableHeaderColumn>
							{/*Category*/}
							<TableHeaderColumn
								dataField="category"
								width="150"
								dataSort={true}
							>
								{this.translation.t('table_summary.columns.category')}
							</TableHeaderColumn>
							{/*Label*/}
							<TableHeaderColumn
								dataField="label"
								width="200"
								dataSort={true}
							>
								{this.translation.t('table_summary.columns.label')}
							</TableHeaderColumn>
							{/*Amount USD*/}
							<TableHeaderColumn
								dataField="amount_usd"
								dataFormat={this.formatAmount}
								width="150"
								dataAlign="right"
								dataSort={true}
							>
								{this.translation.t('table_summary.columns.amount_usd')}
							</TableHeaderColumn>
							{/*Amount Local*/}
							<TableHeaderColumn
								dataField="amount_lc"
								dataFormat={this.formatAmount}
								width="150"
								dataAlign="right"
								dataSort={true}
							>
								{this.translation.t('table_summary.columns.amount_lc')}
							</TableHeaderColumn>
							{/*Amount*/}
							<TableHeaderColumn
								dataField="amount"
								dataFormat={this.formatAmount}
								width="150"
								dataAlign="right"
								dataSort={true}
							>
								{this.translation.t('table_summary.columns.amount')}
							</TableHeaderColumn>
							{/*Currency*/}
							<TableHeaderColumn
								dataField="currency"
								width="150"
								dataAlign="center"
								dataSort={true}
							>
								{this.translation.t('table_summary.columns.currency')}
							</TableHeaderColumn>
							{/*Exchange*/}
							<TableHeaderColumn
								dataField="exchange"
								width="100"
								dataAlign="center"
								dataSort={true}
							>
								{this.translation.t('table_summary.columns.exchange')}
							</TableHeaderColumn>
							{/*Month*/}
							<TableHeaderColumn
								dataField="month"
								width="100"
								dataAlign="center"
								dataSort={true}
							>
								{this.translation.t('table_summary.columns.month')}
							</TableHeaderColumn>
							{/*Year*/}
							<TableHeaderColumn
								dataField="year"
								width="100"
								dataAlign="center"
								dataSort={true}
							>
								{this.translation.t('table_summary.columns.year')}
							</TableHeaderColumn>
							{/*Date*/}
							<TableHeaderColumn
								dataField="entry_date"
								dataFormat={this.formatDate}
								width="150"
								dataAlign="center"
								dataSort={true}
							>
								{this.translation.t('table_summary.columns.entry_date')}
							</TableHeaderColumn>
							{/*Entry Date*/}
							<TableHeaderColumn
								dataField="entry_date_time"
								dataFormat={this.formatDate}
								width="150"
								dataAlign="center"
								dataSort={true}
							>
								{this.translation.t('table_summary.columns.entry_date_time')}
							</TableHeaderColumn>
							{/*Description*/}
							<TableHeaderColumn
								dataField="description"
								width="500"
								dataSort={true}
							>
								{this.translation.t('table_summary.columns.description')}
							</TableHeaderColumn>
							{/*Delete*/}
							<TableHeaderColumn
								dataFormat={this.formatDelete}
								width="150"
								dataAlign="center"
							/>
						</BootstrapTable>
					</Col>
				<Col xs={1}/>
			</Row>
		);
	}
}));
