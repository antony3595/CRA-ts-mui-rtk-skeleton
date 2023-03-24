export const pieChartColors = ["#003f5c", "#1260a8", "#42458f", "#793c97", "#ae1f8d", "#da0071", "#f60047", "#ff0000"];

export const getColorIndex = (index: number): number => {
	return index - Math.trunc(index / pieChartColors.length) * pieChartColors.length;
};
