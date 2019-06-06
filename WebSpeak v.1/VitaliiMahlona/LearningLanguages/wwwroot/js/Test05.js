﻿var correctAnswer = Math.floor(Math.random() * 2) + 1;
var countOptions = 2;
var totalResult = 0;
var first = true;
var randomWords = [];

check();

function check(event) {
    randomWords = GetTest();

    if ((event != null) && (event.target.value == correctAnswer)) {
        $('#result').html(`<b>Score: ${++totalResult}</b>`);
    }

    correctAnswer = Math.floor(Math.random() * 2) + 1;

    var s = `<div class="name">
                <p>${randomWords[0].wordLearnLang}</p>
            `;

    for (let i = 0; i < Object.keys(randomWords).length; i++) {
        if (correctAnswer == i + 1) {
            s += `<img src="../../../../${randomWords[i].picture}" alt="${randomWords[i].wordNativeLang}">`;
            break;
        }
    }

    s += '<div>';

    $('#test').html(s);
}

function GetTest() {
    var randomWordsId = [];

    for (let i = 0; i < countOptions; ++i) {
        randomWordsId[i] = Math.floor(Math.random() * (model[model.length - 1].id - model[0].id + 1)) + model[0].id;

        for (let j = 0; j < i; j++) {
            while (randomWordsId[j] == randomWordsId[i]) {
                randomWordsId[i] = Math.floor(Math.random() * (model[model.length - 1].id - model[0].id + 1)) + model[0].id;
            }
        }

        for (let j = 0; j < model.length; j++) {
            if (model[j].id == randomWordsId[i]) {
                randomWords[i] = model[j];
            }
        }
    }

    return randomWords;
}