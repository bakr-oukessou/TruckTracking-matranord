create database TruckTracking;
use TruckTracking;
create table Truck(
	id int primary key auto_increment,
    matricule varchar(20),
    date date,
    Numero_dossier varchar(50),
    trajet varchar(250),
    chargement varchar(150),
    dechargement varchar(150),
    status varchar(150),
    longitude nvarchar(255),
    latitude nvarchar(255),
    positionnement nvarchar(255)
);
create table User(
    id int primary key auto_increment,
    username varchar(100),
    email email,
    password password,
    role varchar(100)
);

INSERT INTO Truck(
	matricule,
	date,
    Numero_dossier,
    trajet,
    chargement,
    dechargement,
    status
  )VALUES(
	'ABC123', 
	'2024-06-14',
    '001',
    'Route A to B',
	'Goods A',
	'Goods B',
	'En route'
    ),(
    "XYZ789",
    "2024-06-15",
    "002",
    "Route C to D",
	"Goods C",
    "Goods D",
    "Delivered"
),(
	"IJK789",
    "2024-06-15",
	"003",
    "Route A to D",
    "Goods B",
    "Goods E",
    "En douane"
  );
drop table truck;
    