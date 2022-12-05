export const setHeader = (header:Action) => {
	return {
		type: 'SET_HEADER',
		payload: header,
	};
};

interface Action {
	type: String,
	payload: object[]
}