const db = require("../../database/dbConfig")

module.exports = {
    find,
    findBy,
    add,
    findById,
    findByEmail
}


function find() {
    return db("users").select("id", "email")
}

function findBy(filter) {
    return db("users").where(filter)
}

async function add(user) {
    const [id] = await db("users").insert(user, "id")

    return findById(id)
}

function findById(id) {
    return db("users")
    .where({id})
    .first()
}

function findByEmail(email) {
    return db("users")
    .where({email})
    .first()
}