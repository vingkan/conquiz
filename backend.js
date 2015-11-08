
// Reference to the root of the Firebase database
var database = new Firebase("https://conquiz.firebaseio.com/");
// Reference to the google sheets of questions
var questionsLink = 'https://spreadsheets.google.com/feeds/list/1C1POJrIlpm1R3muE0ImmI_ifxpH_aEfPP-QSyl3o2Kg/1/public/basic?alt=json';
var question;
var questionJSON;
var rows;

$("#upload").click(function() { // If the user clicks on the input with the id="upload"
	var name = $("#nameInput").val();
	var text = $("#messageInput").val();
	if (name.length != 0 && text.length != 0) { // Don't upload if there's no information in the textboxes
		console.log(name.length);
		console.log(text.length);

		database.push({name: name, text: text}); // Push the data onto the database

	}else { // warns user of their empty textbox
		console.log("Please input values into the textbox");
	}
});

function loadQuestions(){
    var newQuestion;
    database.on('child_added', function(update) {
        var questionJSON = update.val();
        console.log(questionJSON)
        newQuestion = new Question({
            id: generateNewID('question'),
            question: questionJSON['question'],
            answers: "["+questionJSON['correct']+", "+questionJSON['wa1']+", "+questionJSON['wa2']+", "+questionJSON['wa3']+"]"
        });
        game.push("questions", newQuestion);
    });
}

// Get an update once the database has new data
// database.on('child_added', function(update) {
// 	questions = update.val();
	
// 	console.log("Successfully retrieve questions from database.");
// });

// database.on("child_added", function(update) { // Get an update once the database has new data
// 			console.log("Callback function: New data has been added to the database");
// 			var message = update.val();
// 			displayUpdate(message.name, message.text);
// });

function displayUpdate(name, text) {
	$("<div/>").text(text).prepend($("<em/>").text(name+": ")).appendTo($("#messageDiv"));
	$("#messageDiv")[0].scrollTop = $("#messageDiv")[0].scrollHeight;
};


// One time push to update the questions on firebase
function getData() {
    $.ajax({
        url: questionsLink,
        success: function(data){
            uploadFirebase(data);
        }
    });
}
// upload data to firebase
function uploadFirebase(data){
    var cells = data.feed.entry;
    rows = [];
    
    for (var i = 0; i < cells.length; i++){
        var rowObj = {};
        rowObj.timestamp = cells[i].title.$t;
        var rowCols = cells[i].content.$t.split(',');
        for (var j = 0; j < rowCols.length; j++){
            var keyVal = rowCols[j].split(':');
            rowObj[keyVal[0].trim()] = keyVal[1].trim();
        }
        rows.push(rowObj);
    }
    for (var i = 0; i < rows.length; i++) {
    	database.push({question: rows[i]['timestamp'], correct: rows[i]['correct'], wa1: rows[i]['wa1'], wa2: rows[i]['wa2'], wa3: rows[i]['wa3']});
    }
}

console.log('LOADED BACKEND');