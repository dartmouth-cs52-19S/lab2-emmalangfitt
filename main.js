// used https://www.w3schools.com/howto/howto_css_modals.asp for modal tutorial

var modal = document.getElementById('result_modal');

$('#done').on('click', function(e) {
    modal.style.display = "block";

    // gather all checked radio-button values
    var choices = $("input[type='radio']:checked").map(function(i, radio) {
        return $(radio).val();
    }).toArray();

    // now you have an array of choices = ["valueofradiobox1", "valueofradiobox2", "valueofradiobox2"]
    // you'll need to do some calculations with this
    var shows = ["30 Rock", 
        "New Girl", 
        "Friends", 
        "Brooklyn Nine-Nine", 
        "How I Met Your Mother", 
        "The Office"
    ];

    $("#result").text(shows[calc_result(choices)]);
});

window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
}


function calc_result(choices) {
    var thirty_rock = 0;
    var new_girl = 1;
    var friends = 2; 
    var b99 = 3;
    var himym = 4;
    var the_office = 5; 
    var shows = [0, 0, 0, 0, 0, 0];

    var idx = 0;
    while (idx < choices.length) {
        if (choices[idx] == 1) {
            shows[thirty_rock] = shows[thirty_rock] + 1;
        } else if (choices[idx] == 2) {
            shows[new_girl] = shows[new_girl] + 1;
        } else if (choices[idx] == 3) {
            shows[friends] = shows[friends] + 1;
        } else if (choices[idx] == 4) {
            shows[b99] = shows[b99] + 1;
        } else if (choices[idx] == 5) {
            shows[himym] = shows[himym] + 1;
        } else {
            shows[the_office] = shows[the_office] + 1;
        }
        idx++;
    };

    var max = 0;
    var max_idx = 0;
    idx = 0;
    while (idx < 6) {
        if(shows[idx]>max){
            max_idx = idx;
            max = shows[idx];
            idx++;
        } else {
            idx++;
        }
    }

    return max_idx;
}
