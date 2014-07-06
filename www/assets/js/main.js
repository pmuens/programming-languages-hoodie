var hoodie = new Hoodie();

// not be the best / fastest solution
var recomputeTable = function () {
  // add all languages to the table
  hoodie.store.findAll('language').done(function (languages) {
    $('table.table > tbody:last').html('');

    languages.sort(function (language1, language2) {
      return language2.votes - language1.votes;
    });

    languages.forEach(function (language) {
      $('table.table > tbody:last').append('<tr><td>' + language.name + '</td><td class="votes-for-language-with-id-' + language.id + '">' + language.votes + '</td><td><input type="button" id="' + language.id + '" class="upvote btn btn-success" value="Upvote"></td><td><input type="button" id="' + language.id + '" class="downvote btn btn-danger" value="Downvote"></td></tr>');
    });
  })
};

// initialize the table with the stored languages
recomputeTable();

// add a new language to the hoodie-Store
$('.new-language-form').submit(function (event) {
  event.preventDefault();

  var name = $('.new-language-form input.name').val();

  hoodie.store.add('language', { name: name, votes: 0 });

  $('.new-language-form input.name').val('');
});

// insert the newly created language into the table
hoodie.store.on('add:language', function (language) {
  $('table.table > tbody:last').append('<tr><td>' + language.name + '</td><td class="votes-for-language-with-id-' + language.id + '">' + language.votes + '</td><td><input type="button" id="' + language.id + '" class="upvote btn btn-success" value="Upvote"></td><td><input type="button" id="' + language.id + '" class="downvote btn btn-danger" value="Downvote"></td></tr>');
});

// upvote a language
$(document).on('click', '.upvote', function () {
  var id = this.id;

  // get the current vote-Count, increment it and update the votes for the language
  hoodie.store.find('language', id).done(function (language) {
    incrementedVotes = language.votes + 1;

    hoodie.store.update('language', id, { votes: incrementedVotes }).done(function (updatedLanguage) {
      $('.votes-for-language-with-id-' + id).text(incrementedVotes);

    recomputeTable();

    })
  });
});

// downvote a language
$(document).on('click', '.downvote', function () {
  var id = this.id;

  // get the current vote-Count, decrement it and update the votes for the language
  hoodie.store.find('language', id).done(function (language) {
    decrementedVotes = language.votes - 1;

    hoodie.store.update('language', id, { votes: decrementedVotes }).done(function (updatedLanguage) {
      $('.votes-for-language-with-id-' + id).text(decrementedVotes);

    recomputeTable();

    })
  });
});
