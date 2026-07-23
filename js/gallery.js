// =================================
// SHOTSBYSKAZA PHOTO GALLERY LOADER
// =================================


const username = "mskaza00";
const repository = "shotsbyskaza-website";



const galleries = [

{
folder:"photos/sports",
element:"sports-gallery"
},

{
folder:"photos/portraits",
element:"portraits-gallery"
},

{
folder:"photos/graphics",
element:"graphics-gallery"
}

];





galleries.forEach(loadGallery);





function loadGallery(galleryData){


const gallery = document.getElementById(galleryData.element);



fetch(`https://api.github.com/repos/${username}/${repository}/contents/${galleryData.folder}`)


.then(response=>{


if(!response.ok){

throw new Error("Gallery folder could not load");

}

return response.json();


})


.then(files=>{


files
.filter(file=>

file.name.toLowerCase().endsWith(".jpg") ||
file.name.toLowerCase().endsWith(".jpeg") ||
file.name.toLowerCase().endsWith(".png") ||
file.name.toLowerCase().endsWith(".webp")

)

.forEach(file=>{


const photo=document.createElement("div");


photo.className="photo";


photo.innerHTML=`

<img 
src="${file.download_url}"
alt="${file.name}"
loading="lazy">

`;



gallery.appendChild(photo);


});



})



.catch(error=>{


console.error(

"Gallery loading error:",
error

);


gallery.innerHTML=`

<p>
Unable to load photos.
</p>

`;


});


}
