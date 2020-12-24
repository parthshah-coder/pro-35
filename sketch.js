//Create variables here
var dogImg,dogImg1,dog;
var foodStock,food,database;


function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  dogImg1 = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  console.log(database);
  dog = createSprite(200,200,20,20);
  dog.addImage(dogImg);
  dog.scale = 0.3;
  foodStock=database.ref('Food'); 
  foodStock.on("value",readStock); 
}


function draw() {  
  background(46,139,87);
  
  if(keyWentDown(UP_ARROW)){
    writeStock(food);
    dog.addImage(dogImg1);
  }

  drawSprites();

textSize(13);
fill("black");
stroke("red");
text("Note:Please Press the Up Arrow for feeding the dog ", 130,10,300,20);
text("Food remaining to feed dog : "+food,170,400); 

}



//function to read the values from database
function readStock(data){
food = data.val();
}
function writeStock(x){
  if (x <= 0){
    x = 0;
   } else{
    x=x-1;
  }
 
 database.ref('/').update({
  Food:x
})
}



