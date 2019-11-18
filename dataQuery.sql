-- Selecting all from regions
select * from region;


-- all events a person has 
select people.first_name, event.event_name FROM people
JOIN peoples_events ON people.id = peoples_events.pid
JOIN peoples_events ON event.id = peoples_events.eid
where people.first_name = 'King'
