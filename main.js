// used https://www.w3schools.com/howto/howto_css_modals.asp for modal tutorial

var modal = document.getElementById('result_modal');
var num_qs = 0;
var results = [];
var results_imgs = [];

$('#done').on('click', function(e) {
    modal.style.display = "block";

    var choices = $("input[type='radio']:checked").map(function(i, radio) {
        return $(radio).val();
    }).toArray();

    if(1==2/*$(".options").length > 0*/) {
        $("#result").text("You need to finish every question!");
        $("#result_img").html("<img src='results/not_done.gif'>");
    } else {
        $("#result").text(results[calc_result(choices)]);
        $("#result_img").html("<img src='"+ results_imgs[calc_result(choices)]+ "'>");
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
//$("input[type=radio]").on('click', function(e)
$("body").on('click', function(e) {
    console.log("clicked");
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


$.getJSON("data.json", function(data) {
    $("#title").text(data.title);
    $("#topbar").css("background-image", "url('" + data.background_img+ "')");

    data.outcomes.forEach(element => {
        results.push(element.text);
        results_imgs.push(element.img);
    });

    var idx = 1;
    data.questions.forEach(element => {
        $("#quiz").append(
            "<div class='question'>" + 
                "<p>" + element.question_name + "</p>" +
                    `<div id='question${idx}' class='options'>` +
                    "</div>" +
            "</div>"
        );
        
        var ans_idx = 1;
        element.answers.forEach(e => {
            $(`#question${idx}`).append(
                `<input type='radio' name='q${idx}' value='${ans_idx}' id='q${idx}-${ans_idx}'/>`
            );

            if(e.text.length > 0) {
                $(`#question${idx}`).append(`<label for='q${idx}-${ans_idx}'>`+e.text+`</label>`);
            } else if (e.img.length > 0) {
                $(`#question${idx}`).append(`<label for='q${idx}-${ans_idx}'><img src='`+e.img+`'></label>`);
            }
            ans_idx++;
        })

        idx++;
    });

    num_qs = idx;
});