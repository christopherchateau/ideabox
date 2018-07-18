$(document).ready(populateStoredCards(findStoredCards()));
$('.populated-ideas-container').on('click', '.upvote-icon', upVote);
$('.populated-ideas-container').on('click', '.downvote-icon', downVote);
$('.populated-ideas-container').on('click', '.delete-button', deleteIdeaCard);
$('.populated-ideas-container').on('keyup', '.idea-title', updateEditedTitle);
$('.populated-ideas-container').on('keyup', '.idea-body', updateEditedBody);
$('.title-input').on('keyup', toggleSaveButton);
$('.body-input').on('keyup', toggleSaveButton);
$('.save-button').on('click', saveNewIdea);
$('.search-input').on('keyup', search);

function populateStoredCards(keyArr) {
  for (var i = 0; i < keyArr.length; i++) {
    retrieveStorage(keyArr[i].id);
  }
}

function findStoredCards() {
  var ideaArr = [];
  var objKeys = Object.keys(localStorage);

  for (var i = 0; i < objKeys.length; i++) {
    ideaArr.push(getNParse(objKeys[i]));
  }
  return ideaArr;
}

function saveNewIdea(e) {
  e.preventDefault();
  var idea = new Idea(Date.now(), $('.title-input').val(), $('.body-input').val());
  storeIdea(idea);
  retrieveStorage(idea.id);
  toggleSaveButton();
}

function retrieveStorage(id) {
  var parsedObj = getNParse(id);
  createNewIdeaCard(parsedObj.id, parsedObj.title, parsedObj.body, parsedObj.quality);
  clearInputFields();
}

function Idea(id, title, body) {
  this.id = Date.now();
  this.title = title;
  this.body = body;
  this.quality = 'swill';
}

function createNewIdeaCard(id, title, body, quality) {
  $('.populated-ideas-container').prepend(

   `<article id="${id}" class="populated-ideas">
      <div class="searchable">
        <h2 contenteditable="true" class="idea-title">${title}</h2>
        <button class="icons delete-button"></button>
        <p contenteditable = "true" class="idea-body">${body}</p>
      </div>
      <section class="quality-flex">
        <button class="icons upvote-icon"</button>
        <button class="icons downvote-icon"</button>
        <h3>quality: <span class="quality">${quality}</span></h3>
      </section>
    </article>`
  );
}

function upVote() {
  var clickedIdea = $(this).closest('.populated-ideas');
  var parsedObj = getNParse(clickedIdea.attr('id'));
  qualityUpgrade(parsedObj);  
  storeIdea(parsedObj);
  clickedIdea.find('.quality').text(parsedObj.quality);
}

function downVote() {
  var clickedIdea = $(this).closest('.populated-ideas');
  var parsedObj = getNParse(clickedIdea.attr('id'));
  qualityDowngrade(parsedObj);
  storeIdea(parsedObj);
  clickedIdea.find('.quality').text(parsedObj.quality);
}

function deleteIdeaCard(e) {
  $(e.target).parent().parent().remove();
  var ideaId = $(this).closest('.populated-ideas').attr('id');
  localStorage.removeItem(JSON.parse(ideaId));
}

function updateEditedTitle() {
  var editedTitle = $(this).closest('.idea-title').text();
  var clickedId = $(this).closest('.populated-ideas').attr('id');
  var parsedObj = getNParse(clickedId);
  parsedObj.title = editedTitle;
  storeIdea(parsedObj);
}

function updateEditedBody() {
  var editedBody = $(this).closest('.idea-body').text();
  var clickedId = $(this).closest('.populated-ideas').attr('id');
  var parsedObj = getNParse(clickedId);
  parsedObj.body = editedBody;
  storeIdea(parsedObj);
}

function toggleSaveButton() {
  if ($('.title-input').val() !== '' && $('.body-input').val() !== '') {
    $('.save-button').prop('disabled', false);
  } else {
    $('.save-button').prop('disabled', true);
  }
}

function search() {
  var filter = $(this).val();
  $('.searchable').each(function() {
    if($(this).text().search(new RegExp(filter, 'i')) !== -1) {
      $(this).parent().fadeIn();
    } else {
      $(this).parent().fadeOut();
    }
  });
}

function qualityUpgrade(obj) {
  if (obj.quality === 'swill') {
    obj.quality = 'plausible';
  }    
  else if (obj.quality === 'plausible') {
    obj.quality = 'genius';
  }
}

function qualityDowngrade(obj) {
  if (obj.quality === 'genius') {
    obj.quality = 'plausible';
  }    
  else if (obj.quality === 'plausible') {
    obj.quality = 'swill';
  }
}

function getNParse(id) {
  return JSON.parse(localStorage.getItem(id));
}

function storeIdea(idea) {
  var stringified = JSON.stringify(idea);
  localStorage.setItem(idea.id, stringified);
}

function clearInputFields() {
  $('.title-input').val('');
  $('.body-input').val('');
}