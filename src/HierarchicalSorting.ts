import _ from 'lodash';

export class HierarchicalSorting {

	sort(input: string): string {
		let sales: Sale[] = [];
		const columnNames: string[] = [];

		const crSplit: string[] = input.split('\n');
		const originalColNames = crSplit[0];
		const len: number = crSplit.length;
		const cols: string[] = originalColNames.split('|');

		// read the einput
		for (let i = 0; i < cols.length; i++) {
			if (cols[i]) {
				columnNames[i] = cols[i];
			}
		}

		for (let i = 1; i < crSplit.length; i++) {
			const row: string[] = crSplit[i].split('|');
			if (!row[0]) continue;
			let sale: any = {totals: 0};
			for (let j = 0; j < row.length; j++) {
				if (row[j] === '\$total') {
					sale.totals++;
				}
				sale[columnNames[j]] = row[j];
				sales[i - 1] = sale;
			}
		}

		// @ts-ignore
		sales.sort(this.dynamicSortMultiple('property0', 'property1', 'property2'));

		let totalValue = 0;
		let max = sales[0].totals;
		for (let i = 1; i < sales.length; i++) {
			if (sales[i].totals === max! - 1) totalValue = sales[i].net_sales!;
			sales[i].totalValue = totalValue;
		}

		console.info('sales[] set totalValue: ', this.print(sales));
		sales = sales.slice(0, 1)
			.concat(
				this.sortByTotalValue(sales, 1, sales.length)
			);
		console.info('sales[] sortByTotalValue: ', this.print(sales));
		sales = this.sortBetweenTotals(sales);
		console.info('sales[] sortBetweenTotals: ', this.print(sales));

		const joined = this.print(sales);

		return originalColNames + '\n' + joined;
	}

	private print(sales: Sale[]): string {
		const ommitTotalsAndTotalValue: Sale[] = sales.map((sale: Sale) => {
			const ommited = _.omit(sale, [
					'totals', 'totalValue'
				]
			)
			return ommited;
		});

		const values = ommitTotalsAndTotalValue.map(o => Object.values(o));
		return values
			.join('\n')
			.replace(/,/gi, '|')
	}

	private sortBetweenTotals(sales: any[]) {
		const totalsIndexes: number[] = [];
		let len = sales.length;
		for (let i = 0; i < len; i++) {
			if (sales[i].totals) {
				totalsIndexes.push(i);
			}
		}

		for (let i = 0; i < totalsIndexes.length; i++) {
			// sort subset of an array
			const start = totalsIndexes[i] + 1;
			const end = totalsIndexes[i + 1];
			if (start + 1 !== end) {
				let couldBeOutOfBounds = end || len;
				sales = sales.slice(0, start)
					.concat(
						this.sortByNetSales(sales, start, couldBeOutOfBounds, 'net_sales')
							.concat(sales.slice(couldBeOutOfBounds, len))
					);
			}
		}
		return sales;
	}

	private sortByNetSales(sales: any[], start: number, end: number, prop: string) {
		const sorted = sales.slice(start, end).sort(this.dynamicSort(prop));
		return sorted;
	}

	private sortByTotalValue(sales: Sale[], start: number, end: number) {
		const sorted = sales.slice(start, end).sort(
			// @ts-ignore
			this.dynamicSortMultiple('totalValue', 'property0', 'property1', 'property2')
		)
		return sorted;
	}

	dynamicSort(property: any) {
		return function (obj1: any, obj2: any) {
			if (isNaN(obj1[property]))
				return obj1[property] > obj2[property] ? 1
					: obj1[property] < obj2[property] ? -1 : 0;
			else
				return Number(obj1[property]) > Number(obj2[property]) ? -1
					: Number(obj1[property]) < Number(obj2[property]) ? 1 : 0;
		}
	}

	dynamicSortMultiple() {
		/*
		 * save the arguments object as it will be overwritten
		 * note that arguments object is an array-like object
		 * consisting of the names of the properties to sort by
		 */
		var props = arguments;
		return (obj1: any, obj2: any) => {
			var i = 0, result = 0, numberOfProperties = props.length;
			/* try getting a different result from 0 (equal)
			 * as long as we have extra properties to compare
			 */
			while (result === 0 && i < numberOfProperties) {
				result = this.dynamicSort(props[i])(obj1, obj2);
				i++;
			}
			return result;
		}
	}
}

interface Sale {
	totals?: number;
	property0: string;
	net_sales: number;
	net_sales_units?: number;
	totalValue?: number;
}
