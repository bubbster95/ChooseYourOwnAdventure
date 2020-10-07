const avater = {
    "face" : 
        {"eyes": 
            ["Features/eyes1.png", "Features/eyes2.png", "Features/eyes3.png", "Features/eyes4.png"],
        "nose":    
            ["Features/nose1.png", "Features/nose2.png", "Features/nose3.png", "Features/nose4.png"],
        "mouth":
            ["Features/mouth1.png", "Features/mouth2.png", "Features/mouth3.png", "Features/mouth4.png"]
        }
}

let id = 0
let body = document.getElementsByTagName('BODY')
let faceBox = document.createElement('DIV');
populate = () => { 
    let button = document.createElement('BUTTON');
    button.className = 'add-face';
    button.innerHTML = 'New Face'
    button.addEventListener('click', newFace);
    body[0].appendChild(button);

    faceBox.className = 'face-box';
    body[0].appendChild(faceBox);
    newFace();
}
let random = 0; 
let randomColor = 'lightBlue';   

newFace = ()=> {
    let face = document.createElement('DIV')
    face.className = 'face';
    face.id = id;
    face.style.backgroundColor = randomColor;
    faceBox.appendChild(face);

    let eyes = document.createElement('DIV')
    eyes.className = 'eyes';
    eyes.id = 'eyes' + id;
    eyes.style.backgroundImage = "url(" + avater.face.eyes[random] + ")";
    face.appendChild(eyes);

    let nose = document.createElement('DIV')
    nose.className = 'nose';
    nose.id = 'nose' + id;
    nose.style.backgroundImage = "url(" + avater.face.nose[random] + ")";
    face.appendChild(nose);

    let mouth = document.createElement('DIV')
    mouth.className = 'mouth';
    mouth.id = 'mouth' + id;
    mouth.style.backgroundImage = "url(" + avater.face.mouth[random] + ")";
    face.appendChild(mouth);

    id++;
    console.log('populate', face)
}
