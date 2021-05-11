var dog,sadDog,happyDog, database;
var foodS,foodStock;
var fedTime,lastFed;
var feed,addFood;
var foodObj;

function preload(){
sadDog=loadImage("images/Dog.png");
happyDog=loadImage("images/happydog.png");
mImage = loadImage("images/women3.png");
fImage = loadImage("images/father3.png");
bImage = loadImage("images/boy.png");
babyImg = loadImage("images/baby.png");
back = loadImage("images/back.jpg");
milk = loadImage("images/milky.png")
}

function setup() {
  database=firebase.database();
  createCanvas(700,700);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(480,600,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  mom = createSprite(80,420,30,30);
  mom.addImage(mImage);
  mom.scale =0.7;

  baby = createSprite(100,600,30,30);
  baby.addImage(babyImg);
  baby.scale =0.5;

  boy = createSprite(300,600,30,30);
  boy.addImage(bImage);
  boy.scale =0.65;

   papa = createSprite(350,400,30,30);
  papa.addImage(fImage);
  papa.scale =0.8;

  milky = createSprite(450,650,30,30)
  milky.visible = false
  
  feed=createButton("Feed the dog");
  feed.position(550,100);
  feed.mousePressed(feedDog);
   stroke("black")
   strokeWeight(2)
  addFood=createButton("Add Food");
  addFood.position(700,100);
  addFood.mousePressed(addFoods);
  
  

}

function draw() {
  background(back);
  foodObj.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
 
  fill(255,255,254);
  textSize(20);
  if(lastFed>=12){
    textFont("oblique")
    fill("magenta");
    text("Last Feed : "+ lastFed%12 + "PM", 10,100);
   }else if(lastFed==0){
    textFont("oblique")
     fill("magenta")
     text("Last Feed : 12 AM",10,100);
   }else{
    textFont("oblique")
     fill("magenta");
     text("Last Feed : "+ lastFed + "AM", 10,100);
   }
   fill("lightgreen")
   textSize(30);
   text("Pet Care",300,30)
   stroke("white")
   line(280,35,440,35)
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);
  milky.addImage(milk)
  milky.scale = 0.12
  milky.visible = true


  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}