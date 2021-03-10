# Range List Class

## Description
Task: Implement a class named 'RangeList'
A pair of integers define a range, for example: [1, 5). This range
includes integers: 1, 2, 3, and 4.
A range list is an aggregate of these ranges: [1, 5), [10, 11), [100,

## Solution
```
/**
*
* NOTE: Feel free to add any extra member variables/functions you like.
*/
class RangeList {
    
    /**
     * Initialise the range
     */
    constructor() {
        this.ranges = [];
    }

    /**
    * Adds a range to the list
    * @param {Array<number>} range - Array of two integers that specify
    beginning and end of range.
    */
    add(range) {

        // In case first range, add to list directly
        if (this.ranges.length == 0){
            this.ranges.push(range);
            return;
        }

        // Find the first index of range what it's beginning is 
        // greater than the beiginning of new range
        let i = 0;
        while (i < this.ranges.length) {
            if (this.ranges[i][0] > range[0]) 
                break;
            i++;
        }

        // Find the indices to remove
        let idsToRmv = [];
        if (i > 0 && this.ranges[i - 1][1] >= range[0]) {
            if (this.ranges[i - 1][1] >= range[1]) {
                return;
            }
            idsToRmv.push(i - 1);
            range[0] = this.ranges[i - 1][0];
        }

        // Find the first index of the range what it's ending is
        // less than new range's ending
        let j = this.ranges.length - 1;
        while (j >= 0) {
            if (this.ranges[j][1] < range[1]) break;
            j--;
        }

        for (let k = i; k < j; k++) 
            idsToRmv.push(k);

        if (j > i - 1 && j < this.ranges.length && this.ranges[j][0] <= range[1]) {
            idsToRmv.push(j);
            range[1] = this.ranges[j][1];
        }

        this.ranges = this.ranges.filter(function(value, index) {
            return !(idsToRmv.includes(index));
        });
        this.ranges.push(range);
        this.ranges.sort();
    }

    /**
    * Removes a range from the list
    * @param {Array<number>} range - Array of two integers that specify
    beginning and end of range.
    */
    remove(range) {
        let newRange = [];
        this.ranges.forEach((r) => {
            if (r[1] <= range[0] || r[0] >= range[1]) {
                newRange.push(r);
            }
            else
            {
                if (r[0] < range[0]) {
                    newRange.push([r[0], range[0]]);
                }
                if (range[1] < r[1]) {
                    newRange.push([range[1], r[1]]);
                }
            }
        });
        this.ranges = newRange;
    }

    /**
    * Prints out the list of ranges in the range list
    */
    print() {
        let result = "";
        for(let i = 0; i < this.ranges.length; i++){
            const range = this.ranges[i];
            result = result + ` [${range[0]}, ${range[1]})`
        }

        console.log(result);
    }
}

// Example run
const rl = new RangeList();
rl.add([1, 5]);
rl.print();
// Should display: [1, 5)
rl.add([10, 20]);
rl.print();
// Should display: [1, 5) [10, 20)
rl.add([20, 20]);
rl.print();
// Should display: [1, 5) [10, 20)
rl.add([20, 21]);
rl.print();
// Should display: [1, 5) [10, 21)
rl.add([2, 4]);
rl.print();
// Should display: [1, 5) [10, 21)
rl.add([3, 8]);
rl.print();
// Should display: [1, 8) [10, 21)
rl.remove([10, 10]);
rl.print();
// Should display: [1, 8) [10, 21)
rl.remove([10, 11]);
rl.print();
// Should display: [1, 8) [11, 21)
rl.remove([15, 17]);
rl.print();
// Should display: [1, 8) [11, 15) [17, 21)
rl.remove([3, 19]);
rl.print();
// Should display: [1, 3) [19, 21)
```