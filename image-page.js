

var baseURL="https://dep16pricelookupserv.net/";

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
  
  
async function handleImage() {

    for(let i=0;i<selectedImages.length;i++) {
       const startTime=Date.now()
       const formData=new FormData();
       formData.append("image",selectedImages[i].src);
       formData.append("index",i);
       formData.append("limit",selectedImages.length);

       fetch(baseURL.concat("image"),{
          method:"POST",
          body:formData,
          mode: 'no-cors'
       })
       .then(response=>response.json())
       .then(data=> {
          console.log(data)
          console.log("type",typeof(data.msg));
          let num=Number(data.msg);
          console.log(num);
          if(num===selectedImages.length-1) {
            alert("all images processed !");
          }
          delay=Date.now()-startTime;
          console.log(delay);
       })
       .catch(error=>console.error(error));
       await new Promise(resolve => setTimeout(resolve, 80));
    }
}


function getImages() {
  let imagesResults=[]
  fetch(baseURL.concat("results"), { mode: 'no-cors' })
  .then(response => response.json())
  .then(images => {
    images.forEach(imageData => {
      const img = new Image();
      img.src = `data:image/jpeg;base64,${imageData}`;
      imagesResults.push(img);
    })
    console.log(imagesResults);
    var selectedImagesDiv = document.getElementById("selectedImages");
    showImages(selectedImagesDiv,imagesResults);
    createDownloadButton(imagesResults);
  })
  .catch(error => {
    console.error('Error fetching images:', error);
  });
}

function createDownloadButton(imagesResults) {
  const container = document.getElementById("container");
  const button = document.createElement('button');
  button.innerHTML = "Download";
  button.style.display = "block"
  button.style.width = "200px";
  button.style.height = "50px";
  button.style.fontSize = "30px";

  button.onclick = function () {
    const zip = new JSZip();
    for (let i = 0; i < imagesResults.length; i++) {
      const img = imagesResults[i];
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL('image/png');
      const base64Data = dataURL.split(',')[1];
      zip.file(`image_${i+1}.png`, base64Data, {base64: true});
    }
    zip.generateAsync({type:"blob"})
      .then(function(content) {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(content);
        link.download = "images.zip";
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  }
  container.appendChild(button);
}

async function deleteImages() {
  try {
    const response = await fetch(baseURL.concat("delete"), {
      method: "POST",
      mode: 'no-cors'
    });
    const data = await response.json();
    console.log(data.msg);
    var input = document.getElementById("myInputsingle");
    var selectedImagesDiv = document.getElementById("selectedImages");
    input.value="";
    selectedImagesDiv.innerHTML="";
    selectedImages=[];
  } catch (error) {
    console.error(error);
  }
}

function gomainpage() {
  window.location.href = 'index.html';
}

