import Toastify from 'toastify-js';

export enum toastTypes {
	ERROR = 'error',
	SUCCESS = 'success'
}

const getStyles = (type: toastTypes) => {
	const baseStyles = { 'max-width': '400px' };
	if (type === toastTypes.SUCCESS) {
		return {
			...baseStyles,
			background: '#dcfce7',
			color: '#6fb78a',
			border: '1px solid #6fb78a'
		};
	}
	if (type === toastTypes.ERROR) {
		return {
			...baseStyles,
			background: '#fee2e2',
			color: '#ef4444',
			border: '1px solid #ef4444'
		};
	}
};

export const toast = (text: string, type: toastTypes) => {
	Toastify({
		text,
		duration: 3000,
		close: true,
		gravity: 'top', // `top` or `bottom`
		position: 'right', // `left`, `center` or `right`
		stopOnFocus: true, // Prevents dismissing of toast on hover
		style: getStyles(type)
	}).showToast();
};
