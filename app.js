$(function() {
    const words = [
        { en: "Abundant", ua: "Багатий" },
        { en: "Compromise", ua: "Компроміс" },
        { en: "Diverse", ua: "Різноманітний" },
        { en: "Eloquent", ua: "Красномовний" },
        { en: "Implement", ua: "Впроваджувати" },
        { en: "Justify", ua: "Виправдовувати" },
        { en: "Keen", ua: "Захоплений" },
        { en: "Persuade", ua: "Переконувати" },
        { en: "Reinforce", ua: "Посилювати" },
        { en: "Substantial", ua: "Значний" },
        { en: "Appreciate", ua: "Цінувати" },
        { en: "Benefit", ua: "Користь" },
        { en: "Critique", ua: "Критика" },
        { en: "Disrupt", ua: "Заважати" },
        { en: "Exemplify", ua: "Ілюструвати" },
        { en: "Facilitate", ua: "Сприяти" },
        { en: "Generate", ua: "Генерувати" },
        { en: "Hypothesis", ua: "Гіпотеза" },
        { en: "Illustrate", ua: "Ілюструвати" },
        { en: "Navigate", ua: "Навігувати" }
    ];
    
    const card = $('.card');
    const counter = $('.num');
    let inputVal = $('.translate');
    let correctCountElem = $('.correct');
    let incorrectCountElem = $('.incorrect');
    
    let shuffledWords = shuffleArray(words); 
    let currentCount = 0;
    let correctCount = 0;
    let incorrectCount = 0;
    let currentWord = null;

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function showResults() {
        const totalWords = shuffledWords.length / 2;
        const level = correctCount / totalWords * 100;
        
        const modal = $('.modal');
        const results = $('.results');
        modal.css('visibility', 'visible');
        modal.css('opacity', '1');
        results.css('transform', 'translateY(0%)');
        
        let summaryText = `You answered ${correctCount} out of 10 correctly.`;
    
        let recommendationsText = '';
        if (level === 100) {
            recommendationsText = "Excellent job! You have a strong grasp of the vocabulary.";
        } else if (level >= 75) {
            recommendationsText = "Great work! You have a good understanding of the vocabulary, but there's still room for improvement.";
        } else if (level >= 50) {
            recommendationsText = "Not bad! However, you might want to review some words to enhance your vocabulary.";
        } else {
            recommendationsText = "Keep practicing! Regular study will help you improve your vocabulary.";
        }
    
        $('#resultsText').text(`Your English language level is: ${level.toFixed(2)}%`);
        $('.summary').text(summaryText);
        $('.recommendations').text(recommendationsText);

        $('.restart').on('click', () => {
            modal.css('visibility', 'hidden');
            modal.css('opacity', '0');
            results.css('transform', 'translateY(-120%)');

            currentCount = 0;
            correctCount = 0;
            incorrectCount = 0;
            correctCountElem.text(`Correct: ${correctCount}`);
            incorrectCountElem.text(`Incorrect: ${incorrectCount}`);
            counter.html(`${currentCount + 1} / 10`);
            inputVal.val('');
        });
    }

    function loadNextWord() {
        if (currentCount < 10) {
            currentWord = shuffledWords[currentCount];
            card.html(currentWord.en); 
            counter.html(`${currentCount + 1} / 10`);
            inputVal.val('');
        } else {
            showResults();
        }
    }

    let showUA = true;
    card.on('click', () => {
        if (showUA) {
            card.text(currentWord.ua);
        } else {
            card.text(currentWord.en);
        }

        showUA = !showUA;
    });

    $('.right').on('click', (event) => {
        event.preventDefault();
        currentCount++;
        loadNextWord();
    });

    $('.left').on('click', (event) => {
        event.preventDefault();
        if (currentCount > 0) {
            currentCount--;
            loadNextWord();
        }
    });

    inputVal.on('keypress', (event) => {
        if (currentCount < 10) {
            if (event.which === 13 && currentWord) {
                const userTranslation = inputVal.val().trim();
                if (userTranslation.toLowerCase() === currentWord.ua.toLowerCase()) {
                    correctCount++;
                } else {
                    incorrectCount++;
                }
    
                correctCountElem.text(`Correct: ${correctCount}`);
                incorrectCountElem.text(`Incorrect: ${incorrectCount}`);
    
                currentCount++;
                loadNextWord();
            }
        }
    });

    loadNextWord();
});
