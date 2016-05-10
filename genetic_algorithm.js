var invidual = function(length,min,max){
	var inv = []
	for(var i=0;i<length;i++){
		inv.push(Math.round(Math.random()*100))
	}
	return inv
}

var population = function(count,length){
	pop = []
	for( var i=0;i<count;i++){
		
		pop.push(invidual(length))
	}
	return pop;
}


var fitness = function(indv,target){
	return  Math.abs(target - indv.reduce(function(p,c,i){
		return p+c;
	}))
}

var grade = function(pop,target){
	var sums = [];
	for(var i=0;i<pop.length;i++){

		sums.push(fitness(pop[i],target));


	}
	sums = sums.reduce(function(p,c){
		return p+c
	})
	return sums/pop.length
}


var evolve = function(pop,retain,random_select,mutate/*,target,,mutate*/){
	graded =  pop.sort(function(a,b){
	
				return fitness(a,200)-fitness(b,200)
			 })
	retain_length = parseInt(graded.length*retain,0);
	parents = graded.slice(0,retain_length)

	regrouped = graded.slice(retain_length)

	//andomly add other individuals to promote genetic diversity
	for(invidual in regrouped){
		
		if(random_select > Math.random()){
			//console.log("some random inviduals added");
			parents.push(regrouped[invidual]);
		}
	}

	// mutate some individuals

	for(invidual in parents){
		if(mutate>Math.random()){
			//console.log("mutation happens");
			pos_to_mutate = Math.round(Math.random()*(parents[invidual].length-1));
			parents[invidual][pos_to_mutate] = Math.floor( Math.random() * ((Math.max(...parents[invidual])-Math.min(...parents[invidual]))+1) + Math.min(...parents[invidual]) )
		}
	}

	//Crossover parents

	var parents_length = parents.length,
	 	desired_length = pop.length - parents_length,
	 	children = [];
var braker = 0
	while(children.length<desired_length){
		braker++;
		if(braker>500){
			break;
		}
		var male_pos = Math.round(Math.random()*(parents_length-1)),
			female_pos = Math.round(Math.random()*(parents_length-1));
		//console.log("cl: "+children.length+ " x: "+desired_length+" y: "+parents_length )
		
		if(male_pos!=female_pos){
			var	male = parents[male_pos],
				female = parents[female_pos],
			//console.log(female)
				half = female.length/2,
				child = male.slice(half).concat(female.slice(0,half));
				children.push(child)
		}



	}	


//console.log(parents.concat(children))

return parents.concat(children);
}


var target = 200,
	p_count = 100,
	i_length = 6;

pop = population(p_count,i_length);

console.log(grade(pop,target));

for(var i=0;i<1000;i++){
	//console.log(i)
	pop = evolve(pop,0.2,0.05,0.01);
	console.log(grade(pop,target));
}

window.onload = function(){
		//alert('x')
	}