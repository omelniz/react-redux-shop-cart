/**
 * Sort objects array by key
 * this function uses stableSort function like comparator
 * @function sortArrayByKey
 * @param {Array} sortableArray
 * @param {string} key
 * @param {string} order
 * @returns {Array} Sorted Array
 */
export function sortArrayByKey(sortableArray, key, order) {
    return sortableArray.sort((prev, next) => stableSort(
        {value: prev[key], position: prev.position || 0},
        {value: next[key], position: next.position || 0},
        order
    ));
}

/**
 * Stable sort comparator
 * @function stableSort
 * @param {Object} prev
 * @param {Object} next
 * @returns {number} 
 */
export function stableSort(prev = {value, position: 0}, next = {value, position: 0}, order = "asc") {
    let result;

    if (prev.value === next.value) {
        result = prev.position - next.position;
    }
    else if (order == "asc") {
        result = prev.value > next.value;
    }
    else {
        result = prev.value < next.value;
    }

    return result;
}
