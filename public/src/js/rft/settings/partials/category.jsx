import React from 'react';
import {Row, Col, Form, FormGroup, FormControl, ControlLabel, Input} from 'react-bootstrap';
import _ from 'lodash';
import classNames from 'classnames';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {observer} from 'mobx-react';

import Notify from '../../../shared/notify';

export default observer(function Category(props) {

	function onCategoryChange(e) {
		props.category.category = e.target.value;
	}

	function saveCategory(e) {
		if (e.which === 13 || e.keyCode === 13) {
			props.category.saveCategory()
				.then(() => {
					Notify(props.translation.t('settings.category.category_ok'), 'success');
					_.delay(() => props.category.category = '', 500);
				})
				.catch(() => {
					Notify(props.translation.t('settings.category.category_error'), 'error');
					props.category.loadCategories();
				});
		}
	}

	function onSubmit(e) {
		e.preventDefault();
		return false;
	}

	function categoryFormatter(cell, row) {
		console.log('=========  row  =========');
		console.log(row.category);
		console.log(row.id);
		console.log('=====  End of row>  =====');
		console.log('=========  cell  =========');
		console.log(cell);
		console.log('=====  End of cell>  =====');
		return (
			<Input
				key={row.id}
				type="text"
				class="form-control"
			  value={cell}
			/>
		);
	}

	return (
		<div className="category-container">
			<Row className="category-form">
				<Col md={2}/>
				<Col md={8} className="align-center">
					<Form inline onSubmit={onSubmit}>
						<FormGroup controlId="formInlineName">
							<ControlLabel>{props.translation.t('settings.category.category')}</ControlLabel>
							{' '}
							<FormControl
								type="text"
								placeholder={props.translation.t('settings.category.category_place')}
								className={
									classNames({
										'align-center': true,
										'rft-input': props.category.isValidCategory,
										'rft-input-error': !props.category.isValidCategory
									})
								}
								value={props.category.category}
								onChange={onCategoryChange}
								onKeyUp={saveCategory}
							/>
						</FormGroup>
					</Form>
				</Col>
				<Col md={2}/>
			</Row>
			<Row>
				<Col md={2}/>
				<Col md={8} className="align-center">
					<BootstrapTable
						data={props.category.categories}
						striped={true}
						hover={true}
						condensed={true}
					>

						<TableHeaderColumn
							dataField="id"
							isKey={true}
							hidden={true}
						>
							id
						</TableHeaderColumn>

						<TableHeaderColumn
							dataAlign="center"
							dataSort={true}
							dataFormat={categoryFormatter}
						>
							{props.translation.t('settings.category.grid.category')}
						</TableHeaderColumn>

					</BootstrapTable>
				</Col>
				<Col md={2}/>
			</Row>
		</div>
	);
});
