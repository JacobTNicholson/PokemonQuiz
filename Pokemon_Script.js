/*
	Features left to add:
		
		fix result section to display after short time using setInterval() function
		
		make multiple person version -different script with correct/incorect button and click to display name for checking purposes
		
		add more pokemon
		
		make spell checking system
		
		add option to select for specific regions/ exclude regional variants, alternate forms, mega
			have start page with options
			sends to new page based on selected options
				text version, true false
					
		Result Table-
			display all pokemon/number of times gotten correct
			
		option to include unknown forms,vivilion forms, random spinda image?, pikachu costumes, dynamax pokemon
			
		shiny pokemon mechanic
		
		options for regional dexes
		
		make it look perty
		
		fix the skeleton
		
		put on xampp web server
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

var roundCount= 5;
//Pokemon.length;
var max=Pokemon.length;
var score=0;
var count=-1;
var randomNumber = Math.floor(Math.random() * max) + 1;
var pokemonName;

var sec=0;
var mili=0;
var stop = true;
var timeEnd;


function startGame(){
	document.getElementById("RandomImage").innerHTML=("<img src=start.png width=300px height=300px ></img>");
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
	
	document.getElementById("RandomImage").innerHTML=("<img src="+Pokemon[randomNumber-1]+".png width=300px height=300px ></img>");
		
	
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
	
}

function player_Guess(  player_guess){
	var correctPokemon= pokemonName;
	
	if(player_guess==pokemonName){
		document.getElementById("Answer").innerHTML= "Correct!";
		score++;
		count++;
		max=max-1;
		
		Pokemon.splice(randomNumber-1, 1);
		
		generateRandom();
		return;
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
		 
		 mili+=1;
		 
		 if (mili == 100){
			 sec+=1;
			 mili=0;
		 }
		 
		 if (mili < 10 || mili == 0) {
			mili = '0' + mili;
		}
		
		if (sec < 10 || sec == 0) {
			sec = '0' + sec;
		}
		 
		 document.getElementById("Timer").innerHTML= "<p>"+sec + ":" +mili+"</p>";
		 
		 
		timeEnd= sec+":"+mili;
		 
		 setTimeout("timerCycle()", 10);
		 
	 }
}




