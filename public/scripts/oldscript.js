$(document).ready(function(){

// var BlogPost = function (inputName,authorName,inputPost){
// 	this.inputName = inputName;
// 	this.authorName = authorName;
// 	this.inputPost = inputPost;
// };

// var blogPost1 = new BlogPost('Zombie Impsum','http://www.zombieipsum.com/','Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris. Hi mindless mortuis soulless creaturas, imo evil stalking monstra adventus resi dentevil vultus comedat cerebella viventium. Qui animated corpse, cricket bat max brucks terribilem incessu zomby. The voodoo sacerdos flesh eater, suscitat mortuos comedere carnem virus. Zonbi tattered for solum oculi eorum defunctis go lum cerebro. Nescio brains an Undead zombies. Sicut malus putrid voodoo horror. Nigh tofth eliv ingdead.')
// var blogPost2 = new BlogPost('Marvel Impsum','http://www.marvelipsum.com/','Like a sci fi Lone Wolf & Cub, the new Cable series is packed with action, adventure, humor and everything else an X-Men fan could ask for. Marvels mighty mutants go worldwide and beyond in this series following Cyclops, Wolverine, Beast, Emma Frost and more in their astonishing adventures. Looking for the one superhero comic you just have to read. This is where youll find all the big-time action, major storylines and iconic Spider-Man magic youd come to expect from the Wall-Crawler.')
// var blogPost3 = new BlogPost('Hipster Ipsum','http://hipsum.co/','Typewriter roof party +1, chia Brooklyn Marfa four dollar toast Godard hella XOXO actually. Distillery PBR retro pug slow-carb plaid. Yr direct trade selfies Shoreditch Truffaut mixtape 90s readymade, farm-to-table Portland Banksy migas trust fund. Retro Pinterest leggings squid mlkshk crucifix. Deep v slow-carb McSweeneys brunch, bespoke cliche Odd Future Helvetica salvia. VHS artisan quinoa, heirloom Carles meditation lomo. Health goth Vice small batch, selvage gluten-free Banksy locavore umami VHS craft beer tote bag roof party sustainable viral keytar.')

// BlogPost.all=[blogPost1,blogPost2, blogPost3]
// console.log(BlogPost.all)

var $blog = $('#blog')

// BlogPost.prototype.save = function(){
// 	BlogPost.all.push(this);
// 	console.log(BlogPost.all)
// };

var blogTemplate = _.template($('#blogTemplate').html());

// BlogPost.prototype.render = function(){
// 	var $blogPost = $(blogTemplate(this));
// 	$blog.prepend($blogPost);
// }

//compile phrase template
$.ajax({
	url:'/blog',
	type:'GET',
	success: function(data){
		var blogTemplate = _.template($('#blogTemplate').html());

		var allBlogPosts = data

		// var $blogPost = $(blogTemplate(blogPosts));
		// $blog.prepend($blogPost);

		_.each(allBlogPosts, function(blogPost){
			var $blogPostAdd = $(blogTemplate(blogPost));
			// $blogPostAdd.attr('data-index', index);
			$blog.prepend($blogPostAdd);
		});
	}

})	

//create new posts

$('#postForm').on('submit', function(event){
		var $newPost = [{
			inputName: $('#inputName').val(),
			authorName: $('#authorName').val(),
			inputPost: $('#inputPost').val()
		}]

$.ajax({
	url:'/blog',
	type:'POST',
	data: $newPost,
	success: function(data) {
		console.log($newPost);
		var $blogPostAdd = $(blogTemplate(data));
		$blog.prepend($blogPostAdd);
		}
	});
});

// var $newPost = $('#postForm');
// 		$newPost.on('submit', function(event){
// 			event.preventDefault();
// 			var $inputName = $('#inputName').val();
// 			var $authorName = $('#authorName').val();
// 			var $inputPost = $('#inputPost').val();
// 			var blogPost = new BlogPost($inputName,$authorName,$inputPost);
// 			blogPost.save();
// 			blogPost.render();
// 			$("form").trigger("reset");
// 			$('#inputName').focus();
// 		});


//send put request to update posts

//send delete request to delete posts

//comments - not working yet


// var NewComment = function(modalInputName,modalInputPost){
// 	this.modalInputName = modalInputName;
// 	this.modalInputPost = modalInputPost;
// };

// var newComment1 = new NewComent ["This is great!"];
// var newComment2 = new NewComment ["I don't agree with any of this!"]

// NewComment.all=[newComment1, newComment2];
// console.log(NewComment.all);

// var $comment = $('#commentSection');

// _.each(NewComment.all, function(comment,index){
// 	var $newCommentAdd = $(blogTemplate(b
	logPost));
// 	$newCommentAdd.attr('data-index', index);
// 	$comment.append($newCommentAdd);
// });


// NewComment.prototype.save = function(){
// 	NewComment.all.push(this);
// 	console.log(NewComment.all);
// }

// NewComment.prototype.render = function(){
// 	var $comment = $('#modalForm');
// 	var $toDo = $(toDoTemplate(this));
// 	$comment.append($toDo);
// }

// var $newComment = $('modalForm');
// 	$newComment.on('submit',function(event){
// 		event.preventDefault();
// 		var $modalInputName = $('#modalInputName').val();
// 		var $modalInputPost = $('#modalInputPost').val();
// 		var comment = new NewComment($modalInputName, $modalInputPost);
// 		comment.save();
// 		comment.render();
// 	})

});