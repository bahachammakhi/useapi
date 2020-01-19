const createRedux = require('./index.js');

const INITIAL_STATE = {
	fetching: false,
	error: '',
	data: {},
	success: false,
	errors: []
};

const fetching = (state) => ({
	...state,
	fetching: true,
	success: false,
	error: ''
});
const success = (state, { data }) => ({
	...state,
	data,
	success: true,
	fetching: false
});
const failure = (state, { error, errors }) => ({
	...state,
	error,
	errors,
	success: false,
	fetching: false
});

const { actions, types, reducer } = createRedux(INITIAL_STATE, {
	fetching,
	success,
	failure
});

console.log('Actions', actions, 'types', types, 'Reducer', reducer);
