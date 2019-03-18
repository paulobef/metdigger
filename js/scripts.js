// METDIGGER APP by Paul Beffa
// Search in the Metropolitan Museum art collection

const searchbar = document.getElementById('searchbar');
const searchbutton = document.getElementById('searchbutton');
const morebutton = document.getElementById('morebutton');
const app = document.getElementById('root');


// Create a container
const container = document.createElement('div');
container.setAttribute('class', 'container');
app.appendChild(container);

function main(start, stop) {

    const input = searchbar.value;

    function addCard(imgsrc, title, description, link) {
        
        // ES6 way of adding card

        let template = `<hr class="featurette-divider">

        <div class="row featurette">
        <div class="col-md-7">
        <h2 class="featurette-heading">${title}</h2>
        <p class="lead">${description}</p>
        <a class="metlink" href=${link}>Read on The Met</a>
        </div>
        <div class="col-md-5">
        <img class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto img-limit" src=${imgsrc} preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Photo"></img>
        </div>
    </div>`

    container.innerHTML += template;


        
        /* ES5 way of adding Card below

        // create card elements
        cardContainer = document.createElement('container')
        img = document.createElement('img');
        h1 = document.createElement('h1');
        p = document.createElement('p');
        button = document.createElement('a');

        // style card elements



        // insert function parameter in element
        img.setAttribute('src', imgsrc);
        h1.innerText = title;
        p.innerText = description;
        button.setAttribute('href', link);

        //add elements to the DOM

        container.appendChild(cardContainer);
        cardContainer.appendChild(img);
        cardContainer.appendChild(h1);
        cardContainer.appendChild(p);
        cardContainer.appendChild(button); */

    };
    



    // Create a request variable and assign a new XMLHttpRequest object to it.
    const request = new XMLHttpRequest();

    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', 'https://collectionapi.metmuseum.org/public/collection/v1/search?q=' + input, true);

    request.onload = function () {

    // Begin accessing JSON data here
    let data = JSON.parse(this.response);
    
        
    if (request.status >= 200 && request.status < 400) {
        
        
        for (let i = start; i <= stop; i++){
            let index = data.objectIDs[i];

            // OBJECT REQUEST : getting the artwork for a specific ID

            const objectrequest = new XMLHttpRequest();

                // Open a new connection, using the GET request on the URL endpoint
                objectrequest.open('GET', 'https://collectionapi.metmuseum.org/public/collection/v1/objects/' + index.toString(), true);

                objectrequest.onload = function () {

                // Begin accessing JSON data here
                let object = JSON.parse(this.response);
                    
                if (objectrequest.status >= 200 && objectrequest.status < 400) {
                  
                    addCard(object.primaryImageSmall, object.title, object.artistDisplayName, object.objectURL);
        

                    } else {
                    
                        const errorMessage = document.createElement('p');
                        errorMessage.textContent = `Couldn't fetch data`;
                        app.appendChild(errorMessage);
                    }
                
                };

            objectrequest.send();
        
        /* data.objectIDs.forEach(element => {
        let index = element.toString();
            
    
            // OBJECT REQUEST : getting the artwork for a specific ID

            const objectrequest = new XMLHttpRequest();

                // Open a new connection, using the GET request on the URL endpoint
                objectrequest.open('GET', 'https://collectionapi.metmuseum.org/public/collection/v1/objects/' + index, true);

                objectrequest.onload = function () {

                // Begin accessing JSON data here
                let object = JSON.parse(this.response);
                    
                if (objectrequest.status >= 200 && objectrequest.status < 400) {
                  
                    addCard(object.primaryImageSmall, object.title, object.artistDisplayName, object.objectURL);
        

                    } else {
                    
                        const errorMessage = document.createElement('p');
                        errorMessage.textContent = `Couldn't fetch data`;
                        app.appendChild(errorMessage);
                    }
                
                };

            objectrequest.send(); */

            };


        } else {
        
            const errorMessage = document.createElement('p');
            errorMessage.textContent = `Couldn't fetch data`;
            app.appendChild(errorMessage);
        }
    };

    request.send();

} // END MAIN

// Loads 10 artworks

searchbar.addEventListener('keypress', function(e){

    if (e.keyCode == 13) {
        container.innerHTML = '';
        main(0, 10);
    
    }

});


searchbutton.addEventListener('click', function() {
    container.innerHTML = '';
    main(0, 10);

});


// Load 10 more artworks from the same query

let x = 0;

morebutton.addEventListener('click', function(){
    x += 10;
    main(x, x+10);
})

