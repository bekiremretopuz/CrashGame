if (!Math.gcd) {
    Math.gcd = function (n, m) {
        var r = 0;
        while (n !== 0) {
            r = m % n;
            m = n;
            n = r;
        }
        return m;
    };
}
//# sourceMappingURL=math.js.map