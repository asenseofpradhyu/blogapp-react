function saveNameLocalStore(name) {
localStorage.setItem('name', name);
}

function saveDesignationLocalStore(designation) {
localStorage.setItem('designation', designation);
}

function getNameLocalStore() {
    return localStorage.getItem('name');
}

function getDesignationLocalStore() {
    return localStorage.getItem('designation');
}

export { saveNameLocalStore, saveDesignationLocalStore, getNameLocalStore, getDesignationLocalStore};
