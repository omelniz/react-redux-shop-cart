import {LOCAL_STORAGE_KET} from './../constants/storage';

/**
 * Get saved state
 * @function getSavedState
 * @returns {Object|Boolean} state or false
 */
export function getSavedState() {
    let savedState = localStorage.getItem(LOCAL_STORAGE_KET) || false;

    return savedState ? JSON.parse(savedState) : false;
}

/**
 * Save state to localStorage
 * @function saveState
 * @param {Object} state
 */
export function saveState(state) {
    localStorage.setItem(LOCAL_STORAGE_KET, JSON.stringify(state));
}
