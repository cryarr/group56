DROP TABLE IF EXISTS peoples_events;
DROP TABLE IF EXISTS people;
DROP TABLE IF EXISTS event;
DROP TABLE IF EXISTS time_period;
DROP TABLE IF EXISTS cities;
DROP TABLE IF EXISTS region;



CREATE TABLE `region` (
	`id` int(11) AUTO_INCREMENT,
	`region_name` varchar(255) NOT NULL,
	PRIMARY KEY(`id`)
) ENGINE=INNODB;

INSERT INTO region
VALUES (1,'Mesopotamia'), (2,'Asia'), (3, 'Holy Roman Empire');

CREATE TABLE `time_period` (
	`id` int(11) AUTO_INCREMENT,
	`start_year` int(11),
	`end_year` int(11),
	PRIMARY KEY(`id`)
) ENGINE=INNODB;


INSERT INTO time_period
VALUES (1, 1400, 1600), (2, 1400, 1600), (3, 1400, 1600);

CREATE TABLE `cities` (
	`id` int(11) AUTO_INCREMENT,
	`city_name` varchar(255) NOT NULL,
	`population` int(11),
	`rid` int(11),
	PRIMARY KEY(`id`),
	FOREIGN KEY(`rid`) REFERENCES `region`(`id`)
	ON DELETE CASCADE
) ENGINE=INNODB;


INSERT INTO cities
VALUES (1, 'Babylon', 2000000, 1), (2, 'Beijing', 500000, 2), (3, 'Vienna', 1000000, 3);

CREATE TABLE `event` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`event_name` varchar(255),
	`description` TEXT,
	`reid` int(11),
	`tpid` int(11),
	PRIMARY KEY(`id`),
	FOREIGN KEY(`tpid`) REFERENCES `time_period`(`id`) ON DELETE CASCADE,
	FOREIGN KEY(`reid`) REFERENCES `region`(`id`)
	ON DELETE CASCADE
) ENGINE=INNODB;

INSERT INTO event
VALUES (1, 'War1', 'Famous war', 1, 1), (2, 'War2', 'Famous War 2', 2,2), (3, 'Volcano', 'Volcano erupts', 3,3);

CREATE TABLE `people` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`first_name` varchar(255),
	`last_name` varchar(255),
	`regid` int(11),
	`citid` int(11),
	`description` TEXT,
	PRIMARY KEY(`id`),
	FOREIGN KEY(`regid`) REFERENCES `region`(`id`) ON DELETE CASCADE,
	FOREIGN KEY(`citid`) REFERENCES `cities`(`id`)
	ON DELETE CASCADE

) ENGINE=INNODB;

INSERT INTO people
VALUES (1, 'King', 'Gilgamesh', 1, 1, 'Ruler of Mesopotamia'),
(2, 'Kublai', 'Khan', 2, 2, 'Asian Ruler'),
(3, 'Charles The Great', 'Charlemagne', 3, 3, 'Founder of the Holy Roman Empire');

CREATE TABLE `peoples_events` (
	`pid` int(11), 
	`eid` int(11),
	PRIMARY KEY(`pid`, `eid`),
	FOREIGN KEY(`pid`) REFERENCES `people`(`id`) ON DELETE CASCADE,
	FOREIGN KEY(`eid`) REFERENCES `event`(`id`) ON DELETE CASCADE

) ENGINE=INNODB;

INSERT INTO peoples_events
VALUES (1, 1), (2,2), (3,3)
