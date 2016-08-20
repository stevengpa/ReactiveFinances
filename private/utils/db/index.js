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
		label: []
	})
	.value();

module.exports = {
	table(schema) {
		return db.get(schema);
	}
};
