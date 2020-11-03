DROP TABLE IF EXISTS Items;
DROP TABLE IF EXISTS Blocks;
DROP TABLE IF EXISTS Mobs; 
DROP TABLE IF EXISTS User; 

CREATE TABLE mc_edu.User(
Name varchar(20),
Password varchar(20) NOT NULL,
email varchar(30)NOT NULL,

primary key(Name)
);


CREATE TABLE mc_edu.Items(
Uname varchar(20),
ItemID int NOT NULL,
LessonID int NOT NULL,
ItemName varchar(30),
NumOfItem int,

primary key (Uname,ItemID,LessonID),
FOREIGN key(Uname) REFERENCES User (Name)
);


CREATE TABLE mc_edu.Blocks(
Uname varchar(20),
BlockID int NOT NULL,
LessonID int NOT NULL,
BlockName varchar(30),
NumOfBlock int,

primary key (Uname,BlockID,LessonID),
FOREIGN key(Uname) REFERENCES User (Name)
);


CREATE TABLE mc_edu.Mobs(
Uname varchar(20),
MobID int NOT NULL,
LessonID int NOT NULL,
MobName varchar(30),
NumOfMob int,

primary key (Uname,MobID,LessonID),
FOREIGN key(Uname) REFERENCES User (Name)
);


INSERT INTO user VALUES("player1","password1","aaa@ubc.ca");
INSERT INTO user VALUES("player2","password2","bbb@ubc.ca");
INSERT INTO user VALUES("player3","password3","ccc@ubc.ca");


INSERT INTO items VALUES("player1",166,1,"glow_stick",25);
INSERT INTO items VALUES("player1",166,2,"glow_stick",85);
INSERT INTO items VALUES("player2",166,1,"glow_stick",42);
INSERT INTO items VALUES("player3",257,1,"iron_pickaxe",31);


INSERT INTO blocks VALUES("player1",1,1,"stone",25);
INSERT INTO blocks VALUES("player1",1,2,"stone",85);
INSERT INTO blocks VALUES("player2",1,1,"stone",42);
INSERT INTO blocks VALUES("player3",11,1,"lava",31);


INSERT INTO mobs VALUES("player1",44,1,"zombie_villager",25);
INSERT INTO mobs VALUES("player1",44,2,"zombie_villager",85);
INSERT INTO mobs VALUES("player2",18,1,"rabbit",42);
INSERT INTO mobs VALUES("player3",19,1,"bat",31);



