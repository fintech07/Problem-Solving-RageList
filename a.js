class RangeList {
    constructor() {
        this.ranges = [];
    }

    add(range) {
        let i = 0;
        while (i < this.ranges.length) {
            if (this.ranges[i][0] > range[0]) break;
            i++;
        }
        let idsToRmv = [];
        if (i > 0 && this.ranges[i - 1][1] >= range[0]) {
            idsToRmv.push(i);
            range[0] = this.ranges[i - 1][0];
        }
        let j = this.ranges.length - 1;
        while (j >= 0) {
            if (this.ranges[j][1] < range[1]) break;
            j--;
        }
        for (let k = i + 1; k < j; k++) idsToRmv.push(k);
        if (j < this.ranges.length && this.ranges[j][0] <= range[1]) {
            idsToRmv.push(j);
            range[1] = this.ranges[j][1];
        }
        this.ranges.push(range);
        this.ranges.sort();
        this.ranges = this.ranges.filter(function(value, index, arr) {
            return (index in idsToRmv);
        });
    }
    remove(range) {
        let newRange = [];
        this.ranges.forEach((r) => {
            if (r[1] <= range[0] || r[0] >= range[1]) {
                newRange.push(r);
            }
            else
            {
                if (r[0] <= range[0]) {
                    newRange.push(r[0], range[0]);
                }
                if (range[1] <= r[1]) {
                    newRange.push(range[1], r[1]);
                }
            }
        });
        this.ranges = newRange;
    }
}