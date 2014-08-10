/**
 * This function estimates pi using Monte-Carlo integration
 * https://en.wikipedia.org/wiki/Monte_Carlo_integration
 * @returns {number}
 */
module.exports = function () {
    var n = 10000000, inside = 0, i, x, y;

    for ( i = 0; i < n; i++ ) {
        x = Math.random();
        y = Math.random();
        if ( Math.sqrt(x * x + y * y) <= 1 )
            inside++;
    }

    return 4 * inside / n;
};
