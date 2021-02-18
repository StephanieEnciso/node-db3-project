const db = require('../../data/db-config');

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
}

function find() {
    return db('schemes')
}

function findById(id) {
     return db('schemes').where('id', id).first() 
}

function findSteps(id) {
    return db('steps as s')
        .join('schemes as sch', 's.scheme_id', 'sch.id')
        .select('s.id as id', 'sch.scheme_name as scheme_name', 's.step_number as step_number', 's.instructions as instructions')
        .orderBy('step_number')
        .where('sch.id', id)
}

function add(scheme) {
    return db('schemes').insert(scheme)
     .then(([id]) => {
         return db('schemes').where('id', id).first()
     })
}

function update(changes, id) {
    const schemeId = id
    return db('schemes').where('id', id).update(changes)
     .then(() => {
         return db('schemes').where('id', schemeId).first()
     })
}

function remove(id) {
    return db('schemes').where('id', id).del()
     .then(() => {
         return db('schemes')
     })
}