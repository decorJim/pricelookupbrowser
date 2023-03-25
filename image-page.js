function showImages(div,images) {
    div.innerHTML="";
    for(let i=0;i<images.length;i++) {
        const imageTag = document.createElement("img");
        imageTag.src=images[i].src;
        div.appendChild(imageTag);
    }
}

var selectedImages=[]
function eventListeners() {
    const input=document.getElementById("myInputsingle");
    const selectedImagesDiv = document.getElementById("selectedImages");

    input.addEventListener('change',(event)=>{
        const file=event.target.files[0];

        if(file && file.type.startsWith('image/')) {
            const fileReader=new FileReader();
            fileReader.addEventListener('load',()=>{
                const image=new Image();
                image.src=fileReader.result;
                this.selectedImages.push(image)
                showImages(selectedImagesDiv,this.selectedImages);
                console.log(this.selectedImages);
            })
            fileReader.readAsDataURL(file);
        }
    });
}

var counter=0;

function handleImage() {
    const selectedImagesDiv = document.getElementById("selectedImages");
    const images = document.getElementById("myInputsingle").files;

    const formData=new FormData();

    const input = document.getElementById('myInputsingle');

    const file=input.files[0];

    counter++;

    const promise=new Promise((resolve,reject)=>{
        const fileReader=new FileReader();
        fileReader.onload=()=>{
            const result=fileReader.result;
            formData.append("index",this.counter);
            formData.append("image",result);
            resolve()
        }
        fileReader.readAsDataURL(file);
    });

    promise.then(()=>{
        console.log("hete")
        for(const [key,value] of formData.entries()) {
            console.log(key,value.substring(0,30));
        }
    })
    .catch(error=>{
        console.log(error)
    })

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