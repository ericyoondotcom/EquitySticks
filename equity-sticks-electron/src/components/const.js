export const CURRENT_VERSION = 8;

export const DOWNLOAD_URL = "http://yoonicode.com/equitysticks";
export const VERSION_URL = "http://yoonicode.com/equitysticks/version.txt";

export const rsuiColors = [
	"red", "orange", "yellow", "olive", "green", "teal", "blue", "violet", "purple", "pink", "brown", "grey", "black"
];

export const nameFormatOptions = [
	{
		example: "Last, First",
		format: (first, last) => `${last}, ${first}`
	},
	{
		example: "First Last",
		format: (first, last) => `${first} ${last}`
	},
	{
		example: "First",
		format: (first, last) => `${first}`
	},
	{
		example: "Last",
		format: (first, last) => `${last}`
	},
	{
		example: "First L.",
		format: (first, last) => {
			if(last.length > 0) {
				return `${first} ${last[0]}.`
			}
			return `${first}`;
		}
	}
];

export function formatName(first, last, formatOption) {
	if(formatOption === undefined || formatOption === null || nameFormatOptions[formatOption] === undefined) {
		return nameFormatOptions[0].format(first, last);
	}
	return nameFormatOptions[formatOption].format(first, last);
}

export function getRandomItem(array){
	return array[Math.floor(Math.random() * array.length)];
}

export function properCapitalize(item){
	return item[0].toUpperCase() + item.slice(1);
}