export const isEmptyObject = (obj) => {
	return obj === {} || (obj && Object.keys(obj).length === 0 && obj.constructor === Object) ? true : false;
};
