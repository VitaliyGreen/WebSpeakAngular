﻿var countOptions = 4;
var correctAnswer = Math.floor(Math.random() * 4) + 1;

check();

function check()
{
    if (($("[type=radio]:checked").val() == correctAnswer))
    {
        $('#result').html(`<b>Score: ${++totalResult}</b>`);
    }
    else if (($("[type=radio]:checked").val() == undefined))
    {
        if (!first)
        {
            $('#error').show();
            $('#error').text("Please select an item!");

            return;
        }

        first = false;
    }

    $('#error').hide();

    if (questionNumber == totalQuestions)
    {
        SendAjaxRequest();

        return;
    }

    questionNumber++;

    randomWords = GetTestRandom();

    randomTestWordsId.sort(compareRandom);

    correctAnswer = Math.floor(Math.random() * 4) + 1;

    var s = '<div class="words">';

    for (let i = 0; i < Object.keys(randomWords).length; i++)
    {
        if (randomTestWordsId[i] - 1 == 0)
        {
            correctAnswer = i + 1;
        }

        if (testNumber == 3)
        {
            s += `<input type="radio" name="test" value="${i + 1}" id="${i + 1}"/>
                  <label class="word btn btn-light" for="${i + 1}">${randomWords[randomTestWordsId[i] - 1].wordLearnLang}</label>
                 `;
        }

        if (testNumber == 8 || testNumber == 9)
        {
            s += `<input type="radio" name="test" value="${i + 1}" id="${i + 1}"/>
                  <label class="word btn btn-light" for="${i + 1}">${randomWords[randomTestWordsId[i] - 1].wordNativeLang}</label>
                 `;
        }
    }

    s += `</div>
             <div class="QA">
         `;

    for (let i = 0; i < Object.keys(randomWords).length; i++)
    {
        if (correctAnswer == i + 1)
        {
            if (testNumber == 3)
            {
                s += `<img src="../../../../${randomWords[0].picture}" width="256" height="256" alt="${randomWords[0].wordLearnLang}">`;
            }

            if (testNumber == 8)
            {
                s += `<h1>${randomWords[0].wordLearnLang}</h1>`;
            }

            if (testNumber == 9)
            {
                s += `<audio controls>
                         <source src="../../../../${randomWords[0].pronounceLearn}" type="audio/mpeg" />
                         Your browser does not support the audio element.
                      </audio >
                     `;
            }

            break;
        }
    }

    s += '</div>';

    $('#test').html(s);
}

