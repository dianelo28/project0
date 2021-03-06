<!--//client side JS-->

$(document).ready(function(){

var $blog = $('#blog')

var blogTemplate = _.template($('#blogTemplate').html());
var commentTemplate = _.template($('#commentTemplate').html());

//compile phrase template
$.ajax({
	url:'/api/blog',
	type:'GET',
	success: function(data){
		var blogTemplate = _.template($('#blogTemplate').html());

		var $posts = data

		_.each($posts, function(item){
			var $blogPostAdd = $(blogTemplate(item));
			$blog.prepend($blogPostAdd);
		});
	}
});


//create new posts

$('#postForm').on('submit', function(event){
		event.preventDefault();
		var $newPost = {
			inputName: $('#inputName').val(),
			authorName: $('#authorName').val(),
			inputPost: $('#inputPost').val()
		}

$.ajax({
	url:'/api/posts',
	type:'POST',
	data: $newPost,
	success: function(data) {
		var $blogPostAdd = $(blogTemplate(data));
		$blog.prepend($blogPostAdd);
		console.log($newPost);
		console.log(data);
			$("form").trigger("reset")
		}
	});
});

//create new comment


//comment on click finding the closest blog post
$(document).on('click', '.commentButton', function(event){
	var postId = $($(this).closest('.blog')).attr('data-id');
	console.log(postId);

// when comment is submitted
	$('#submitComment').on('click', function(event){

	var $newComment = {
		// commentAuthor: $('#commentAuthor').val(),
		commentPost: $('#commentPost').val()
	}

	console.log($newComment);

	$.ajax({
	url:'/api/posts/'+ postId +'/comments/',
	type:'POST',
	data: $newComment,
	success: function(data) {
		var $commentAdd = $(commentTemplate(data));
		$("#commentPlacement-" + data._id).append($commentAdd);
		console.log($newComment);
		console.log(data);
			$("#comment").modal("hide")
		}
	});
	});
});

//edit a post

$(document).on('click', '.editButton', function(event){
	postId = $($(this).closest('.blog')).attr('data-id');
	console.log(postId);

	$.ajax({
		url:'/api/posts/' + postId,
		type:'GET',
		success: function(res){
			$('#editInputName').val(res.inputName);
			$('#editAuthorName').val(res.authorName);
			$('#editInputPost').val(res.inputPost);
			}
		});
	});

$('#submitEdit').on('click', function(event){

	var post = {
			inputName: $('#editInputName').val(),
			inputPost: $('#editInputPost').val()
		}
		console.log(post);

	$.ajax({
		url:'/api/posts/' + postId,
		type:'PUT',
		data: post,
		success: function(data){
			var $blogPostAdd = $(blogTemplate(data));
			$('#flip-' + postId).replaceWith($blogPostAdd);
		}
	});
	$("#edit").modal("hide");
});

$('#deletePost').on('click', function(event){
	var phraseId = $($(this).closest('.blog')).attr('data-id');
	$(phraseId).remove();
	console.log(phraseId)	

	$.ajax({
		url:'/api/posts/' + postId,
		type:'DELETE',
		success: function(data){
			$('#flip-' + postId).remove();
		}
	});

	$("#edit").modal("hide");
});

});