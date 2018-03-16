const dateRegex = (/^\d{2}\-\d{2}\-\d{4}$/);

export const validateDate = (value) => {
	return !dateRegex.test(value);
};