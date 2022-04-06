/*
	Features left to add:
		
		add more pokemon
		
		make spell checking system - still needs work
		
		make it so it auto focuses on the text box
		
		add anti cheating methods
		
		make sure images are removed from memory after they are displayed
		
		add option to select for specific regions/ exclude regional variants, alternate forms, mega
			do this later
			have start page with options
			sends to new page based on selected options
				text version, true false
					
		Result Table-
			display all pokemon/number of times gotten correct
			
		option to include unknown forms,vivilion forms, random spinda image?, pikachu costumes, dynamax pokemon
			
		shiny pokemon mechanic
		
		options for regional dexes
		
		make it look perty, look like the pokedex
		
		fix the skeleton
		
		put on xampp web server
		
		make multiple person version -different script with correct/incorect button and click to display name for checking purposes

*/

document.addEventListener("DOMContentLoaded", startGame);

var Pokemon= ["bulbasaur", "ivysaur", "venasaur", "charmander", "charmeleon", "charizard","squirtle",
"wartortle","blastoise", "caterpie", "metapod", "butterfree","weedle", "kakuna", "beedrill","pidgey","pidgeotto",
"pidgeot","rattata","raticate","spearow","fearow","ekans","arbok","pikachu","raichu","sandshrew",
"sandslash","nidoran_female","nidorina","nidoqueen","nidoran_male","nidorino","nidoking","clefairy",
"clefable","vulpix","ninetales","jigglypuff","wigglytuff","zubat","golbat","oddish",
"gloom","vileplume","paras","parasect","venonat","venomoth","diglett","dugtrio","meowth",
"persian","psyduck","golduck","mankey","primeape","growlithe","arcanine","poliwag","poliwhirl","poliwrath",
"abra","kadabra","alakazam","machop","machoke","machamp","bellsprout","weepinbell","victreebell",
"tentacool","tentacruel","geodude","graveler","golem","ponyta","rapidash","slowpoke", "slowbro","magnemite",
"magneton","farfetch'd","doduo","dodrio","seel","dewgong","weepinbell","victreebell","tentacool","tentacruel",
"grimer","muk","shellder","cloyster","gastly","haunter","gengar","onix","drowzee","hypno","krabby","kingler",
"voltorb","electrode","exeggcute","exeggutor","cubone","marowak","hitmonlee","hitmonchan",
"likitung","koffing","weezing","rhyhorn","rhydon","chansey","tangela","kangaskhan",
"horsea","seadra","goldeen","seaking","staryu","starmie","mr._mime","scyther",
"jynx","electabuzz","magmar","pinsir","tauros","magikarp","gyarados","lapras","ditto",
"eevee","vaporeon","jolteon","flareon","porygon","omanyte","omastar","kabuto","kabutops","aerodactyl",
"snorlax","articuno","zapdos","moltres","dratini","dragonair","dragonite","gyarados","mewtwo","mew"];

var roundCount= Pokemon.length;
var max=Pokemon.length;
var score=0;
var count=-1;
var randomNumber = Math.floor(Math.random() * max) + 1;
var pokemonName;

var sec=0;
var mili=0;
var min =0;
var stop = true;
var timeEnd;
var mispelled =0;

//check for cheaters
var cheater =false;



function startGame(){
	document.getElementById("RandomImage").innerHTML=("<img src=/Users/jknic/Documents/Pokemon_Quiz/Images/start.png width=300px height=300px ></img>");
	document.getElementById("inputSection").innerHTML=("<button type=button class=butn onClick=generateRandom()>Start The Game</button>");
	
	
	//generateRandom();
}

function generateRandom(){
	document.getElementById("Timer").innerHTML=("00:00");
	
	if(count == -1){
		count++;
		document.getElementById("inputSection").innerHTML=("<input type=text id=input1></input>");
	}
	
	document.getElementById("progress").innerHTML=("<p>Game Progress:"+count+"/"+roundCount+"</p>"+
	"<p>Correct:"+ score);
	
	if(count>= roundCount){
		
		displayResult();
		return;
	
	}
	
	
	
	randomNumber = Math.floor(Math.random() * max) + 1;
	generateImg();
	startTimer();
	
}

function generateImg(){
	
	
	if(Pokemon[randomNumber-1] == "nidoran_female" ){
		pokemonName = "nidoran female"
	}
	else if (Pokemon[randomNumber-1] == "nidoran_male" ){
		pokemonName = "nidoran male"
	}
	
	else if(Pokemon[randomNumber-1] == "mr._mime" ){
		pokemonName = "mr. mime"
	}
	
	else{
		pokemonName= Pokemon[randomNumber-1];
	}	
		
	//selectedRandom[randomNumber] = 1;
	
	document.getElementById("RandomImage").innerHTML=("<img src=/Users/jknic/Documents/Pokemon_Quiz/Images/"+Pokemon[randomNumber-1]+".png width=300px height=300px ></img>");
		
	
	var input = document.getElementById("input1");
	input.addEventListener("keydown", function (e) {
	
	if (e.key === "Enter") { 
		if (document.getElementById('input1').value == ""){
			//document.getElementById("Answer").innerHTML= "Please enter a name";
			(e);
		}
		
		else{
			var player_guess = document.getElementById('input1').value;
			document.getElementById('input1').value = "";
			player_Guess(player_guess);
			return;
		}
	
	}
	
	else if (e.key == "null"){
		return;
	}
  
	});
	
	//check for dirty dirty cheaters
	document.addEventListener("keydown", function (e){
    
		if(e.key == "F12"){
		    //alert("You cheated not only the game, but yourself. You didn't grow. You didn't improve. You took a shortcut and gained nothing. You experienced a hollow victory. Nothing was risked and nothing was gained. It's sad that you don't know the difference.");
			cheater = true;
		}
	
	});
	
	// shortcut.add("F12", function() {
    		    // alert("You cheated not only the game, but yourself. You didn't grow. You didn't improve. You took a shortcut and gained nothing. You experienced a hollow victory. Nothing was risked and nothing was gained. It's sad that you don't know the difference.");

//});
	
}

function player_Guess(  player_guess){
	var correctPokemon= pokemonName;
	var Length=0;
	var player_chars= [];
	var answer_chars = [];
	var unique_chars =[];
	var chars=[];
	var canAdd=true;
	var duplicate=0;
	var contain =0;
	var correct= false;
	var unique =correctPokemon.length;
	var correctNo=0;
	
	for (var i = 0; i < player_guess.length; i++) {
		player_chars[i]=player_guess.charAt(i);
	}
	
	for (var i = 0; i < pokemonName.length; i++) {
		answer_chars[i]=pokemonName.charAt(i);
	}
	
	//check for longer length
	if (player_chars.length > answer_chars.length){
		Length=player_chars.length;
	}
	
	else if (player_chars.length<answer_chars.length){
		Length=answer_chars.length;
	}
	
	else 
		Length=answer_chars.length;
	
	//get unique characterSet
	for ( var i=0; i<Length; i++){
		if (unique_chars.length == 0){
			unique_chars[i]= answer_chars[i];
		}
		
		else{
			var j=i;
			var temp=answer_chars[j];
			while(j>0){
				if(temp==answer_chars[j-1] && j-1 >=0){
					canAdd=false;
					duplicate++;
					unique--;
					j--;
				}
				
				// else if(j-1 <0){
					// j--;
					// continue;
				// }
				
				else{
					j--;
				}
				
				
				
			}
			if(canAdd ==true){
					unique_chars[i]=temp;
					
			}
			
			else{
				canAdd = true;
			}
		}
		
	}
	
	
	//check to make sure player guess has all unique characters
	
	for ( var i=0; i<Length; i++){
			
				if(player_chars[i]==unique_chars[i]){
					contain++;
				}
				
				///do this
				
				// else if(j-1 <0){
					// continue;
				// }
				
			}
	
	//loop through and check if length is at least 3 from answer, count same chars, 2 acceptable 
	
	for(var i=0; i<Length; i++){
		let j=i+1;
		if (answer_chars[i]==null || player_chars[i]== null)
			break;
		
		else if (answer_chars[i] == player_chars[i]){
			correctNo++;
		}
	}
	
	let alloted= answer_chars.length-2;
	if (correctNo >= alloted && contain.length == unique_chars.length){
		correct =true;
	}
	
	else 
		correct=false;
	
	
	if(player_guess==pokemonName || correct ==true){
		
		document.getElementById("Answer").innerHTML= "Correct!";
		score++;
		count++;
		max=max-1;
		
		Pokemon.splice(randomNumber-1, 1);
		
		generateRandom();
		return;
		
	}
	
	else if(correct == false && unique >= 1 || correctPokemon.length-player_Guess.length == 1){
		document.getElementById("Answer").innerHTML= "Mispelled, Pokemon name is: "+ pokemonName;
		mispelled++;
		count++;
		max=max-1;
		
		Pokemon.splice(randomNumber-1, 1);
		
		generateRandom();
		
	}
	
	else{
		document.getElementById("Answer").innerHTML= "Inncorect! That PokeMon was "+ pokemonName+ " stupid";
		count++;
		max=max-1;
		
		Pokemon.splice(randomNumber-1, 1);
		
		generateRandom();
		return;
	}
	return;
}

function displayResult(){
	stopTimer();
	document.getElementById("inputSection").innerHTML=("");
	document.getElementById("RandomImage").innerHTML=("<img src=start.png width=300px height=300px ></img>");
	document.getElementById("resultsSection").innerHTML=("<h5 id=Answer>Final Score: "+ score +"/"+roundCount+
	"</h5>"+"<h5 id=Time>Time: "+ timeEnd +"</h5>"+"<button type=button class=butn onClick=resetGame()>Retry</button>");
		
	
}
 

function resetGame(){
	location.reload();
}


function startTimer(){
	if (stop == true) {
        stop = false;
        timerCycle();
    }
}

function stopTimer(){
	if (stop == false) {
    stop = true;
  }
}

function timerCycle(){
	 if (stop == false) {
		 sec= parseInt(sec);
		 mili=parseInt(mili);
		 min=parseInt(min);
		 
		 mili+=1;
		 
		 if (mili == 100){
			 sec+=1;
			 mili=0;
		 }
		 
		 if (sec== 60){
			min +=1;
			sec=0;
		 }
		 
		 if (mili < 10 || mili == 0) {
			 mili = '0' + mili;
		 }
		
		if (sec < 10 || sec == 0) {
			sec = '0' + sec;
		}
		
		if (min < 10 || min == 0) {
			min = '0' + min;
		}
		 
		 document.getElementById("Timer").innerHTML= "<p>"+min+":"+sec+"</p>";
		 
		 
		timeEnd= min+":"+sec+":"+mili;
		 
		 setTimeout("timerCycle()", 10);
		 
	 }
	 
function compare(){
	
	shortcut.add("F12", function() {
});
	
}
}