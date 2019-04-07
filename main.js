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
    var shows = ["You should watch 30 Rock!", 
        "You should watch New Girl!", 
        "You should watch Friends!", 
        "You should watch Brooklyn Nine-Nine!", 
        "You should watch How I Met Your Mother!", 
        "You should watch The Office!",
        "You need to finish every question!"
    ];

    var show_gifs= ["<img src='results/thirty_rock.gif'>", 
        "<img src='results/new_girl.gif'>", 
        "<img src='results/friends.gif'>", 
        "<img src='results/b99.gif'>", 
        "<img src='results/himym.gif'>", 
        "<img src='results/the_office.gif'>",
        "<img src='results/not_done.gif'>"
    ];

    if($(".options").length > 0) {
        $("#result").text(shows[6]);
        $("#result_img").html(show_gifs[6]);
    } else {
        $("#result").text(shows[calc_result(choices)]);
        $("#result_img").html(show_gifs[calc_result(choices)]);
    }
});

// https://www.w3schools.com/jquery/eff_fadeout.asp
window.onclick = function(event) {
    if (event.target == modal) {
        $(".modal").fadeOut();
    }
}

// https://www.w3schools.com/howto/howto_js_remove_class.asp
// https://www.w3schools.com/howto/howto_js_add_class.asp
// https://stackoverflow.com/questions/13060313/checking-if-at-least-one-radio-button-has-been-selected-javascript
$("input[type=radio]").on('click', function(e) {
    if ($("input[name=q1]:checked").length > 0) {
        document.getElementById("question1").classList.remove("options");
        document.getElementById("question1").classList.add("answered");
        $("input[name=q1]:not(:checked) ~ label img").css("opacity", .5);
        $("input[name=q1]:checked + label img").css("opacity", 1);
    }

    if ($("input[name=q2]:checked").length > 0) {
        document.getElementById("question2").classList.remove("options");
        document.getElementById("question2").classList.add("answered");
        $("input[name=q2]:not(:checked) ~ label").css("opacity", .5);
        $("input[name=q2]:checked + label").css("opacity", 1);
    }

    if ($("input[name=q3]:checked").length > 0) {
        document.getElementById("question3").classList.remove("options");
        document.getElementById("question3").classList.add("answered");
        $("input[name=q3]:not(:checked) ~ label img").css("opacity", .5);
        $("input[name=q3]:checked + label img").css("opacity", 1);
    }

    if ($("input[name=q4]:checked").length > 0) {
        document.getElementById("question4").classList.remove("options");
        document.getElementById("question4").classList.add("answered");
        $("input[name=q4]:not(:checked) ~ label").css("opacity", .5);
        $("input[name=q4]:checked + label").css("opacity", 1);
    }

    if ($("input[name=q5]:checked").length > 0) {
        document.getElementById("question5").classList.remove("options");
        document.getElementById("question5").classList.add("answered");
        $("input[name=q5]:not(:checked) ~ label img").css("opacity", .5);
        $("input[name=q5]:checked + label img").css("opacity", 1);
    }

    if ($("input[name=q6]:checked").length > 0) {
        document.getElementById("question6").classList.remove("options");
        document.getElementById("question6").classList.add("answered");
        $("input[name=q6]:not(:checked) ~ label").css("opacity", .5);
        $("input[name=q6]:checked + label").css("opacity", 1);
    }

    if ($("input[name=q7]:checked").length > 0) {
        document.getElementById("question7").classList.remove("options");
        document.getElementById("question7").classList.add("answered");
        $("input[name=q7]:not(:checked) ~ label img").css("opacity", .5);
        $("input[name=q7]:checked + label img").css("opacity", 1);
    }

    if ($("input[name=q8]:checked").length > 0) {
        document.getElementById("question8").classList.remove("options");
        document.getElementById("question8").classList.add("answered");
        $("input[name=q8]:not(:checked) ~ label img").css("opacity", .5);
        $("input[name=q8]:checked + label img").css("opacity", 1);
    }
});


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
