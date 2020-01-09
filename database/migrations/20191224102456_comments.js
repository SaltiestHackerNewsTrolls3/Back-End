exports.up = function(knex) {
    return knex.schema.createTable('favorite_comments', comment => {
      comment.integer('comment_id').unsigned();
      comment
        .integer('user_id')
        .unsigned()
        .references('user_id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      //comment.primary(['comment_id', 'user_id']);
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('favorite_comments');
  };