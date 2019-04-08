// used https://www.w3schools.com/howto/howto_css_modals.asp for modal tutorial
var modal = document.getElementById('result_modal');
var num_qs = 0;
var results = [];
var results_imgs = [];

// calculate results when "done" is clicked
$('#done').on('click', function(e) {
    modal.style.display = "block";

    var choices = $("input[type='radio']:checked").map(function(i, radio) {
        return $(radio).val();
    }).toArray();

    // check if all questions have been completed
    if($(".options").length > 0) {
        $("#result").text("You need to finish every question!");
        $("#result_img").html("<img src='results/not_done.gif'>");
    } else {
        $("#result").text(results[calc_result(choices)]);
        $("#result_img").html("<img src='"+ results_imgs[calc_result(choices)]+ "'>");
    }
});

// fade modal out when background window is clicked
// found fadeOut through https://www.w3schools.com/jquery/eff_fadeout.asp
window.onclick = function(event) {
    if (event.target == modal) {
        $(".modal").fadeOut();
    }
}

// used tutorials to add and remove css to change styling of answered questions
// found removeClass through https://www.w3schools.com/howto/howto_js_remove_class.asp
// found addClass through https://www.w3schools.com/howto/howto_js_add_class.asp
// found .length through https://stackoverflow.com/questions/13060313/checking-if-at-least-one-radio-button-has-been-selected-javascript
$("body").on('click', function(event) {
    for(var i=1; i<=num_qs; i++) {
        if ($(`input[name=q${i}]:checked`).length > 0) {
            document.getElementById(`question${i}`).classList.remove("options");
            document.getElementById(`question${i}`).classList.add("answered");
            $(`input[name=q${i}]:not(:checked) ~ label`).css("opacity", .5);
            $(`input[name=q${i}]:checked + label`).css("opacity", 1);
        }
    }
});

// calculate results based on most frequent response number
// found "new Array" through https://stackoverflow.com/questions/1295584/most-efficient-way-to-create-a-zero-filled-javascript-array
function calc_result(choices) {
    var score = new Array(results.length).fill(0);;

    var idx = 0;
    while (idx < choices.length) {
        score[choices[idx]]++;
        idx++;
    };

    var max = 0;
    var max_idx = 0;
    idx = 0;
    while (idx < results.length) {
        if(score[idx]>max){
            max_idx = idx;
            max = score[idx];
            idx++;
        } else {
            idx++;
        }
    }

    return max_idx;
}

// load data from JSON and append html to display questions
$.getJSON("data_sitcoms.json", function(data) {
    $("#title").text(data.title);
    $("#topbar").css("background-image", "url('" + data.background_img+ "')");

    data.outcomes.forEach(element => {
        results.push(element.text);
        results_imgs.push(element.img);
    });

    var idx = 1; // tracks question number
    data.questions.forEach(element => {
        $("#quiz").append(
            `<div id='block${idx}' class='question'>` + 
                "<p>" + element.question_name + "</p>" +
                    `<div id='question${idx}' class='options'>` +
                    "</div>" +
            "</div>"
        );
        
        var ans_idx = 0; // tracks answer number for each question
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