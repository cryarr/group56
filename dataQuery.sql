--     /addPerson queries

-- selecting all attributes from people
select * from people;

-- selecting all cities
select * from cities

-- selecting all regions
select * from region



-- /addPerson/:id  DELETE query
DELETE FROM people WHERE id = ?


-- /person/:id UPDATE select query for displaying properly
-- selecting people with the certain id they want to update
SELECT * FROM people WHERE id = ?

-- selecting all the cities to have a dropdown of all cities
SELECT * FROM cities

-- selecting all regions to have a dropdown for selection
SELECT * FROM region 


-- /person UPDATE QUERY ON PERSON
UPDATE people SET first_name=?, last_name=?, regid=?, citid=?, description=?, WHERE id=?



--     /addRegion queries

-- selecting all regions to display
SELECT * FROM region

-- /addRegion/:id DELETE region where id = 
DELETE FROM region WHERE id = ?


-- /region/:id selects all regions for updating the specific id
SELECT * FROM region WHERE id = ?


-- /region UPDATES region where the id is the selection
UPDATE region SET region_name=? WHERE id=?



--     /associatePE queries 

-- selecting all events for displaying all queries for dropdown
SELECT * FROM event

-- selecting all people for displaying all for dropdown
SELECT * FROM people


-- getting last names and event names for each person and event to display the multiple to multiple relationship
SELECT people.id, people.last_name, event.id, event.event_name FROM (people, event) INNER JOIN peoples_events ON people.id = peoples_events.pid AND event.id = peoples_events.eid





--       /addEvent queries

-- getting all events for displaying 
SELECT * FROM event

-- getting all regions for drop donw
SELECT * FROM region

-- getting all time periods for drop down
SELECT * FROM time_period


-- /addEvent/:id DELETE query 
DELETE FROM event WHERE id = ?



-- /event/:id displaying for updating 

-- selecting all events with certain id for the update
SELECT * FROM event WHERE id = ?


-- getting all regions for drop down 
SELECT * FROM region

-- getting all time periods for drop down
SELECT * FROM time_period


-- /event UPDATE QUERY 
UPDATE event SET event_name=?, description=?, reid=?, tpid=?. WHERE id=?

--        /addCity queries

-- getting all cities for displaying read
SELECT * FROM cities

-- getting all regions to display for dropdown
select * from region


-- /addCity/:id DELETE QUERY
DELETE FROM cities WHERE id=?


-- /city/:id displaying for updates

-- selecting all cities with the id that is to be updated
SELECT * FROM cities WHERE id=?

-- selecting all regions for dropdown

SELECT * FROM region


-- /city UPDATE QUERY
UPDATE cities SET city_name=?, population=?, rid=?, WHERE id=?




-- 			/addTime queries

-- selecting all time periods
SELECT * FROM time_period

-- selecting all regions for dropdown
SELECT * FROM region

-- /addTime/:id DELETE QUERY
DELETE FROM time_period WHERE id = ?


-- /time/:id selecting all to display for update query

-- selecting all from time period with the id to be updated
SELECT * FROM time_period WHERE id=?


-- /time UPDATE QUERY
UPDATE time_period SET start_year=?, end_year=? WHERE id=?


--    /addRegion INSERT 
INSERT INTO region (region_name) VALUES (?)



--    /addPerson INSERT
INSERT INTO people (first_name,last_name,regid,citid,description) values (?,?,?,?,?)


--    /addEvent INSERT
INSERT INTO event (event_name,description,reid,tpid) VALUES (?,?,?,?)


--    /addCity INSERT
INSERT INTO cities (city_name,population,rid) VALUES (?,?,?)



--   /addTime INSERT
INSERT INTO time_period (start_year, end_year) VALUES (?,?)

--   /associatePE INSERT
INSERT INTO peoples_events (pid, eid) VALUES (?,?)
