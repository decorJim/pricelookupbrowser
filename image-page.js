

function handleImages() {
    const selectedImagesDiv = document.getElementById("selectedImages");
    const images = document.getElementById("myInput").files;
    for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const imageURL = URL.createObjectURL(image);
        const imageTag = document.createElement("img");
        imageTag.src = imageURL;
        selectedImagesDiv.appendChild(imageTag);
    }

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
        console.log(formData);

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