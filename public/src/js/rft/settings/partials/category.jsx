import React from 'react';
import {Row, Col, Form, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
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

	const cellEditProp = {
		mode: 'click',
		blurToSave: true,
		afterSaveCell: onAfterSaveCell
	};

	function onAfterSaveCell(row, cellName, cellValue) {
		const {id} = row;

		props.category.updateCategory(id, cellValue)
			.then(() => {
				Notify(props.translation.t('settings.category.category_update_ok'), 'success');
				row.category = cellValue;
				props.category.categories = _.chain(props.category.categories)
					.sortBy(['category'])
					.value();
			})
			.catch(() => {
				Notify(props.translation.t('settings.category.category_error'), 'error');
				props.category.loadCategories();
			});
	}

	function onSubmit(e) {
		e.preventDefault();
		return false;
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
				<Col md={12} className="align-center grid-container">
					<BootstrapTable
						data={props.category.categories.toJS()}
						striped={true}
						hover={true}
						condensed={true}
						cellEdit={cellEditProp}
						pagination={true}
					>

						<TableHeaderColumn
							dataField="id"
							isKey={true}
							hidden={true}
							editable={false}
						>
							id
						</TableHeaderColumn>

						<TableHeaderColumn
							dataField="category"
							editable={true}
							dataAlign="center"
							dataSort={true}
						>
							{props.translation.t('settings.category.grid.category')}
						</TableHeaderColumn>

						<TableHeaderColumn
							dataField="active"
							editable={true}
							dataAlign="center"
							dataSort={true}
						>
							{props.translation.t('settings.category.grid.active')}
						</TableHeaderColumn>

					</BootstrapTable>
				</Col>
			</Row>
		</div>
	);
});
