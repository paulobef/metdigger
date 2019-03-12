// METDIGGER APP by Paul Beffa
// Search in the Metropolitan Museum art collection


// Get our root div to start manipulating the dom inside it
const app = document.getElementById('root');

// Create the logo
const logo = document.createElement('img');
logo.src = 'image/logo.jpg';

// Create a container
const container = document.createElement('div');
container.setAttribute('class', 'container');


// Add the logo and the main container to index.html
app.appendChild(logo);
app.appendChild(container);


function addCard(imgsrc, title, description, link) {
    
    
    // ES6 way of addign card


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
request.open('GET', 'https://collectionapi.metmuseum.org/public/collection/v1/search?q=sunflowers', true);

request.onload = function () {

   // Begin accessing JSON data here
   let data = JSON.parse(this.response);
   
    
   if (request.status >= 200 && request.status < 400) {

    data.objectIDs.forEach(element => {
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

        objectrequest.send();

    });


    } else {
    
        const errorMessage = document.createElement('p');
        errorMessage.textContent = `Couldn't fetch data`;
        app.appendChild(errorMessage);
    }
};

request.send();