const db = require('../database/dbconfig');

module.exports = () => {
    return db.migrate.rollback()
        .then(()=> db.migrate.latest())
        .then(()=> db.seed.run())
}