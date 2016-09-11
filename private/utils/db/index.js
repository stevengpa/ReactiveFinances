const path = require('path');
const low = require('lowdb');
const fs = require('fs');
const fileAsync = require('lowdb/lib/file-async');

// Folder Settings
const folderPath = path.resolve(__dirname, '../../../db');
if (!fs.existsSync(folderPath)) {
	fs.mkdirSync(folderPath);
}

// DB Settings
const dbPath = `${folderPath}/rft.json`;
const db = low(dbPath, {storage: fileAsync});

// Default Schemas
db
	.defaults({
		users: [],
		currency: [],
		category: [],
		label: [],
		entries: [],
		filters: []
	})
	.value();

module.exports = {
	table(schema) {
		return db.get(schema);
	},
	getData(table, filters) {
		return db.get(table)
			.filter(filters)
			.value();
	},
	tables: {
		CURRENCY_TABLE: 'currency',
		CATEGORY_TABLE: 'category',
		LABEL_TABLE: 'label',
		ENTRY_TABLE: 'entries',
		FILTER_TABLE: 'filters'
	}
};
