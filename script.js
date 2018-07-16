var titleInput = $('.title-input');
var bodyInput = $('.body-input');
var saveButton = $('.save-button');
var counter = 0;
var ideaArr = [];

// var idea;
// var searchInput = $('.search-input');
// var container = $('.populated-ideas-container');

titleInput.on('keyup', toggleSaveButton);
bodyInput.on('keyup', toggleSaveButton);
saveButton.on('click', saveNewIdea);

$('.populated-ideas-container').on('click', '.upvote-icon', qualityUpgrade);
$('.populated-ideas-container').on('click', '.downvote-icon', qualityDowngrade);
$('.populated-ideas-container').on('click', '.delete-button', deleteIdeaCard);
$('.search-input').on('keyup', search);

function clearAllCards() {
  $('.populated-ideas-container').text('');
}

function saveNewIdea(e) {
  e.preventDefault();
  counter++;
  idea = new Idea(counter, titleInput.val(), bodyInput.val());
  idea.createIdeaCard();
  createNewIdeaCard();
}
  
Idea.prototype.createIdeaCard = function() {
  ideaArr.push(idea);
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

    `<article id="${counter}" class="populated-ideas">
      <div class="searchable">
        <h2 contenteditable="true" class="idea-title">${ideaTitle}</h2>
        <button class="icons delete-button"></button>
        <p contenteditable = "true">${ideaBody}</p>
      </div>
      <section class="quality-flex">
        <button class="icons upvote-icon"</button>
        <button class="icons downvote-icon"</button>
        <h3>quality: <span class="quality">${ideaQuality}</span></h3>
      </section>
     </article>`
    );

    // var stringifiedObj = JSON.stringify(idea);
    // localStorage.setItem(counter, stringifiedObj);
}

function qualityUpgrade() {
  var clickedIdea = $(this).closest('.populated-ideas');
  var clickedIdeaQuality = clickedIdea.find('.quality').text();
  
  if (clickedIdeaQuality === 'swill') {
    clickedIdea.find('.quality').text('plausible');
  }    
  if (clickedIdeaQuality === 'plausible') {
    clickedIdea.find('.quality').text('genuis');
  }
}

function qualityDowngrade() {
  var clickedIdea = $(this).closest('.populated-ideas');
  var clickedIdeaQuality = clickedIdea.find('.quality').text();

  if (clickedIdeaQuality === 'genuis') {
    clickedIdea.find('.quality').text('plausible');
  }    
  if (clickedIdeaQuality === 'plausible') {
    clickedIdea.find('.quality').text('swill');
  }
}

function deleteIdeaCard(e) {
  $(e.target).parent().parent().remove();
}

function toggleSaveButton() {
  if (titleInput.val() !== '' && bodyInput.val() !== '') {
    $(".save-button").prop("disabled", false);
  } else {
    $(".save-button").prop("disabled", true);
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
