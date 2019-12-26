const dbDS = require('../database/dbDSConfig');
const db = require('../database/dbconfig');

module.exports = {
  getTopSaltyComments,
  savedComment,
  findBy,
  getCommentsByUserID,
  removeCommentByUserID,
  getSaltyCommentsByID,
  removeComment,
  getTop25Saltiest,
  saltiestComment,
};

function getTopSaltyComments() {
  return dbDS('HackerSalt')
    .orderBy('score', 'asc')
    .limit(15);
}

function getSaltyCommentsByID(commentIDs) {
  return dbDS('HackerSalt').whereIn('id', commentIDs);
}

function savedComment(comment) {
  return db('favorite_comments').insert(comment);
}

function findBy(filter) {
  return db('favorite_comments').where(filter);
}

function getCommentsByUserID(id) {
  return db('favorite_comments')
    .select('comment_id')
    .where({ 'favorite_comments.user_id': id });
}

function removeCommentByUserID({ user_id, comment_id }) {
  return getCommentsByUserID(user_id)
    .where({ comment_id })
    .del();
}

function getTop25Saltiest() {
  return dbDS('HackerSalt')
    .select('author')
    .avg('HackerSalt.score AS avg_score')
    .groupBy('author')
    .orderBy('avg_score', 'asc')
    .limit(25);
}

function saltiestComment(id) {
  return dbDS('HackerSalt')
    .where({ 'HackerSalt.author': id })
    .orderBy('score', 'asc')
    .limit(10);
}

function removeComment(id, comment_id) {
  return getCommentsByUserID(id)
    .where({ 'favorite_comments.comment_id': comment_id })
    .del();
}