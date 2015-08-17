    var game_block_in_height=16;
	var game_block_in_width = 20;
	var snake_body_array = [4,3,2,1,0];
	var bean_pos = Math.floor(Math.random()*game_block_in_height*game_block_in_width);
	var direction = "right";
	var difficulty = "easy";

$(document).ready(function(){

	//global variables for playing
	
	//build the grid of the game
	for(var i = 0; i<game_block_in_height; i++){
		for(var j = 0; j<game_block_in_width; j++){
			$('.container').append('<div class="game_block" id="b_'+ (i*game_block_in_width+j) +'"><div>');
		}
	}
	
	//init the snake body and head
	// init the random bean position
	// make sure bean position won't stack with snake itself
	resetBoard();

	// test with user control
	$(document).keydown(function(key){
		// detect key press for direction change
		switch(key.keyCode){
			case 38 :    
			case 87 :// up
				if(direction !== "down"){   // can't go up when towardz down
					direction = "up";
				}
				break;
			case 39 :
			case 68 :    // right
				if(direction !== "left"){   
					direction = "right";
				}
				break;
			case 40 :    // down
			case 83 :
				if(direction !== "up"){   
					direction = "down";
				}
				break;
			case 37 :    // left
			case 65 :
				if(direction !== "right"){   
					direction = "left";
				}
				break;
			default :
				break;   // do nothing when other key pressed
		}
		//var next_pos = snakeNextPos(snake_body_array[0],direction);
		//snakeBeanCheck(snake_body_array, next_pos, bean_pos);
	});

	// start game by pressing enter
	$(document).keypress(function(key){
		if(key.keyCode == 13){
			if(typeof(snake_loop) == "undefined"){
				snakeStart();
			}else{
				snakeStop();
				resetBoard();
				snakeStart();
			}
			
		}
	});
});


// function for get the next position of snake move
// return positive number mean ok, -1 means snake dead
function snakeNextPos(snake_head_pos,direction){
	var next_pos;
	// calculate the next position of head
	switch(direction){
		case 'up':
			if(snake_head_pos<game_block_in_width && snake_head_pos>=0){
				return -1; // reach top edge, stop game
			}else{
				next_pos = snake_head_pos - game_block_in_width;
			}
			break;
		case 'right':
			if(snake_head_pos%game_block_in_width==19){
				return -1; // reach right edge, stop game
			}else{
				next_pos = snake_head_pos + 1;
			}
			break;
		case 'down':
			if(snake_head_pos<game_block_in_height*game_block_in_width && snake_head_pos>=game_block_in_width*(game_block_in_height-1)){
				return -1; // reach bottom edge, stop game
			}else{
				next_pos = snake_head_pos + game_block_in_width;
			}
			break;
		case 'left':
			if(snake_head_pos%game_block_in_width==0){
				return -1; // reach right edge, stop game
			}else{
				next_pos = snake_head_pos - 1;
			}
			break;
		default : return -1;
	}
	return next_pos;
}

// function for check eat bean or not
function snakeBeanCheck(snake_body_array,next_pos){
	if(next_pos!==bean_pos){
		// change the color of snake
		// if not eat bean
		$('#b_'+ next_pos).addClass('snake_head');
		$('#b_'+ snake_body_array[0]).removeClass('snake_head');
		$('#b_'+ snake_body_array[0]).addClass('snake_body');
		$('#b_'+ snake_body_array[snake_body_array.length-1]).removeClass('snake_body');
		snake_body_array.pop();
		snake_body_array.unshift(next_pos);
	}else{ // if eat the bean
		$('#b_'+ bean_pos).removeClass('bean');
		$('#b_'+ next_pos).addClass('snake_head');
		$('#b_'+ snake_body_array[0]).removeClass('snake_head');
		$('#b_'+ snake_body_array[0]).addClass('snake_body');
		snake_body_array.unshift(next_pos);
		bean_pos = newBean(snake_body_array);

	}
}

// functoin for generate new bean position
function newBean(snake_body_array){
	bean_pos = Math.floor(Math.random()*game_block_in_height*game_block_in_width);  
	while(snake_body_array.indexOf(bean_pos)!==-1){
		 bean_pos = Math.floor(Math.random()*game_block_in_height*game_block_in_width);   
	}
	$('#b_'+ bean_pos).addClass('bean');
	return bean_pos;
}

// function for start the game
function snakeStart(){	
	snake_loop = setInterval(function(){
		var next_pos = snakeNextPos(snake_body_array[0],direction);
		if(next_pos == -1) {
			snakeStop();
			return;
		}
		snakeBeanCheck(snake_body_array, next_pos, bean_pos);
	}, 200);
}

// function for stop the game
function snakeStop(){
	window.clearInterval(snake_loop);
}

function resetBoard(){
	// remove all the snake and bean
	$('#b_'+ bean_pos).removeClass('bean');
	$('#b_'+ snake_body_array[0]).removeClass('snake_head');
	for(var i=1; i< snake_body_array.length ;i++){
		$('#b_'+ snake_body_array[i]).removeClass('snake_body');
	}
	// reset snake , bean and direction
	snake_body_array = [4,3,2,1,0];   
	bean_pos = newBean(snake_body_array);
	$('#b_'+ snake_body_array[0]).addClass('snake_head');
	for(var i=1;i<5;i++){
		$('#b_'+ snake_body_array[i]).addClass('snake_body');
	}
	direction = "right";
}