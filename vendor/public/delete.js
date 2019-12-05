
function deleteRegion(id){
	$.ajax({
		url: '/addRegion/' + id,
		type: 'DELETE',
		success: function(result){
			 window.location.reload(true);
		}
	})
};
