import {observable} from 'mobx';
import _ from 'lodash';

import storeEntry from '../states/entry';

export default observable({
	tableSummary() {
		return _.reduce(storeEntry.entries.toJS(), (memo, entry) => {
			const {category, label, ...data} = entry;

			const transform = {
				...data,
				category: category.category,
				label: label.label
			};

			memo.push(transform);
			return memo;
		}, []);
	}
});
