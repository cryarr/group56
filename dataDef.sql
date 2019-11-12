DROP TABLE IF EXISTS peoples_events;
DROP TABLE IF EXISTS people;
DROP TABLE IF EXISTS event;
DROP TABLE IF EXISTS time_period;
DROP TABLE IF EXISTS cities;
DROP TABLE IF EXISTS region;



CREATE TABLE `region` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`region_name` varchar(255) NOT NULL,
	PRIMARY KEY(`id`)
);

CREATE TABLE `time_period` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`start_year` int(11),
	`end_year` int(11),
	PRIMARY KEY(`id`)
);

CREATE TABLE `cities` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`city_name` varchar(255) NOT NULL,
	`population` int(11),
	`rid` int(11),
	PRIMARY KEY(`id`),
	FOREIGN KEY(`rid`) REFERENCES `region`(`id`)
);


CREATE TABLE `event` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`event_name` varchar(255),
	`description` TEXT,
	`reid` int(11),
	`tpid` int(11),
	PRIMARY KEY(`id`),
	FOREIGN KEY(`tpid`) REFERENCES `time_period`(`id`),
	FOREIGN KEY(`reid`) REFERENCES `region`(`id`)
);


CREATE TABLE `people` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`first_name` varchar(255),
	`last_name` varchar(255),
	`regid` int(11),
	`citid` int(11),
	`description` TEXT,
	PRIMARY KEY(`id`),
	FOREIGN KEY(`regid`) REFERENCES `region`(`id`),
	FOREIGN KEY(`citid`) REFERENCES `cities`(`id`)

);

CREATE TABLE `peoples_events` (
	`pid` int(11), 
	`eid` int(11),
	PRIMARY KEY(`pid`, `eid`),
	FOREIGN KEY(`pid`) REFERENCES `people`(`id`),
	FOREIGN KEY(`eid`) REFERENCES `event`(`id`)
);
