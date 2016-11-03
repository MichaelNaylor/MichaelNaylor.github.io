var currentEnemyHealth = 10;
var maxEnemyHealth = 10;

var baseClickPower = 1;
var bonusClickPower = 0;
var bobClickPower = 0;
var bobClickMultiplyer = 1;
var totalBobClickPower = 0;
var clickPowerMultiplyer = 1;
var totalClickPower = 1;

var baseDamagePerSecond = 0;
var bonusDamagePerSecond = 0;
var damagePerSecondMultiplyer = 1;
var totalDamagePerSecond = 0;

var baseCliveDps = 1;
var cliveDpsMultiplyer = 1;
var totalCliveDps = 0;

var baseDaveDps = 5;
var daveDpsMultiplyer = 1;
var totalDaveDps = 1;

var currentLevel = 1;
var currentStage = 1;
var maxStage = 10;

var currentGold = 10000000;

var baseKillReward = 1;
var bonusKillReward = 0;
var killRewardMultiplyer = 1;
var totalKillReward = 0;

var bobUnlocked = false;
var cliveUnlocked = false;
var daveUnlocked = false;

var bobUpg1Available = true;
var bobUpg2Available = true;
var bobUpg3Available = true;
var bobUpg4Available = true;
var bobUpg5Available = true;

var cliveUpg1Available = true;
var cliveUpg2Available = true;
var cliveUpg3Available = true;
var cliveUpg4Available = true;
var cliveUpg5Available = true;

var daveUpg1Available = true;
var daveUpg2Available = true;
var daveUpg3Available = true;
var daveUpg4Available = true;
var daveUpg5Available = true;

var heroLevelBob = 0;
var heroLevelClive = 0;
var heroLevelDave = 0;

window.setInterval(function mainUpdate() {
		
		bobClickPower=(heroLevelBob);
		totalBobClickPower = (bobClickPower * bobClickMultiplyer);
		
		totalCliveDps=(baseCliveDps*heroLevelClive)*cliveDpsMultiplyer;
		totalDaveDps = (baseDaveDps * heroLevelDave) * daveDpsMultiplyer;
		
		totalDamagePerSecond = (baseDamagePerSecond + bonusDamagePerSecond + totalCliveDps + totalDaveDps) * damagePerSecondMultiplyer;
		
		if (bobUnlocked === true){
			totalClickPower = (((baseClickPower + bonusClickPower) * clickPowerMultiplyer) + totalBobClickPower);
		} else {
			totalClickPower = ((baseClickPower + bonusClickPower) * clickPowerMultiplyer);
		} ;
	
		baseKillReward = ((maxEnemyHealth / 10) * currentLevel);
		totalKillReward = ((baseKillReward + bonusKillReward) * killRewardMultiplyer);
		
		document.getElementById("maxEnemyHealth").innerHTML = prettify (maxEnemyHealth).toFixed(0);
		
		enemyHealthPct.value = currentEnemyHealth;
		enemyHealthPct.max = maxEnemyHealth;
		
		if (currentEnemyHealth <= 0){
			currentStage += 1;
			currentEnemyHealth = maxEnemyHealth;
			currentGold += totalKillReward;
		};
		
		if (currentStage > maxStage){
			currentLevel += 1;
			currentStage = 1;
			maxEnemyHealth = Math.floor(10 * Math.pow(1.45,currentLevel));
			currentEnemyHealth = maxEnemyHealth;
		};
		
		if (cliveUnlocked == true || daveUnlocked == true){
			currentEnemyHealth -= totalDamagePerSecond /100;
			
		}
		
		document.getElementById("currentLevel").innerHTML = prettify (currentLevel).toLocaleString();
		document.getElementById("currentGold").innerHTML = prettify (currentGold).toFixed(0);
		document.getElementById("currentStage").innerHTML = prettify (currentStage).toLocaleString();
		document.getElementById("maxStage").innerHTML = prettify (maxStage).toLocaleString();
		document.getElementById("totalClickPower").innerHTML = prettify (totalClickPower).toFixed(0);	
		document.getElementById("currentEnemyHealth").innerHTML = prettify (currentEnemyHealth).toFixed(0);
		document.getElementById("dpsDisplay").innerHTML = prettify (totalDamagePerSecond).toFixed(0);

}, 10)


function prettify(input){
    var output = Math.round(input * 1000000)/1000000;
	return output;
}

function clickAttack(number){
	
		currentEnemyHealth -= totalClickPower;
		document.getElementById("currentEnemyHealth").innerHTML = prettify (currentEnemyHealth).toFixed(0);
}

function herosUnlock() {
	document.getElementById("unlockHeros").style.visibility = "hidden";
	document.getElementById("heroDisplay").style.visibility = "show";
}

function bobLevelUp(){
	bobUnlocked = true;
    var bobLevelUpCost = Math.floor(5 * Math.pow(1.15,heroLevelBob));  
    if(currentGold >= bobLevelUpCost){   
		heroLevelBob += 1;
    	currentGold -= bobLevelUpCost;
        document.getElementById('heroLevelBob').innerHTML = prettify (heroLevelBob).toLocaleString(); 
    }
    var nextBobLevelUpCost = Math.floor(5 * Math.pow(1.3,heroLevelBob));       
    document.getElementById('levelBobCost').innerHTML = prettify (nextBobLevelUpCost).toFixed(0);  
}

function buyBobUpg1 () {
	var bobUpg1Cost = 10;
	if (bobUpg1Available == true && currentGold >= bobUpg1Cost && heroLevelBob >= 10){
		bobUpg1Available = false;
		bobClickMultiplyer += 1;
		currentGold -= bobUpg1Cost;
	}
	
}

function buyBobUpg2 () {
	var bobUpg2Cost = 25;
	if (bobUpg2Available == true && currentGold >= bobUpg2Cost && heroLevelBob >= 25){
		bobUpg2Available = false;
		bobClickMultiplyer += 1;
		currentGold -= bobUpg2Cost;
	}
	
}

function buyBobUpg3 () {
	var bobUpg3Cost = 50;
	if (bobUpg3Available == true && currentGold >= bobUpg3Cost && heroLevelBob >= 50){
		bobUpg3Available = false;
		bobClickMultiplyer += 1.5;
		currentGold -= bobUpg3Cost;
	}
	
}

function buyBobUpg4 () {
	var bobUpg4Cost = 75;
	if (bobUpg4Available == true && currentGold >= bobUpg4Cost && heroLevelBob >= 75){
		bobUpg4Available = false;
		bobClickMultiplyer += 2;
		currentGold -= bobUpg4Cost;
	}
	
}

function buyBobUpg5 () {
	var bobUpg5Cost = 100;
	if (bobUpg5Available == true && currentGold >= bobUpg5Cost && heroLevelBob >= 100){
		bobUpg5Available = false;
		bobClickMultiplyer += 2;
		currentGold -= bobUpg5Cost;
	}
	
}

function cliveLevelUp () {
	var cliveLevelUpCost = Math.floor(10 * Math.pow(1.3, heroLevelClive));
	cliveUnlocked = true;
	if(currentGold >= cliveLevelUpCost) {
		heroLevelClive += 1;
		currentGold -= cliveLevelUpCost;
		document.getElementById('heroLevelClive').innerHTML = prettify (heroLevelClive).toFixed (0);
	}
	var nextCliveLevelUpCost = Math.floor(10 * Math.pow(1.3,heroLevelClive));
	document.getElementById('levelCliveCost').innerHTML = prettify (nextCliveLevelUpCost).toFixed(0);
	
}

function buyCliveUpg1 () {
	var cliveUpg1Cost = 75;
	if (cliveUpg1Available == true && currentGold >= cliveUpg1Cost && heroLevelClive >= 10){
		cliveUpg1Available = false;
		cliveDpsMultiplyer += 1;
		currentGold -= cliveUpg1Cost;
	}

}

function buyCliveUpg2 () {
	var cliveUpg2Cost = 250;
	if (cliveUpg2Available == true && currentGold >= cliveUpg2Cost && heroLevelClive >= 25){
		cliveUpg2Available = false;
		cliveDpsMultiplyer += 1;
		currentGold -= cliveUpg2Cost;
	}
	
}

function buyCliveUpg3 () {
	var cliveUpg3Cost = 750;
	if (cliveUpg3Available == true && currentGold >= cliveUpg3Cost && heroLevelClive >= 50){
		cliveUpg3Available = false;
		cliveDpsMultiplyer += 1.5;
		currentGold -= cliveUpg3Cost;
	}
	
}

function buyCliveUpg4 () {
	var cliveUpg4Cost = 1500;
	if (cliveUpg4Available == true && currentGold >= cliveUpg4Cost && heroLevelClive >= 75){
		cliveUpg4Available = false;
		cliveDpsMultiplyer += 2;
		currentGold -= cliveUpg4Cost;
	}
	
}

function buyCliveUpg5 () {
	var cliveUpg5Cost = 5000;
	if (cliveUpg5Available == true && currentGold >= cliveUpg5Cost && heroLevelClive >= 100){
		cliveUpg5Available = false;
		cliveDpsMultiplyer += 2;
		currentGold -= cliveUpg5Cost;
	}

}

function daveLevelUp () {
	var daveLevelUpCost = Math.floor(100 * Math.pow(1.3, heroLevelDave));
	daveUnlocked = true;
	if(currentGold >= daveLevelUpCost) {
		heroLevelDave += 1;
		currentGold -= daveLevelUpCost;
		document.getElementById('heroLevelDave').innerHTML = prettify (heroLevelDave).toFixed (0);
	}
	var nextDaveLevelUpCost = Math.floor(100 * Math.pow(1.3,heroLevelDave));
	document.getElementById('levelDaveCost').innerHTML = prettify (nextDaveLevelUpCost).toFixed(0);
	
}

function buyDaveUpg1 () {
	var daveUpg1Cost = 750;
	if (daveUpg1Available == true && currentGold >= daveUpg1Cost && heroLevelDave >= 10){
		daveUpg1Available = false;
		daveDpsMultiplyer += 1;
		currentGold -= daveUpg1Cost;
	}
	
}

function buyDaveUpg2 () {
	var daveUpg2Cost = 2500;
	if (daveUpg2Available == true && currentGold >= daveUpg2Cost && heroLevelDave >= 25){
		daveUpg2Available = false;
		daveDpsMultiplyer += 1;
		currentGold -= daveUpg2Cost;
	}
	
}

function buyDaveUpg3 () {
	var daveUpg3Cost = 7500;
	if (daveUpg3Available == true && currentGold >= daveUpg3Cost && heroLevelDave >= 50){
		daveUpg3Available = false;
		daveDpsMultiplyer += 1.5;
		currentGold -= daveUpg3Cost;
	}
	
}

function buyDaveUpg4 () {
	var daveUpg4Cost = 25000;
	if (daveUpg4Available == true && currentGold >= daveUpg4Cost && heroLevelDave >= 75){
		daveUpg4Available = false;
		daveDpsMultiplyer += 2;
		currentGold -= daveUpg4Cost;
	}

}

function buyDaveUpg5 () {
	var daveUpg5Cost = 100000;
	if (daveUpg5Available == true && currentGold >= daveUpg5Cost && heroLevelDave >= 100){
		daveUpg5Available = false;
		daveDpsMultiplyer += 2;
		currentGold -= daveUpg5Cost;
	}
	
}
