var titleInput = $('.title-input');
var bodyInput = $('.body-input');
var saveButton = $('.save-button');
var searchInput = $('.search-input');
var deleteButton;
var counter = 0;
var cardArr = [];
var qualityArr = ['swill', 'plausible', 'genius'];
var idea;
var container = $('.populated-ideas-container');



titleInput.on('keyup', toggleSaveButton);
bodyInput.on('keyup', toggleSaveButton);
saveButton.on('click', saveNewIdea);
$('.populated-ideas-container').click(deleteIdeaCard);
// $('[src="delete.svg"]').on('mouseover', deleteButtonToRed);


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
     <button class="delete-button"></button>
     <p>${ideaBody}</p>
     <section class="quality-flex">
     <button class="icons upvote-icon"</button>
     <button class="icons downvote-icon"</button>
     <h3>quality: <span class="quality">${ideaQuality}</span></h3></article>
     </section>`
    );
}

  
Idea.prototype.createIdeaCard = function () {
  cardArr.push(idea);
}

function deleteIdeaCard(e) {
  if ($(e.target).is('.delete-button')) {
    $(e.target).parent().remove();
    // localStorage().removeItem();
  }
  if ($(e.target).is('.downvote-icon')) {
    console.log((e.target))
    qualityDowngrade();  
  }
  if ($(e.target).is('.upvote-icon')) {
    qualityUpgrade();  
  }
}

function qualityUpgrade() {
  if (idea.quality === 'swill') {
    (idea.quality = 'plausible');
  } else if (idea.quality === 'plausible') {
    (idea.quality = 'genius');
  }
  $('.quality').text(idea.quality);
}

function qualityDowngrade() {
  if (idea.quality === 'genius') {
    (idea.quality = 'plausible');
  } else if (idea.quality === 'plausible') {
    (idea.quality = 'swill');
  }
  $('.quality').text(idea.quality);
}

function toggleSaveButton() {
  if (titleInput.val() !== '' && bodyInput.val() !== '') {
    $(".save-button").prop("disabled", false);
  } else {
    $(".save-button").prop("disabled", true);
  }
}


