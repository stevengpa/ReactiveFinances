import React from 'react';
import {Row, Col, Form, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import _ from 'lodash';
import classNames from 'classnames';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {observer} from 'mobx-react';

import Notify from '../../../shared/notify';

export default observer(function Label(props) {

	function onLabelChange(e) {
		props.label.label = e.target.value;
	}

	function saveLabel(e) {
		if (e.which === 13 || e.keyCode === 13) {
			props.label.saveLabel()
				.then(() => {
					Notify(props.translation.t('settings.label.label_ok'), 'success');
					props.label.label = '';
					props.label.loadLabels();
				})
				.catch(() => {
					Notify(props.translation.t('settings.label.label_error'), 'error');
					props.label.loadLabels();
				});
		}
	}

	function activeFormatter(cell, row) {
		const active = _.toString(cell) === 'true';
		return (
			<input type="checkbox" defaultChecked={active}/>
		);
	}

	const cellEditProp = {
		mode: 'click',
		blurToSave: false,
		afterSaveCell: onAfterSaveCell
	};

	function onAfterSaveCell(row, cellName, cellValue) {
		const {id, label, active} = row;

		props.label.updateLabel(id, label, active)
			.then(() => {
				Notify(props.translation.t('settings.label.label_update_ok'), 'success');

				row.label = label;
				row.active = active;

				props.label.loadLabels();
			})
			.catch(() => {
				Notify(props.translation.t('settings.label.label_error'), 'error');
				props.label.loadLabels();
			});
	}

	function onSubmit(e) {
		e.preventDefault();
		return false;
	}

	return (
		<div className="label-container">
			<Row className="label-form">
				<Col md={2}/>
				<Col md={8} className="align-center">
					<Form inline onSubmit={onSubmit}>
						<FormGroup controlId="formInlineName">
							<ControlLabel>{props.translation.t('settings.label.label')}</ControlLabel>
							{' '}
							<FormControl
								type="text"
								placeholder={props.translation.t('settings.label.label_place')}
								className={
									classNames({
										'align-center': true,
										'rft-input': props.label.isValidLabel,
										'rft-input-error': !props.label.isValidLabel
									})
								}
								value={props.label.label}
								onChange={onLabelChange}
								onKeyUp={saveLabel}
								maxLength={50}
							/>
						</FormGroup>
					</Form>
				</Col>
				<Col md={2}/>
			</Row>
			<Row>
				<Col md={1}/>
				<Col md={10} className="align-center grid-container">
					<BootstrapTable
						data={props.label.labels.toJS()}
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
							dataField="label"
							editable={true}
							dataAlign="center"
							dataSort={true}
						>
							{props.translation.t('settings.label.grid.label')}
						</TableHeaderColumn>

						<TableHeaderColumn
							dataField="active"
							dataFormat={activeFormatter}
							dataAlign="center"
							dataSort={true}
							editable={{type:'checkbox', options:{values:'true:false'}}}
							width="120"
						>
							{props.translation.t('settings.label.grid.active')}
						</TableHeaderColumn>

					</BootstrapTable>
				</Col>
				<Col md={1}/>
			</Row>
		</div>
	);
});
