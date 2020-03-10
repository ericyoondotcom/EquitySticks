export const rsuiColors = [
	"red", "orange", "yellow", "olive", "green", "teal", "blue", "violet", "purple", "pink", "brown", "gray", "black"
];

export function getRandomItem(array){
	return array[Math.floor(Math.random() * array.length)];
}

export function properCapitalize(item){
	return item[0].toUpperCase() + item.slice(1);
}