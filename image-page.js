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

function gomainpage() {
    window.location.href = 'main.html';
}