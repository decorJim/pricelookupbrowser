const baseURL="http://localhost:8080/";

function showImages(div, images) {
    var input = document.getElementById("myInputsingle");
    div.innerHTML = "";
    for (let i = 0; i < images.length; i++) {
      // creates image element
      var imageTag = document.createElement("img");
      imageTag.src = images[i].src;
    
      // creates delete button
      var deleteButton = document.createElement("button");
      deleteButton.innerHTML = "X";
      deleteButton.style.fontSize = "25px";
      deleteButton.addEventListener("click", () => {
        const index = Array.from(div.children).indexOf(event.currentTarget.parentNode);
        if (index !== -1) {
          selectedImages.splice(index, 1);
          input.value = "";
          showImages(div, selectedImages);
        }
      });
      deleteButton.dataset.index = i;
    
      var containerDiv = document.createElement("div");
      containerDiv.appendChild(imageTag);
      containerDiv.appendChild(deleteButton);
    
      div.appendChild(containerDiv);
    }
  }
  
  var selectedImages = [];

  function eventListeners() {
    var input = document.getElementById("myInputsingle");
    var selectedImagesDiv = document.getElementById("selectedImages");
    
    input.addEventListener("change", (event) => {
      console.log(event.type)
      const file = event.target.files[0];
    
      if (file && file.type.startsWith("image/")) {
        const fileReader = new FileReader();
        fileReader.addEventListener("load", () => {
          const image = new Image();
          image.src = fileReader.result;
          selectedImages.push(image);
          input.value="";
          showImages(selectedImagesDiv, selectedImages);
          console.log(selectedImages);
        });
        fileReader.readAsDataURL(file);
      }
    });
}
  


async function handleImage() {

    for(let i=0;i<selectedImages.length;i++) {
       const startTime=Date.now()
       const formData=new FormData();
       formData.append("image",selectedImages[i].src);
       formData.append("index",i);

       fetch(baseURL.concat("image"),{
          method:"POST",
          body:formData
       })
       .then(response=>response.text())
       .then(data=> {
          console.log(data);
          delay=Date.now()-startTime;
          console.log(delay);
       })
       .catch(error=>console.error(error));
       await new Promise(resolve => setTimeout(resolve, 80));
    }
}



function handleImages() {
    const selectedImagesDiv = document.getElementById("selectedImages");
    const images = document.getElementById("myInput").files;
    
    showImages(selectedImagesDiv,images);

    // Create a new FormData object
    const formData = new FormData();

    // Add the file(s) to the FormData object
    const input = document.getElementById('myInput');
    const promises=[];

    for (let i = 0; i < input.files.length; i++) {
       const file=input.files[i];
       
       const promise=new Promise((resolve,reject)=>{
          const reader=new FileReader();
          reader.onload=()=>{
             // after image file finishes loading extract result from reader
             const result=reader.result;
             // put the result in field images
             formData.append("images",result);
             // mark promise as resolved
             resolve()
          }
          reader.error=reject
          // convert to base64 
          reader.readAsDataURL(file)
       });
       promises.push(promise);
    }

    Promise.all(promises).then(()=>{
        for(const [key,value] of formData.entries()){
            console.log(key,value);
        }

        fetch('http://localhost:8080/image',{
            method:'POST',
            body:formData
        })
        .then(response=>{
            if(!response) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data=>{
            console.log(data)
        })
        .catch(error=>{
            console.error('There was a problem with the fetch operation:', error);
        })
    })
}

function gomainpage() {
    window.location.href = 'main.html';
}