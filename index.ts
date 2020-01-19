import keys from 'lodash.keys';

//Create type function
function createType(action: any) {
	// split parts with capilazed first letter
	const parts = action.split(/(?=[A-Z])/);
	const uppercasedparts = parts.map((part:any) => {
		// return a part on CAPILAZED
		return part.toUpperCase();
	});
	// return the array on form ACTION_ACTION
	return uppercasedparts.join('_');
}
function createAction(type: any) {
	return (...params:any) => {
		const allparams = params.reduce((result:any, param:any) => {
			// check if the type of the param is not an object and trow an error
			if (typeof param !== 'object' && param !== undefined) {
				throw new Error(`Actions is expected to be an object but got ${typeof param}`);
			}
			if (Array.isArray(param)) {
				throw new Error('Action is expected to be an object but got an array');
			}
			return { ...result, ...param };
		}, {});
		return {
			type,
			...allparams
		};
	};
}

function createActions(...params: any) {
	const actions = {};
	const types = {};
	// add actions and types to an object the key of action name
	params.forEach((action:any) => {
		types[action] = createType(action);
		actions[action] = createAction(createType(action));
	});
	return { actions, types };
}
// add checking types later
function createReducer(INITIAL_STATE: any, actions: any, types: any) {
	return (state = INITIAL_STATE, action) => {
		const handler = actions[action.type];
		return handler(state, action);
	};
}
function createRedux(INITIAL_STATE: any, Actions: any) {
	const actionnames = keys(Actions);
	if (actionnames.length === 0) {
		return { action: {}, types: {} };
	}
	const { actions, types } = createActions(...actionnames);
	const reducer = createReducer(INITIAL_STATE, Actions, types);
	return { actions, types, reducer };
}
export default createRedux;
