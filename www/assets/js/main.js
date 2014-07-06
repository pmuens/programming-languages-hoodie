var hoodie = new Hoodie();

// add a new language to the hoodie-Store
$('.new-language-form').submit(function (event) {
  event.preventDefault();

  var name = $('.new-language-form input.name').val();

  hoodie.store.add('language', { name: name, votes: 0 });

  $('.new-language-form input.name').val('');
});

// insert the newly created language into the table
hoodie.store.on('add:language', function (object) {
  $('table.table > tbody:last').append('<tr><td>' + object.name + '</td><td>' + object.votes + '</td><td><input type="button" class="' + object.id + ' upvote btn btn-success" value="Upvote"></td><td><input type="button" class="' + object.id + ' downvote btn btn-danger" value="Downvote"></td></tr>');
});
