﻿import { Constants } from './Constants';
import { TestInfo } from './TestInfo';
import { TestResult } from './TestResult';

export class FillMethod {
    public static loadPictures(info: TestInfo): void {
        const setting: Object = info.setting;
        const picturesCount: number = +setting['images'];

        if (picturesCount < 1 || picturesCount > 4) { return; }

        let testImages = document.getElementsByClassName(Constants.TEST_IMAGES)[0] as HTMLElement;
        testImages.style.display = "flex";
        Help.empty(Constants.TEST_IMAGES);

        let selectedCategories = new Array();

        const categories: any[] = info.categories;
        const categoriesLength = categories.length;
        selectedCategories[0] = categories[info.currentIndex];
        let i = 1;

        while (i < picturesCount) {
            const random = Help.getRandomInt(0, categoriesLength);
            const category = categories[random];
            if (selectedCategories.indexOf(category) === -1) {
                selectedCategories.push(category);
                i++;
            }
        }

        Help.shuffle(selectedCategories);

        for (let j = 0; j < selectedCategories.length; j++) {

            let category = selectedCategories[j];

            let radio: HTMLInputElement = document.createElement("input");
            radio.type = "radio";
            const idText = "rd" + j;
            radio.id = idText;
            let label: HTMLLabelElement = document.createElement("label");
            label.htmlFor = idText;

            let img: HTMLImageElement = document.createElement("img");
            img.src = category.picture.toString();
            img.className = "img-fluid";
            img.dataset["answer"] = category.translation;

            label.appendChild(img);
            testImages.appendChild(radio);
            testImages.appendChild(label);
        }

        Help.setSelectionOfOneElement(Constants.TEST_IMAGES, Constants.SELECTED_PICTURE);
    }

    public static loadText(info: TestInfo): void {
        const textsCount: number = +info.setting["words"];

        if (textsCount < 1 || textsCount > 5) { return; }

        let testWord = document.getElementsByClassName(Constants.TEST_WORD)[0] as HTMLElement;
        Help.empty(Constants.TEST_WORD);

        let indexes = new Array();
        indexes[0] = info.currentIndex;

        let i = 1;

        while (i < textsCount) {
            let randomTextIndex = Help.getRandomInt(0, textsCount + 1);
            if (indexes.indexOf(randomTextIndex) === -1) {
                indexes.push(randomTextIndex);
                i++;
            }
        }

        Help.shuffle(indexes);

        for (let j = 0; j < indexes.length; j++) {

            var radio = document.createElement('input');
            radio.type = "radio";
            let idText = "rd" + j;
            radio.id = idText;
            var label = document.createElement('label');
            label.htmlFor = idText;

            let text = info.categories[indexes[j]].translation;
            let h3 = document.createElement("h3");
            let textNode = document.createTextNode(text);
            h3.appendChild(textNode);
            label.appendChild(h3);
            label.appendChild(radio);
            testWord.appendChild(label);

            Help.setSelectionOfOneElement(Constants.TEST_WORD, Constants.SELECTED_TEXT);
        }
    }

    public static loadSounds(info: TestInfo): void {
        const soundsCount: number = +info.setting["sounds"];

        if (soundsCount < 1 || soundsCount > 4) { return; }

        let sounds = document.querySelector(`.${Constants.TEST_SOUNDS}`) as HTMLElement;
        Help.empty(Constants.TEST_SOUNDS);
        sounds.style.display = "block";

        let indexes = new Array();
        indexes[0] = info.currentIndex;

        let i = 1;

        while (i < soundsCount) {
            const randomIndex = Help.getRandomInt(0, 2);
            if (indexes.indexOf(randomIndex) === -1) {
                indexes.push(randomIndex);
                i++;
            }
        }

        Help.shuffle(indexes);

        for (let k = 0; k < indexes.length; k++) {

            const pronounce = info.categories[indexes[k]].translationPronounce;
            const translation = info.categories[indexes[k]].translation;
            let audio: HTMLAudioElement = document.createElement('audio');
            audio.controls = true;
            audio.src = `${pronounce}`;
            //audio.type = "audio/mpeg";
            audio.dataset["answer"] = translation;
            sounds.appendChild(audio);
        }
    }

    public static enableInput(info: TestInfo): void {
        let inputDiv = document.getElementsByClassName(Constants.TEST_INPUT)[0] as HTMLElement;
        const style: string = "display: block";
        inputDiv.setAttribute("style", style);
    }

    public static loadRandomText(info: TestInfo): void {
        const decisionArray: boolean[] = [true, false];
        const decisionIndex: number = Help.getRandomInt(0, decisionArray.length + 1);
        const showTrue: boolean = decisionArray[decisionIndex];

        const categories: any[] = info.categories;
        let testWord = document.getElementsByClassName(Constants.TEST_WORD)[0] as HTMLElement;

        testWord.setAttribute("style", "display: grid");
        Help.empty(Constants.TEST_WORD);

        const current = +info.currentIndex;
        let text: string;

        if (showTrue) {
            text = categories[current].translation;
        } else {
            let randomIndex: number;
            do {
                randomIndex = Help.getRandomInt(0, categories.length);
            } while (randomIndex === current);
            text = categories[randomIndex].translation;

        }

        let h3: HTMLHeadingElement = document.createElement("h3");
        let textNode: Text = document.createTextNode(text);

        h3.appendChild(textNode);
        testWord.appendChild(h3);

        let confirmButton = document.querySelector(`.${Constants.CONFIRM}`) as HTMLElement;

        if (confirmButton) { confirmButton.outerHTML = ""; }

        let buttonsDiv = document.querySelector(`.${Constants.BUTTONS}`) as HTMLElement;
        buttonsDiv.setAttribute("style", "display: flex");

        buttonsDiv.querySelectorAll("button").forEach(button => {
            button.addEventListener("click",
                (e: Event) => {
                    button.classList.add(Constants.CLICKED);
                    const children = button.parentNode.children;
                    [].filter.call(children, (child: any) => child != button)
                        .forEach((child: any) => child.classList.remove(Constants.CLICKED));
                });
        });
    }

    public static loadNativeText(info: TestInfo): void {
        //this test has 5 words. 4 native words and 1 foreign
        //we need only native words count here
        const textCount: number = +info.setting["words"] - 1;
        const testForeignWord = document.getElementsByClassName(Constants.TEST_FOREIGN)[0] as HTMLElement;
        const testNativeWord = document.getElementsByClassName(Constants.TEST_WORD)[0] as HTMLElement;
        Help.empty(Constants.TEST_FOREIGN);
        Help.empty(Constants.TEST_WORD);
        testForeignWord.setAttribute("style", "display: flex");

        let currentIndex: number = +info.currentIndex;
        const categories: any[] = info.categories;
        const foreignText = categories[currentIndex].translation;
        let foreignH3: HTMLHeadingElement = document.createElement("h3");
        let foreignTextNode: Text = document.createTextNode(foreignText);
        foreignH3.appendChild(foreignTextNode);
        testForeignWord.appendChild(foreignH3);

        let indexes = new Array<number>();
        indexes[0] = currentIndex;

        let i = 1;

        while (i < textCount) {
            const randomTextIndex: number = Help.getRandomInt(0, textCount + 1);

            if (indexes.indexOf(randomTextIndex) === -1) {
                indexes.push(randomTextIndex);
                i++;
            }
        }

        Help.shuffle(indexes);

        for (let j = 0; j < indexes.length; j++) {
            const currentCategory = categories[indexes[j]];

            const radio: HTMLInputElement = document.createElement('input');
            radio.type = "radio";
            const idText = `rd${j}`;
            radio.id = idText;
            const label: HTMLLabelElement = document.createElement('label');
            label.htmlFor = idText;

            const text = currentCategory.native;
            const h3: HTMLHeadingElement = document.createElement("h3");
            const textNode: Text = document.createTextNode(text);
            h3.appendChild(textNode);
            label.dataset["answer"] = currentCategory.translation;
            label.appendChild(h3);
            testNativeWord.appendChild(radio);
            testNativeWord.appendChild(label);

            Help.setSelectionOfOneElement(Constants.TEST_WORD, Constants.SELECTED_TEXT);
        }
    }

    //public static loadPairs(info: TestInfo): void {
    //    let testResults10 = new TestResult();

    //    Help.empty(`.${Constants.FOREIGN}`);
    //    Help.empty(`.${Constants.NATIVE}`);
    //    Help.empty(`.${Constants.INTERMEDIATE}`);

    //    let foreignDiv = document.getElementsByClassName(Constants.FOREIGN)[0] as HTMLElement;
    //    let nativeDiv = document.getElementsByClassName(Constants.NATIVE)[0] as HTMLElement;

    //    //to prevent multicast  event
    //    document.querySelector(`.${Constants.CHECK}`).removeEventListener('click', callMakePairs);
    //    document.querySelector(`.${Constants.CONFIRM}`).removeEventListener('click', checkLength);

    //    let wordsNumber = 4;
    //    let currentIndex = info.currentIndex;

    //    let categories = info.categories.slice(currentIndex, currentIndex + wordsNumber);
    //    let nativeWordsArray = new Array<any>();
    //    let foreignWordsArray = new Array<any>();
    //    for (let k = 0; k < categories.length; k++) {

    //        //push entire category to be able to get word translation when compares selected words
    //        nativeWordsArray.push(categories[k]);
    //        foreignWordsArray.push(categories[k].translation);
    //        info.increaseIndex();
    //    }

    //    Help.shuffle(nativeWordsArray);
    //    Help.shuffle(foreignWordsArray);

    //    for (let j = 0; j < nativeWordsArray.length; j++) {

    //        //translation words
    //        let tRadio: HTMLInputElement = document.createElement("input");
    //        tRadio.type = "radio";
    //        let tIdText = `f_rd${j}`;
    //        tRadio.id = tIdText;
    //        let tLabel: HTMLLabelElement = document.createElement("label");
    //        tLabel.htmlFor = tIdText;

    //        let tText: string = foreignWordsArray[j];
    //        let tH3: HTMLHeadingElement = document.createElement("h3");
    //        let tTextNode: Text = document.createTextNode(tText);
    //        tH3.appendChild(tTextNode);
    //        tLabel.appendChild(tH3);
    //        foreignDiv.appendChild(tRadio);
    //        foreignDiv.appendChild(tLabel);

    //        Help.setSelectionOfOneElement(Constants.FOREIGN, Constants.SELECTED_F_TEXT);
            
    //        //native words
    //        let nRadio: HTMLInputElement = document.createElement("input");
    //        nRadio.type = "radio";
    //        let nIdText = `n_rd${j}`;
    //        nRadio.id = nIdText;
    //        let nLabel: HTMLLabelElement = document.createElement("label");
    //        nLabel.htmlFor = nIdText;

    //        let nText: string = nativeWordsArray[j].native;
    //        let nH3: HTMLHeadingElement = document.createElement("h3");
    //        let nTextNode: Text = document.createTextNode(nText);
    //        nH3.appendChild(nTextNode);
    //        nH3.dataset["answer"] = nativeWordsArray[j].translation;
    //        nLabel.appendChild(nH3);
    //        nativeDiv.appendChild(nRadio);
    //        nativeDiv.appendChild(nLabel);

    //        Help.setSelectionOfOneElement(Constants.NATIVE, Constants.SELECTED_N_TEXT);

    //    }

    //    document.querySelector(Constants.CHECK).addEventListener('click', callMakePairs);
    //    document.querySelector(Constants.CONFIRM).addEventListener('click', checkLength);

    //    //because NextTest() increases index
    //    info.reduceIndex();
    //}

    //private static makePair(info: TestInfo, result: TestResult): void {
    //    Help.empty(Constants.INTERMEDIATE);

    //    const intermediate = document.getElementsByClassName(Constants.INTERMEDIATE)[0] as HTMLElement;
    //    const nativeLabel = document.querySelector(`.${Constants.SELECTED_N_TEXT}`) as HTMLElement;
    //    const transLabel = document.querySelector(`.${Constants.SELECTED_F_TEXT}`) as HTMLElement;

    //    if (nativeLabel && transLabel) {
    //        const transHeading = transLabel.childNodes[0] as HTMLElement;
    //        const nativeHeading = nativeLabel.childNodes[0] as HTMLElement;
    //        let transWord: string = transHeading.textContent;
    //        let nativeWord: string = nativeLabel.dataset["answer"];

    //        let text = `${transWord} — ${nativeHeading.innerText}`;
    //        let comparison = nativeWord === transWord;
    //        if (comparison) {
    //            result.emitCorrectAnswer(text);
    //            TestResults10.QuestionResults.push("correct");
    //            testResult.QuestionNames.push(text);
    //            testResult.QuestionResults.push("correct");
    //            nativeLabel.classList.remove(SELECTED_N_TEXT);
    //            transLabel.classList.remove(SELECTED_F_TEXT);
    //        } else {
    //            TestResults10.QuestionNames.push(text);
    //            TestResults10.QuestionResults.push("uncorrect");
    //            testResult.QuestionNames.push(text);
    //            testResult.QuestionResults.push("uncorrect");
    //            nativeLabel.classList.remove(SELECTED_N_TEXT);
    //            transLabel.classList.remove(SELECTED_F_TEXT);
    //        }

    //        nativeLabel.innerHTML = "";
    //        transLabel.innerHTML = "";

    //        let table = document.createElement('table');
    //        for (let i = 0; i < TestResults10.GetLength(); i++) {
    //            let tr = document.createElement('tr');
    //            let NameTextNode = document.createTextNode(TestResults10.QuestionNames[i]);
    //            let ResultTextNode = document.createTextNode(TestResults10.QuestionResults[i]);


    //            let tdName = document.createElement('td');
    //            let tdResult = document.createElement('td');
    //            tdName.appendChild(NameTextNode);
    //            tdResult.appendChild(ResultTextNode);

    //            tr.appendChild(tdName);
    //            tr.appendChild(tdResult);
    //            table.appendChild(tr);
    //        }
    //        intermediate.appendChild(table);
    //    } else {
    //        alert(Constants.ALERT_MESSAGE);
    //    }    
    //}
}

class Help {
    public  static empty(className: string): void {
        let elements = document.getElementsByClassName(className);

        for (let i = 0; i < elements.length; i++) {
            elements[i].innerHTML = '';
        }
    }

    public static getRandomInt(min: number, max: number) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    public static shuffle(a: any[]) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }

        return a;
    }

    public static siblingsBySelector(element: HTMLElement, selector?: string): HTMLElement[] {

        if (!selector) {
            selector = element.tagName;
        }

        let children = element.parentNode.querySelectorAll(selector);
        return Array.prototype.filter.call(children,
            (child: any) => child != element && !this.isDescendant(element, child));
    }

    public static isDescendant(parent: HTMLElement, child: HTMLElement): boolean {
        let node = child.parentNode;

        while (node != null) {

            if (node == parent) {
                return true;
            }

            node = node.parentNode;
        }

        return false;
    }

    public static setSelectionOfOneElement(selector: string, operatingClass: string) {
        //hide radio buttons
        const radioElements = document.querySelectorAll(`.${selector} [input="radio"]`);
        radioElements.forEach(element => element.classList.add("input_hidden"));

        //add selection class on click and remove it from siblings
        const labelsList = document.querySelectorAll(`.${selector} label`);
        labelsList.forEach(element => element.addEventListener("click", (event) => {
            //element --> label; target --> image || text
            let target = event.target as HTMLElement;
            target.classList.add(operatingClass);
            this.siblingsBySelector(element as HTMLElement, target.tagName).forEach((sibling: HTMLElement) => {
                sibling.classList.remove(operatingClass);
            });
        }));
    }
}

/*TODO:
 -implement fill method for test 10
 -implement check method for test 10
 -rewrite checkMethod class with using of "Abstract 
    method" => change TestInfo class
 */
