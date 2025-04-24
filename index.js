var array=[];
var searchText="";

const baseURL="https://www.dep16pricelookupserv.net/";

function getArray() {
    /*
    return fetch(baseURL.concat('data'))
    .then(response => response.json())
    .then(data => {
        console.log(data);
        data.forEach(element => {
            array.push(element);
        });
    })
    .catch(error => console.error(error));
    */
   
   return fetch('temp.json').then(response=>response.json()).then(data=>{
     data.forEach(element=>{
        array.push(element);
     })
   })
}

function getItems() {
    this.getArray().then(()=>{
        const suggestionContainer = document.getElementById("suggestions");
        for (let i = 0; i < array.length; i++) {
            const button = document.createElement("button");
            button.textContent = array[i].id;
            if (array[i].id.includes(button.textContent)) {
                button.classList.add('suggestion-button');
            }
            button.addEventListener('click',()=>{
                console.log(`${button.textContent} button clicked`)
                sessionStorage.setItem('product', JSON.stringify(array[i]));
                window.location.href = 'details.html';
            })
            suggestionContainer.appendChild(button);
        }
    })
}

function showSuggestions() {
    const suggestionContainer = document.getElementById("suggestions");
    searchText = document.getElementById("search-bar").value.toLowerCase();
    const buttons = suggestionContainer.getElementsByTagName("button");

    for (let i = 0; i < buttons.length; i++) {
          const button = buttons[i];
          const buttonText = button.textContent.toLowerCase();
          if (buttonText.includes(searchText)) {
            button.style.display = "block";
          } else {
            button.style.display = "none";
          }
    }
}

function secretPage() {
    console.log("here we go")
    window.location.href = 'image-page.html';
}

function resetContent() {
    searchText="";
    document.getElementById("search-bar").value="";
    const suggestionContainer = document.getElementById("suggestions");
    const buttons = suggestionContainer.getElementsByTagName("button");
    console.log(buttons.length);
    console.log(array.length);
    for(let i=0;i<buttons.length;i++) {
        buttons[i].style.display = "block";
    }
}

function addNumber(num) {
    searchText+=num+"";
    document.getElementById("search-bar").value=searchText;
    showSuggestions();
    console.log(searchText);
}


