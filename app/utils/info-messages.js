const infoMessageClass = 'main-info-message';
const infoMessageOpenedClass = 'main-info-message--opened';

const infoErrorMessageClass = 'main-info-message--error';
const infoDoneMessageClass = 'main-info-message--done';

const $body = $('body');

export const displayErrorInfoMessage = (text) => {
	if ($(`.${infoMessageClass}`).length) return;

	const $element = $(`<div class="${infoMessageClass} ${infoErrorMessageClass}">${text}</div>`);
	
	$body.append($element);

  setTimeout(() => $element.addClass(infoMessageOpenedClass), 10);

  setTimeout(function() {
    $element.removeClass(infoMessageOpenedClass);

    setTimeout(() => $element.remove(), 200);

  }, 4000);
};

export const displayDoneInfoMessage = (text) => {
	if ($(`.${infoMessageClass}`).length) return;

	const $element = $(`<div class="${infoMessageClass} ${infoDoneMessageClass}">${text}</div>`);
	
	$body.append($element);

  setTimeout(() => $element.addClass(infoMessageOpenedClass), 10);

  setTimeout(function() {
    $element.removeClass(infoMessageOpenedClass);

    setTimeout(() => $element.remove(), 200);

  }, 4000);
};