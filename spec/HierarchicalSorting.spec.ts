import {HierarchicalSorting} from '../src/gist/HierarchicalSorting';

describe('HierarchicalSortingTest', () => {
    it("sort property0|property1|net_sales example",  () => {
        const hierarchicalSorting: HierarchicalSorting = new HierarchicalSorting();

        const input: string = "property0|property1|net_sales\n" +
          "bar|$total|-200\n" +
          "foo|sauce|300\n" +
          "$total|$total|200\n" +
          "bar|sup|-400\n" +
          "foo|$total|400\n" +
          "bar|bro|200\n" +
          "foo|bacon|100";
        const output: string = hierarchicalSorting.sort(input);

        const expected: string = "property0|property1|net_sales\n" +
          "$total|$total|200\n" +
          "foo|$total|400\n" +
          "foo|sauce|300\n" +
          "foo|bacon|100\n" +
          "bar|$total|-200\n" +
          "bar|bro|200\n" +
          "bar|sup|-400";
        expect(output).toEqual(expected);
    });
    it("sort property0|property1|net_sales example",  () => {
        const hierarchicalSorting: HierarchicalSorting = new HierarchicalSorting();

        const input: string = "property0|property1|net_sales\n" +
	        "a|$total|200\n" +
	        "a|a|200\n" +
          "bar|$total|-200\n" +
          "foo|sauce|300\n" +
          "$total|$total|200\n" +
          "bar|sup|-400\n" +
          "foo|$total|400\n" +
          "bar|bro|200\n" +
          "foo|bacon|100";
        const output: string = hierarchicalSorting.sort(input);

        const expected: string = "property0|property1|net_sales\n" +
          "$total|$total|200\n" +
          "foo|$total|400\n" +
          "foo|sauce|300\n" +
          "foo|bacon|100\n" +
	        "a|$total|200\n" +
	        "a|a|200\n" +
          "bar|$total|-200\n" +
          "bar|bro|200\n" +
          "bar|sup|-400";
        expect(output).toEqual(expected);
    });


    it("sort data",  () => {
        const hierarchicalSorting: HierarchicalSorting = new HierarchicalSorting();

        const input: string = "property0|property1|property2|net_sales|net_sales_units\n" +
          "womens footwear|boots|cold weather|-2018.34|-9\n" +
          "kids footwear|kids|kids|2373.19|22\n" +
          "womens footwear|shoes|ballet|18363.41|117\n" +
          "product care|product care|product care|2280.9|240\n" +
          "accessories|handbags|clutch|98|1\n" +
          "mens footwear|boots|campus|328|1\n" +
          "womens footwear|boots|casuals|29090.73|125\n" +
          "kids footwear|kids|$total|2373.19|22\n" +
          "womens footwear|boots|riding|7187.84|8\n" +
          "accessories|handbags|$total|52589.06|145\n" +
          "womens footwear|shoes|cold weather|-131.85|-3\n" +
          "accessories|giftable|$total|57|1\n" +
          "mens footwear|boots|cold weather|1688.8|5\n" +
          "kids footwear|baby|baby|384|8\n" +
          "womens footwear|shoes|dress|14542.39|49\n" +
          "mens footwear|boots|western|3311|10\n" +
          "womens footwear|shoes|sandals|48355|209\n" +
          "womens footwear|shoes|clogs|4436.4|17\n" +
          "womens footwear|boots|tailored|42454.92|121\n" +
          "accessories|belts|$total|-20.19|0\n" +
          "mens footwear|boots|harness|7795.45|25\n" +
          "womens footwear|shoes|pumps|1628|12\n" +
          "mens footwear|boots|work|32963.85|121\n" +
          "accessories|small leather goods|$total|10927.64|123\n" +
          "accessories|men|bags|21232.8|41\n" +
          "womens footwear|shoes|mocs|4443.75|31\n" +
          "mens footwear|shoes|loafers|15703|79\n" +
          "accessories|handbags|crossbody|21242|66\n" +
          "mens footwear|shoes|sneakers|39299|213\n" +
          "womens footwear|boots|harness|12790.85|45\n" +
          "womens footwear|shoes|slippers|7788.79|32\n" +
          "mens footwear|boots|casuals|23874|82\n" +
          "womens footwear|boots|moto|2164.8|8\n" +
          "mens footwear|$total|$total|178959.8|742\n" +
          "womens footwear|boots|work|19317.84|60\n" +
          "accessories|handbags|shoulder|12158.71|32\n" +
          "mens footwear|boots|$total|99739.9|341\n" +
          "womens footwear|shoes|oxfords|26081.2|128\n" +
          "kids footwear|baby|$total|384|8\n" +
          "womens footwear|shoes|sneakers|40678.91|272\n" +
          "accessories|belts|womens|-20.19|0\n" +
          "womens footwear|boots|western|39314.15|144\n" +
          "product care|product care|$total|2280.9|240\n" +
          "mens footwear|boots|tailored|29778.81|97\n" +
          "accessories|eye|$total|0|0\n" +
          "accessories|handbags|tote|7166.2|17\n" +
          "accessories|men|$total|21232.8|41\n" +
          "womens footwear|boots|campus|13778.59|40\n" +
          "womens footwear|$total|$total|330267.42|1406\n" +
          "product care|$total|$total|2280.9|240\n" +
          "accessories|eye|eye|0|0\n" +
          "accessories|$total|$total|84786.29|310\n" +
          "accessories|handbags|satchel|3757.14|10\n" +
          "accessories|giftable|giftable|57|1\n" +
          "accessories|handbags|hobo|8167|19\n" +
          "kids footwear|$total|$total|2757.2|30\n" +
          "womens footwear|shoes|$total|166186.02|864\n" +
          "mens footwear|shoes|mocs|382.4|2\n" +
          "accessories|small leather goods|small leather goods|10927.64|123\n" +
          "mens footwear|shoes|$total|79219.9|401\n" +
          "$total|$total|$total|599051.63|2728\n" +
          "mens footwear|shoes|oxfords|23425.49|101\n" +
          "mens footwear|shoes|cold weather|410|6\n" +
          "womens footwear|boots|$total|164081.39|542";
        const output: string = hierarchicalSorting.sort(input);

        const expected: string = "property0|property1|property2|net_sales|net_sales_units\n" +
	        "$total|$total|$total|599051.63|2728\n" +
	        "womens footwear|$total|$total|330267.42|1406\n" +
	        "womens footwear|boots|$total|164081.39|542\n" +
	        "womens footwear|boots|tailored|42454.92|121\n" +
	        "womens footwear|boots|western|39314.15|144\n" +
	        "womens footwear|boots|casuals|29090.73|125\n" +
	        "womens footwear|boots|work|19317.84|60\n" +
	        "womens footwear|boots|campus|13778.59|40\n" +
	        "womens footwear|boots|harness|12790.85|45\n" +
	        "womens footwear|boots|riding|7187.84|8\n" +
	        "womens footwear|boots|moto|2164.8|8\n" +
	        "womens footwear|boots|cold weather|-2018.34|-9\n" +
	        "womens footwear|shoes|$total|166186.02|864\n" +
	        "womens footwear|shoes|sandals|48355|209\n" +
	        "womens footwear|shoes|sneakers|40678.91|272\n" +
	        "womens footwear|shoes|oxfords|26081.2|128\n" +
	        "womens footwear|shoes|ballet|18363.41|117\n" +
	        "womens footwear|shoes|dress|14542.39|49\n" +
	        "womens footwear|shoes|slippers|7788.79|32\n" +
	        "womens footwear|shoes|mocs|4443.75|31\n" +
	        "womens footwear|shoes|clogs|4436.4|17\n" +
	        "womens footwear|shoes|pumps|1628|12\n" +
	        "womens footwear|shoes|cold weather|-131.85|-3\n" +
	        "mens footwear|$total|$total|178959.8|742\n" +
	        "mens footwear|boots|$total|99739.9|341\n" +
	        "mens footwear|boots|work|32963.85|121\n" +
	        "mens footwear|boots|tailored|29778.81|97\n" +
	        "mens footwear|boots|casuals|23874|82\n" +
	        "mens footwear|boots|harness|7795.45|25\n" +
	        "mens footwear|boots|western|3311|10\n" +
	        "mens footwear|boots|cold weather|1688.8|5\n" +
	        "mens footwear|boots|campus|328|1\n" +
	        "mens footwear|shoes|$total|79219.9|401\n" +
	        "mens footwear|shoes|sneakers|39299|213\n" +
	        "mens footwear|shoes|oxfords|23425.49|101\n" +
	        "mens footwear|shoes|loafers|15703|79\n" +
	        "mens footwear|shoes|cold weather|410|6\n" +
	        "mens footwear|shoes|mocs|382.4|2\n" +
	        "accessories|$total|$total|84786.29|310\n" +
	        "accessories|belts|$total|-20.19|0\n" +
	        "accessories|belts|womens|-20.19|0\n" +
	        "accessories|eye|$total|0|0\n" +
	        "accessories|eye|eye|0|0\n" +
	        "accessories|giftable|$total|57|1\n" +
	        "accessories|giftable|giftable|57|1\n" +
	        "accessories|handbags|$total|52589.06|145\n" +
	        "accessories|handbags|crossbody|21242|66\n" +
	        "accessories|handbags|shoulder|12158.71|32\n" +
	        "accessories|handbags|hobo|8167|19\n" +
	        "accessories|handbags|tote|7166.2|17\n" +
	        "accessories|handbags|satchel|3757.14|10\n" +
	        "accessories|handbags|clutch|98|1\n" +
	        "accessories|men|$total|21232.8|41\n" +
	        "accessories|men|bags|21232.8|41\n" +
	        "accessories|small leather goods|$total|10927.64|123\n" +
	        "accessories|small leather goods|small leather goods|10927.64|123\n" +
	        "kids footwear|$total|$total|2757.2|30\n" +
	        "kids footwear|baby|$total|384|8\n" +
	        "kids footwear|baby|baby|384|8\n" +
	        "kids footwear|kids|$total|2373.19|22\n" +
	        "kids footwear|kids|kids|2373.19|22\n" +
	        "product care|$total|$total|2280.9|240\n" +
	        "product care|product care|$total|2280.9|240\n" +
	        "product care|product care|product care|2280.9|240";
        expect(output).toEqual(expected);
    });
});
