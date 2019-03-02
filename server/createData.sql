
drop table if exists `Houses`;
create table `houses`(`Id` int NOT NULL PRIMARY KEY  AUTO_INCREMENT,
  `link`varchar(255) NOT NULL UNIQUE,
  `market_date` date,
  `location_country` varchar(20) NOT NULL,
  `location_city` varchar(20) NOT NULL,
  `location_address` varchar (20),
  `location_coordinates_lat` float ,
  `location_coordinates_lng` float ,
  `size_living_area` decimal NOT NULL ,
  `size_rooms` int NOT NULL,
  `price_value` float NOT NULL,
  `price_currency` enum (EURO,USD,JPY,GBP) NOT NULL,
  `description` text NULL,
  `title` text NULL,
  `images` text NULL,
  `sold` enum (0,1)
);




  
