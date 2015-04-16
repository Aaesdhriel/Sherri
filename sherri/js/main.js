var offset = 40;
$('#sidebar li a').click(function(event) {
    event.preventDefault();
    $($(this).attr('href'))[0].scrollIntoView();
    scrollBy(0, -offset);
});

$( "#tabs" ).tabs();

//My profile
$.get('https://www.googleapis.com/plus/v1/people/118256722203588605911/?key=AIzaSyAMjbP5-l7RZLhvNZ7VaD1sV4hxTgHk1BI', function(data) {
  $("#aboutMe .profile-photo").html('<img src="'+data.image.url.substring(0, data.image.url.indexOf("photo.jpg"))+'" class="img-polaroid"/>');
  $("#aboutMe .tagline").html('"'+data.tagline+'"');
  $("#aboutMe .home").html('Present Home: '+data.placesLived[0].value);
  $("#aboutMe .organization").html('Organization: '+data.organizations[0].name+' -  '+data.organizations[0].title);
  $("#aboutMe .about").html(data.aboutMe);
  console.log(data); 
});

//my Activities
$.get('https://www.googleapis.com/plus/v1/people/118256722203588605911/activities/public?key=AIzaSyAMjbP5-l7RZLhvNZ7VaD1sV4hxTgHk1BI', function(data) {
  
  $.each(data.items, function(order, item) { 
	if(order >= 10) return;
	
	var content = '<div class="row rounded-border">';
	content += '<div class="span3">';
	content += '<a href="'+item.url+'" target="_blank">';
	
	if(item.object.attachments != undefined && item.object.attachments[0].image != undefined)
		content += '<img src="'+item.object.attachments[0].image.url+'" style="max-height:200px;"  class="img-rounded" alt="" />';
	else if(item.object.attachments != undefined && item.object.attachments[0].thumbnails != undefined && item.object.attachments[0].thumbnails[0].image != undefined)
		content += '<img src="'+item.object.attachments[0].thumbnails[0].image.url+'" style="max-height:200px;"  class="img-rounded" alt="" />';
	else
		content += '<img src="http://placehold.it/497x373" style="max-height:250px; max-width:100%;"  alt="" />';
	content += '</a>';
	content += '</div>';
	
	content += '<div class="span6">';
	content += '<h4>';
	content += '<a href="'+item.url+'" target="_blank">';
	if(item.annotation != undefined)
		content += item.annotation;
	else
		content += item.title;
	content += '</a>';
	if(item.provider != undefined)
		content += ' ['+item.provider.title+']';
	content += '</h4>';
		
	if(item.object.content != undefined){
		var str = item.object.content;
		if (str.length > 250)
		{   
			str = str.substring( 0, 250+1 );
			str = str.substring( 0, str.lastIndexOf(" ")) + "...";
		}
		content += '<p>'+str+'</p>';
	}


	//Date
	var date = new Date(item.published);
	content += '<p class="timestamp">Published on '+date.toLocaleDateString()+'</p>';	

	content += '</div>';

	content += '</div>';
	content += '</div>';
	$("#activities").append(content);
	
	
  });
  
  console.log(data);
});


//Comments:
//https://www.googleapis.com/plus/v1/activities/activityId/comments