let gameArea, title, hud, setting, dangerMeter, lifeMeter;
let pointsToWin = 10, roomNum = 0, roomType, lives = 3, dangerLevel = 0, dodgeSkill = 2, wit = 2;
let story = [];

diceRoll = (length) => {
    return Math.floor(Math.random() * Math.floor(length));
}

const storyElem = {
    "room": 
        {"cavern":
            ["cave", "cavern", "den", "dugout", "fissure", "subterrane", "burrow", "chamber", "grotto"],
        "room":
            ["room", "chamber", "compartment", "torture chamber", "bocardo", "precinct", "space"],
        "clearing":
            ["clearing", "enclosure", "glade", "opening", "meadow", "dell", "hollow", "small valley"],
        },
    "elements" : 
        {"monster":
            ["Mummy", "Goblin", "Rock Golumn", "Meatball Man", "Polar Bear", "Zombie", "Ghost", "Drool Monkey", "Spaghetti Monster", "Can of Tuna With Eyes", "Crocodile Woman", "Massive Spider"],
        "human":
            ["Girl Scout", "Folk singer", "Hippie", "Quarterback", "Preist", "Knight", "Rock Singer", "Pro Bowler", "Ninja"],
        "roomPosition":
            [" Across from you is a ", " Lurking in the corner you see this ", " Meandering aimlessly in front of you is a ", " In the darkness you see a ", " You can just make out the figure of a ", " Shockingly there is a ", " What's this!? There is a ", " This can't be! And yet, you see a ", " Without warning you spot a ", " You are flabbergasted to see a "],
        "roomEnter":
            ["You prance into the ", "You creep into the ", "Trepidatiously you sneak into the  ", "Quietly you walk into the ", "Ever so slightly you edge into the ", "Continuing on you advance to the next ", "In aw you make your way into this ", "You stumble your way into some ", "Running full tilt you burst into a ", "Excitedly you advance into a "],
        "roomStart":
            ["cold ", "dark ", "smelly ", "quiet ", "creepy ", "dank ", "horrible ", "massive ", "bloody ", "bright "],
        "roomSecond":
            ["the ground is sticky.", "the ceiling is made out of spaghetti!?", "the air feels thick and gross.", "the floor is covered in marbles.", "the way back becomes obstructed!", " the sound of a howler monkey echoes through you."],
        "activity":
            [" sharpening an ax with a smile.", " baking cookies unhappily.", " throwing icecream around like an animal.", " lacing up a brand new pair of kinky boots.", " juggling chainsaws that are on fire.", " jumping through rings at increasingly higher distances.", " eating a large bowl of insects.", " chopping through a lamb shank with a ninja sword."],
        "dodge":
            ["Oh yeah! Easy money! You dodged like it was nothing!", "The odds were ever in your favor! Look At you dodge master!", "You dodged! Narrowly avoiding death!", "You doged so hard you broke the sound barrier and made your escape.", "Your reflexes are too fast! Nothing can touch you!", "If you can dodge a wrench you can sure as hell dodge this guy!"],
        "wit":
            ["You comment on how deliecious these cookies are through gritted teeth. They are terrible and it's obvious you lied.", "You wave back to the neighbor and make a comment about the weather before moving on.", "You make finger guns and explain how you\'re just passing through.", "You crack the funniest joke anybody has ever heard and laugh your way out of trouble.", "You crack the funniest joke anybody has ever heard and laugh your way out of trouble.", "There's nothing you can say here, you start singing 'hello ma baby! hello ma honey! hellow my rag time gaaaaaallll'."],
        "options": 
            ["Move to the next area", "Use quick wit, actually, let me think about it", "Dodge! Dodge! Just Dodge!", "Succomb to a slow and horrible death",]
        },
    "danger": 
    {
    "0":
        [" hands you a fresh baked cookie hot off the tray and offers to show you to the next room."],
    "moved 0":
        [ "With a stroke of bad luck you stumble and fall onto the hot tray of cookies suffereing from deadly burns."],
    "wit 0":
        ["You offended your host, now you are a ghost"],
    "dodge 0":
        ["Oh yeah! Easy money! You dodged like it was nothing! Then you forgot to keep dodging."],
    
    "1":
        [ " looks up at you, and then after a moment smiles and waves like a good neighbor."],
    "moved 1":
        [ "In a panic you try to rush ahead but the good neighbor takes offense to this, you were never seen again."],
    "wit 1":
        ["You think you are funny huh? Well you pay with a life!"],
    "dodge 1":
        ["Ohhhh so close! Welp, the odds were not ever in your favor."],

    "2":
        [" doesn't really seem to notice you but you get the feeling they are cool.", " glances up at you briefly, then goes back to what they were doing", " mildly acknowledges you approaching slightly.", " sniffs the air in your direction but pays no mind."],
    "moved 2":
        ["By chance you happened to step on a booby trap triggering spikes to impail you."],
    "wit 2":
        ["As cool as they may seem. You've offened your host! They take a life!"],
    "dodge 2":
        ["You dodged! right into a big ol' hole right there."],

    "3":
        [" growls at you before standing up slowly in a sorta angry way.", " looks angered by your prescence.", " walks towards you slowly exhuming a bad energy.", " smiles a creepy grin and advances towards you slowly."],
    "moved 3":
        ["You fail to escape the room and are cornered helplessly."],
    "wit 3":
        ["Now you've only made things worse. You feel your health weaken."],
    "dodge 3":
        ["Your reflexes are too slow! So sorry!"],

    "4":
        [" lunges at you quickly with little to no warning while screaming.", " picks up a brisk pace in your direction with daggers for eyes.", " approaches seemingly enraged by you", " jumps towards you breathing heavily through the nose."],
    "moved 4":
        [ "In a panic you try to rush ahead but the good neighbor takes offense to this, you were never seen again."],
    "wit 4":
        ["With no time to react you stand there and babble like an idiot."],
    "dodge 4":
        ["Oof no dice, you dodged so hard you broke your own ankles."],    

    "5":
        [" upon noticing you launches an attack immediately, you barely have time to think!", " instantly attacks with no warning and a whole lot of screaming.", " goes for your throat with everything they've got", " makes a B line for you with the intent to kill."],
    "moved 5":
        ["You are torn to shreds in a flurry of pain if only you had turned back!"],
    "wit 5":
        ["Your life is taken before uttering a single word."],
    "dodge 5":
        ["You dodged left when you should have dodge right. Now you won't be dodging at all."],
    }
}

populate = () => { 
    gameArea = document.querySelector('.game-area');

    //  Fill Title
    title = document.querySelector('.intro-title');
    title.innerHTML = 'Choose Your Adventure';

    // Cave Adventure Button
    let cave = document.createElement('BUTTON');
    cave.className = 'cave';
    cave.innerHTML = 'Spelunking Adventure (Short)';
    cave.addEventListener('click', caveStart);
    gameArea.appendChild(cave);

    // Dungeon Adventure Button
    let dungeon = document.createElement('BUTTON');
    dungeon.className = 'dungeon';
    dungeon.innerHTML = 'Dungeon Adventure (Medium)';
    dungeon.addEventListener('click', dungeonStart)
    gameArea.appendChild(dungeon);

    // Jungle Adventure Button
    let jungle = document.createElement('BUTTON');
    jungle.className = 'jungle';
    jungle.innerHTML = 'Jungle Adventure (Long)';
    jungle.addEventListener('click', jungleStart);
    gameArea.appendChild(jungle);
}

caveStart = () => {
    removeButtons();
    setting = 'cavern';
    title.innerHTML = 'You enter the Cave';
    let intro = document.createElement('P');
    intro.innerHTML = `
    Upon entering the cave you feel a chill role down your back.
    Something doesn\'t seem quite right.
    Unsure of yourself you walk into the cavern a little further.
    "There is nothing out of the ordinary, just a normal room." you say to yourself. 
    What do you do now?`;
    gameArea.appendChild(intro);
    firstChoice();
}

dungeonStart = () => {
    removeButtons();
    pointsToWin = 15;
    setting = 'room';
    title.innerHTML = 'You enter the Dungeon';
    let intro = document.createElement('P');
    intro.innerHTML = `
    Upon entering the dungeon you hear a loud clanging noise coming from close by.
    Something feels unsettling about this place.
    Feeling uneasy you shamble into the room and the door closes behind you.
    "Okay this is creepy, but I'm fine, right?" you say to yourself. 
    What do you do now?`;
    gameArea.appendChild(intro);
    firstChoice();
}

jungleStart = () => {
    removeButtons();
    pointsToWin = 20;
    setting = 'clearing';
    title.innerHTML = 'You enter the Jungle';
    let intro = document.createElement('P');
    intro.innerHTML = `
    Upon entering the jungle you notice a strange lack of life aroung you.
    There are no birds or critters in sight.
    Confused, you creep into clearing to investigate.
    "This is normal right? Animals are afraid of humans afterall" you say to yourself. 
    What do you do now?`;
    gameArea.appendChild(intro);
    firstChoice();
}

goBackButton = () => {
    // Go back
    let back = document.createElement('BUTTON');
    back.innerHTML = 'Go Back Now';
    back.addEventListener('click', resetGame);
    gameArea.appendChild(back);
}

firstChoice = () => {
    goBackButton();

    // Go Forward
    let forward = document.createElement('BUTTON');
    forward.innerHTML = 'Proceed Anyway';
    forward.addEventListener('click', goForward);
    gameArea.appendChild(forward);
}

resetGame = () => {
    removeText();
    removeButtons();
    story = [];
    lives = 3;
    wit = 2;
    dodgeSkill = 2;
    roomNum = 0;
    pointsToWin = 10;
    updateMeters();
    hud.style.display = 'none';
    populate();
}

goForward = () => {
    removeButtons();
    removeText();
    hud = document.querySelector('.hud');
    hud.style.display = 'block';
    newRoom();
}

updateMeters = () => {
    //Progress 
    let percent = ((roomNum)/pointsToWin)*100;
    let progressMeter = document.querySelector('.progress-made');
    progressMeter.style.width = percent + "%";

    // Fill health
    let healthMeter = document.querySelector('.lives');
    healthMeter.innerHTML = 'Lives: ' + lives;

    // Fill Danger level
    let dangerMeter = document.querySelector('.danger-level');
    dangerMeter.innerHTML = 'Danger: ' + dangerLevel;

    // Fill Dodge
    let dodgeMeter = document.querySelector('.dodge-skill');
    dodgeMeter.innerHTML = 'Dodge: ' + dodgeSkill;

    // Fill Wittiness
    let witMeter = document.querySelector('.wittiness');
    witMeter.innerHTML = 'Wittiness: ' + wit;
}

bodyParagraphA = () => {

    let entity = beingAtRandom();

    // Body Paragraph
    let text = document.createElement('P');
    text.innerHTML = 
    enterAtRandom()
    + roomStartAtRandom()
    + roomType
    + ' and '
    + roomSecondAtRandom()
    + positionAtRandom()
    + entity
    + activityAtRandom()
    + ' The '
    + entity
    + responseAtRandom();
    gameArea.appendChild(text);
}

newSetting = () => {
    let length = storyElem.room[setting].length
    roomType = storyElem.room[setting][diceRoll(length)];
}

newRoom = () => {
    roomNum++;
    if (roomNum >= pointsToWin) {
        youWin();
        return;
    }
    updateMeters();

    // Change title
    newSetting();
    title.innerHTML = roomType.toUpperCase();

    // Body paragraph
    bodyParagraphA();

    // Call to action
    let callToAction = document.createElement('H2');
    callToAction.innerHTML = 'You know what you must do...';
    callToAction.className = 'callToAction';
    gameArea.appendChild(callToAction);

    // Options
    let options = storyElem.elements.options;
    for (i = 0; i < options.length; i++) {
        let option = document.createElement('BUTTON');
        // Move Button
        if (i == 0) {
            option.addEventListener('click', moveOn);
            if (dangerLevel == 5) {
                option.innerHTML = options[i] + ' 0% Success';
            } else {
                option.innerHTML = options[i] + ' 83% Success';
            }
        }
        //Wit Button
        if (i == 1) {
            option.addEventListener('click', quickWit);
            if (dangerLevel == 0) {
                option.innerHTML = options[i] + ' 0% Success';
            } else {
                option.innerHTML = options[i] + ' ' + ((15-(dangerLevel-wit))/20)*100 +'% Success';
            }
        }
        // Dodge Button
        if (i == 2) {
            option.addEventListener('click', dodge);
            option.innerHTML = options[i] + ' ' + ((10+dodgeSkill)/20)*100 +'% Success';
        } 
        // Curl up and die button
        if (i == 3) {
            option.addEventListener('click', () => {
                lives = 0;
                updateMeters();
                gameOver('death')
            });
            option.innerHTML = options[i] + ' 0% Success';
        }
        gameArea.appendChild(option);
    }

}

//option buttons
moveOn = () => {
    let odds = diceRoll(7);
    if (odds > 5 || dangerLevel == 5) {
        death('moved');
    } else if (odds <= 5) {
        removeButtons()
        removeText()
        newRoom();
        console.log(odds, 'moved')
    }
}

quickWit = () => {
    let odds = diceRoll(21);
    if (odds + (dangerLevel-wit) > 15|| dangerLevel == 0) {
        death('wit');
    } else {
        removeText();
        removeButtons();
        useWit();
        newRoom();
    }
}

useWit = () => {
    let witComment = document.createElement('P');
    witComment.className = 'success';
    witComment.innerHTML = storyElem.elements.wit[dangerLevel];
    gameArea.appendChild(witComment);
    wit++;
}

death = (method) => {
    lives--;
    removeButtons();
    removeText();
    updateMeters();
    if (lives <= 0) {
        gameOver(method);
    }
    else {
    roomNum--;
    deathMethod(method);
    newRoom();
    } 
}

dodge = () => {
    if (diceRoll(21) + dodgeSkill > 10) youDodge();
    else death('dodge');
}

youDodge = () => {
    removeButtons()
    removeText()
    let dodge = document.createElement('P');
    dodge.className = 'success';
    dodge.innerHTML = storyElem.elements.dodge[dangerLevel];
    dodgeSkill++;
    gameArea.appendChild(dodge);
    newRoom()
}

beingAtRandom = () => {
    let being;
    if (Math.random() < 0.5) {
        let length = storyElem.elements.monster.length
        being = storyElem.elements.monster[diceRoll(length)]
    } else {
        let length = storyElem.elements.human.length
        being = storyElem.elements.human[diceRoll(length)]
    }
    return being;
}

positionAtRandom = () => {
    let length = storyElem.elements.roomPosition.length
    return storyElem.elements.roomPosition[diceRoll(length)]
}

enterAtRandom = () => {
    let length = storyElem.elements.roomEnter.length
    return storyElem.elements.roomEnter[diceRoll(length)]
}

roomStartAtRandom = () => {
    let length = storyElem.elements.roomStart.length
    return storyElem.elements.roomStart[diceRoll(length)]
}

roomSecondAtRandom = () => {
    let length = storyElem.elements.roomSecond.length
    return storyElem.elements.roomSecond[diceRoll(length)]
}

activityAtRandom = () => {
    let length = storyElem.elements.activity.length
    return storyElem.elements.activity[diceRoll(length)]
}

responseAtRandom = () => {
    // let length = storyElem[danger][dangerLevel];
    dangerLevel = diceRoll(6);
    updateMeters()
    let responseSelect = storyElem.danger[dangerLevel]
    return responseSelect[diceRoll(responseSelect.length)];
}

removeButtons = () => {
    let buttons = document.getElementsByTagName('BUTTON');
    for (i = 0; i < buttons.length; i) {
        buttons[i].parentNode.removeChild(buttons[i]);
    }
}

removeText = () => {
    let text = document.getElementsByTagName('P');
    for (i = 0; i < text.length; i){
        story.push(text[i].innerHTML);
        text[i].parentNode.removeChild(text[i]);
    }
    let callToAction = document.getElementsByTagName('H2');
    if (callToAction[0]) {
        for (i = 0; i < callToAction.length; i){
            callToAction[i].parentNode.removeChild(callToAction[i]);
        }
    }
    let youDied = document.getElementsByClassName('you-died');
    if (youDied[0]) {
        for (i = 0; i < youDied.length; i){
            youDied[i].parentNode.removeChild(youDied[i]);
        }
    }
}

lastRoom = () => {
    for (i = 0; i < story.length; i++) {
        let finalStory = document.createElement('P');
        finalStory.innerHTML = story[i];
        gameArea.appendChild(finalStory);
    }
}

youWin = () => {
    updateMeters();
    // Change title
    title.innerHTML = 'You Win!';
    printStory();
    goBackButton();
}

deathMethod = (chose) => {
    let deathMethod = document.createElement('P');
    deathMethod.className = 'death-method';
    if (chose == 'moved') {
        deathMethod.innerHTML = storyElem.danger['moved ' + dangerLevel];
    }
    if (chose == 'wit') {
        deathMethod.innerHTML = storyElem.danger['wit ' + dangerLevel];
    } 
    if (chose == 'death') {
        deathMethod.innerHTML = 'As existential dread takes hold you choose to do nothing. You crawl into the fetal position and lay there until old age takes you years later. Carpe Diem.'
    }
    if (chose == 'dodge') {
        deathMethod.innerHTML = storyElem.danger['dodge ' + dangerLevel];
    }
    gameArea.appendChild(deathMethod);
    story.push(deathMethod.innerHTML);
}

gameOver = (chose) => {
    removeText();
    removeButtons();
    // You Died
    let youDied = document.createElement('H1');
    youDied.className = 'you-died';
    youDied.innerHTML = 'You died all the way!'
    gameArea.appendChild(youDied);

    deathMethod(chose);
    printStory();
    goBackButton();
}

printStory = () => {
    // Submit Story button
    let finalButton = document.createElement('BUTTON');
    finalButton.innerHTML = 'Read Story';
    finalButton.addEventListener('click', lastRoom);
    gameArea.appendChild(finalButton);
}