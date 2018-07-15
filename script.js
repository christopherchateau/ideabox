var titleInput = $('.title-input');
var bodyInput = $('.body-input');
var saveButton = $('.save-button');
var searchInput = $('.search-input');
var deleteButton = $('.delete-button');
var counter = 0;
var cardArr = [];
var idea;
var container = $('.populated-ideas-container');



titleInput.on('keyup', toggleSaveButton);
bodyInput.on('keyup', toggleSaveButton);
saveButton.on('click', saveNewIdea);
deleteButton.on('click', deleteIdeaCard);


function saveNewIdea(e) {
  e.preventDefault();
  counter++;
  idea = new Idea(counter, titleInput.val(), bodyInput.val());
  idea.createIdeaCard();
  createNewIdeaCard();
}

function Idea(id, title, body) {
  this.id = id;
  this.title = title;
  this.body = body;
  this.quality = 'swill';

}

function createNewIdeaCard() {
  var ideaTitle = idea.title;
  var ideaBody = idea.body;
  var ideaQuality = idea.quality;

  $('.populated-ideas-container').prepend(

    `<article class="populated-ideas"><h2 class="idea-title">${ideaTitle}</h2>
      <img class="icons delete-button" src="delete.svg">
     <p>${ideaBody}</p>
     <img class="icons upvote-icon" src="upvote.svg"/>
     <img class="icons downvote-icon" src="downvote.svg"/>
     <h3>quality: <span class="quality">${ideaQuality}</span></h3></article>`
    );
}

  
Idea.prototype.createIdeaCard = function () {
  cardArr.push(idea);
}

function deleteIdeaCard() {
  console.log('asdf');

}


function toggleSaveButton() {
  if (titleInput.val() !== '' && bodyInput.val() !== '') {
    saveButton.disabled = false;
  } else {
    saveButton.disabled = true;
  }
}