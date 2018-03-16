export const yearMonths = {
	"01": "Styczeń",
	"02": "Luty",
	"03": "Marzec",
	"04": "Kwiecień",
	"05": "Maj",
	"06": "Czerwiec",
	"07": "Lipiec",
	"08": "Sierpień",
	"09": "Wrzesień",
	"10": "Październik",
	"11": "Listopad",
	"12": "Grudzień"
};

export const weekDays = {
	"0": "Niedziela",
	"1": "Poniedziałek",
	"2": "Wtorek",
	"3": "Środa",
	"4": "Czwartek",
	"5": "Piątek",
	"6": "Sobota"
};

export const getCurrentYear = () => {
	return new Date().getFullYear().toString();
};

export const getCurrentMonth = () => {
	let month = new Date().getMonth() + 1;

  if (month.toString().length === 1) month = "0" + month;

  return month;
};

export const getDay = (date) => {
	date = date.substring(date.length - 2, date.length);

	if (date[0] === "0") return date.substring(1, 2);

	return date;
}