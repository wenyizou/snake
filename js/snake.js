
$(document).ready(function(){

	//global variables for playing
	var game_block_in_height=16;
	var game_block_in_width = 20;
	var snake_body_array = [4,3,2,1,0];
	var bean_pos = Math.floor(Math.random()*game_block_in_height*game_block_in_width);
	//build the grid of the game
	for(var i = 0; i<game_block_in_height; i++){
		for(var j = 0; j<game_block_in_width; j++){
			$('.container').append('<div class="game_block" id="b_'+ (i*game_block_in_width+j) +'"><div>');
		}
	}
	
	//init the snake body and head
	$('#b_'+ snake_body_array[0]).addClass('snake_head');
	for(var i=1;i<5;i++){
		$('#b_'+ snake_body_array[i]).addClass('snake_body');
	}

	// init the random bean position
	// make sure bean position won't stack with snake itself
	while(snake_body_array.indexOf(bean_pos)!==-1){
		var bean_pos = Math.floor(Math.random()*game_block_in_height*game_block_in_width);   
	}
	$('#b_'+ bean_pos).addClass('bean');
});

