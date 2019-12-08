
function deleteRegion(id){
	$.ajax({
		url: '/addRegion/' + id,
		type: 'DELETE',
		success: function(result){
			 window.location.reload(true);
		}
	})
};

function deletePerson(id){
	$.ajax({
		url: '/addPerson/' + id,
		type: 'DELETE',
		success: function(result){
			 window.location.reload(true);
		}
	})
};


function deleteEvent(id){
	$.ajax({
		url: '/addEvent/' + id,
		type: 'DELETE',
		success: function(result){
			 window.location.reload(true);
		}
	})
};

function deleteCity(id){
	$.ajax({
		url: '/addCity/' + id,
		type: 'DELETE',
		success: function(result){
			 window.location.reload(true);
		}
	})
};

function deleteTime(id){
	$.ajax({
		url: '/addTime/' + id,
		type: 'DELETE',
		success: function(result){
			 window.location.reload(true);
		}
	})
};
/*
function deletePeopleEvent(last_name, event_name){
	console.log("Inside delete");
	$.ajax({
		url: '/associatePE/' + last_name + event_name,
		type: 'DELETE',
		success: function(result){
			 window.location.reload(true);
		}
	})
};*/
