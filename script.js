// Находим главные элементы сайта
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startButton = document.getElementById("start-button");
const questionText = document.getElementById("question");
const answersContainer = document.getElementById("answers");
const progress = document.getElementById("progress");
const nextButton = document.getElementById("next-button");
const catName = document.getElementById("cat-name");
const catDescription = document.getElementById("cat-description");
const catImage = document.getElementById("cat-image");
const restartButton = document.getElementById("restart-button");

let currentQuestion = 0;
let scores = {
    bun: 0,
    aristocrat: 0,
    chaos: 0,
    sleepy: 0,
    queen: 0,
    romantic: 0,
    rebel: 0,
    explorer: 0
};

const questions = [
    {
        question: "Ты пришел в незнакомое место. Что ты будешь делать?",
        answers: [
            { text: "Сначала осмотрюсь и привыкну", cat: "aristocrat" },
            { text: "Сразу начну все иследовать", cat: "explorer" },
            { text: "Найду уютное местечко и останусь там", cat: "sleepy" },
            { text: "Попробую познакомиться с кем-нибудь", cat: "bun" }
        ]
    },

    {
        question: "Как ты обычно проводишь время с друзьями?",
        answers: [
            { text: "Обнимаюсь, болтаю и проявляю заботу", cat: "bun" },
            { text: "Люблю подшучивать и устаривать веселье", cat: "chaos" },
            { text: "Больше слушаю, чем рассказываю", cat: "aristocrat" },
            { text: "Предлагаю куда-нибудь сзодить и что-нибудь попробовать", cat: "explorer" }
        ]
    },

    {
        question: "Что для тебя важнее всего?",
        answers: [
            { text: "Чтобы меня любили и ценили", cat: "romantic" },
            { text: "Чтобы у меня была свобода делать что хочется", cat: "rebel" },
            { text: "Чтобы в жизни было спокойно и комфортно", cat: "sleepy" },
            { text: "Чтобы каждый день происходило что-нибудь интересное", cat: "chaos" }
        ]
    },
    {
        question: "Что ты сделаешь, если у тебя неожиданно появится целый свободный день?",
        answers: [
            { text: "Устрою себе уютный день дома", cat: "sleepy" },
            { text: "Позову друзей и предложу куда нибудь сходить", cat: "explorer" },
            { text: "Займусь тем, что давно хотела попробовать", cat: "queen" },
            { text: "Буду делать все, что захочется, без каких-либо планов", cat: "chaos" }
        ]
    },
    {
        question: "Как ты реагируешь на комплименты?",
        answers: [
            { text: "Смущаюсь, но мне очень приятно", cat: "bun" },
            { text: "Благодарю и принимаю с уверенностью", cat: "queen" },
            { text: "Начинаю шутить в ответ", cat: "chaos" },
            { text: "Не очень умею реагировать, поэтому теряюсь", cat: "romantic" }
        ]
    },
    {
        question: "Что тебя быстрее всего может расстроить?",
        answers: [
            { text: "Когда близкие становятся холодными", cat: "romantic" },
            { text: "Когда меня ограничивают и не дают свободы", cat: "rebel" },
            { text: "Когда вокруг слишком много шума и проблем", cat: "aristocrat" },
            { text: "Когда что-то не получается, хотя я очень стараюсь", cat: "queen" }
        ]
    },
    {
        question: "Как бы ты описала свой характер?",
        answers: [
            { text: "Мягкая и добрая, но иногда слишком ранимая", cat: "bun" },
            { text: "Спокойная, рассудительная и немного загадочная", cat: "aristocrat" },
            { text: "Веселая, шумная и непредсказуемая", cat: "chaos" },
            { text: "упрямая, независимая и со своим мнением", cat: "rebel" },
            { text: "Мечтательная, романтичная и чувствительная", cat: "romantic" },
            { text: "Любознательная, общительная и активная", cat: "explorer" }
        ]
    },
    {
        question: "Что ты больше всего ценишь в людях?",
        answers: [
            { text: "Искренность и доброту", cat: "bun" },
            { text: "Чувство юмора и легкость", cat: "chaos" },
            { text: "Верность и надежность", cat: "aristocrat" },
            { text: "Ум и интересное мышление", cat: "explorer" }
        ]
    },
    {
        question: "Как ты поступишь, если у тебя что-то не получается с первого раза?",
        answers: [
            { text: "Расстроюсь, но попробую еще раз", cat: "queen" },
            { text: "Попрошу кого-нибудь помочь", cat: "bun" },
            { text: "Отложу и вернусь к этому позже", cat: "sleepy" },
            { text: "Разозлюсь и буду пытаться, пока не получится", cat: "rebel" }
        ]
    },
    {
        question: "Если бы ты могла прямо сейчас оказаться где угодно, куда бы отправилась?",
        answers: [
            { text: "Домой, в родной город или деревню", cat: "romantic" },
            { text: "В красивый большой город, полный огней", cat: "queen" },
            { text: "На берег моря, где можно просто отдохнуть", cat: "sleepy" },
            { text: "В место, где никогда раньше не была", cat: "explorer" }
        ]
    }

];
function showQuestion() {
    const current = questions [currentQuestion];
    questionText.textContent = current.question;
    progress.textContent = `Вопрос ${currentQuestion + 1} из ${questions.length}`;
    answersContainer.innerHTML = "";
    nextButton.hidden = true;
    if (currentQuestion === questions.length - 1) {
        nextButton.textContent = "Завершить тест";
    } else {
        nextButton.textContent = "Далее";
    }
    current.answers.forEach(function(answer){
        const answerButton = document.createElement("button");
        answerButton.textContent = answer.text;
        answerButton.addEventListener("click", function() {
            scores[answer.cat]++;
            answersContainer.querySelectorAll("button").forEach(function(button){
                button.disabled = true;
                answerButton.classList.add("selected");
            });
            nextButton.hidden = false;
        });
        answersContainer.appendChild(answerButton);
    });
}
// Кнопка начала теста
startButton.addEventListener("click", function() {
    startScreen.hidden = true;
    quizScreen.hidden = false;
    showQuestion();
});
nextButton.addEventListener("click", function() {
    currentQuestion++;
    if (currentQuestion < questions.length){
        showQuestion();
    } else {
        quizScreen.hidden = true;
        resultScreen.hidden = false;
        const winner = getWinner();
        const cat = cats[winner];
        catName.textContent = cat.name;
        catDescription.textContent = cat.description;
        catImage.src = cat.image;
        catImage.hidden = false;
    }
   
});
restartButton.addEventListener("click", function() {
    // Возвращаемся к первому вопросу
    currentQuestion = 0;
    // Обнуляем все баллы
    for (let cat in scores) {
        scores[cat] = 0;
    }
    // Возвращаем начальную страницу
resultScreen.hidden = true;
startScreen.hidden = false;
// Возвращаем обычное состояние результата
catImage.hidden = false;
catName.textContent = "Имя котика";
catDescription.textContent = "Описание котика";
});
const cats = {
    bun: {
        name: "Нежная булочка",
        description: "Ты добрая, ласковая и заботливая. Любишь уют и тепло близких.",
        image: "images/bun.jpg"
    },
    aristocrat: {
        name: "Загадочный аристократ",
        description: "Ты независимая, спокойная и немного загадочная.",
        image: "images/aristocrat.jpg"
    },
    chaos: {
        name: "Рыжий хаус",
        description: "Ты энергичная, веселая и непредсказуемая!",
        image: "images/chaos.jpg"
    },
    sleepy: {
        name: "Сонная плюшка",
        description: "Ты любишь комфорт, спокойствие и уют",
        image: "images/sleepy.jpg"
    },
    queen: {
        name: "Королевская особа",
        description: "Ты уверенная в себе, любишь внимание и заешь себе цену.",
        image: "images/queen.jpg"
    },
    romantic: {
        name: "Маленький романтик",
        description: "Ты мечтательная, чувствительная и веришь в искренность.",
        image: "images/romantic.jpg"
    },
    rebel: {
        name: "Котик-бунтарь",
        description: "Ты смелая, независимая и всегда остаешься при своем мнении.",
        image: "images/rebel.jpg"
    },
    explorer: {
        name: "Любопытный иследователь",
        description: "Ты любознательная, общительная и обожаешь новое.",
        image: "images/explorer.jpg"
    }
};
function getWinner() {
    let winner = "";
    let maxScore = -1;

    for (let cat in scores) {
        if (scores[cat] > maxScore) {
            maxScore = scores[cat];
            winner = cat;
        }
    }
    return winner;
}
// Создаем дорожку из кошачьих лапок 

function createPawTrail() {

    const container = document.getElementById("paw-container");

    // Выбираем направление

    const directions = ["right", "left", "down", "up"];

    const direction = directions[Math.floor(Math.random() * directions.length)];

    // Выбираем место прогулки

    const lane = 15 + Math.random() * 70;

    // Создаем 8 следов

    for (let i = 0; i < 8; i++) {

        setTimeout(function() {

            const paw = document.createElement("span");

            paw.className = "paw";

            paw.textContent = "🐾";

            const offset = i % 2 === 0 ? -2 : 2;

            if (direction === "right") {

                paw.style.left = `${-4 + i * 15}%`;

                paw.style.top = `${lane + offset}%`;

            }

            if (direction === "left") {

                paw.style.left = `${104 - i *15}%`;

                paw.style.top = `${lane + offset}%`;

            }

            if (direction === "down") {

                paw.style.left = `${lane + offset}%`;
                paw.style.top = `${-4 +i *15}%`;

            }

            if (direction === "up") {

                paw.style.left = `${lane + offset}`;
                paw.style.top = `${104 - i * 15}`;

            }

            container.appendChild(paw);

            setTimeout(function() {

                paw.remove();

            }, 4000);

        }, i * 350);

    }

}

// Запускаем прогулки

createPawTrail();

setInterval(createPawTrail, 7000);