function clickButtonsAndAnswerQuestions() {
  var radioButtons = document.querySelectorAll('input[type="radio"]');
  var showAnswerButtons = Array.from(document.querySelectorAll('button')).filter(button => button.innerText.trim() === 'Show answer');
  var index = 0;

  function clickNextButton() {
    if (index < radioButtons.length) {
      var button = radioButtons[index];
      var parent = button.closest('label') || button.parentElement;
      if (parent) button.click();
      index++;
      setTimeout(clickNextButton, 1000);
    } else if (index < radioButtons.length + showAnswerButtons.length * 2) {
      var showIndex = Math.floor((index - radioButtons.length) / 2);
      var showButton = showAnswerButtons[showIndex];
      if (showButton) showButton.click();
      index++;
      setTimeout(clickNextButton, 1000);
    } else {
      setTimeout(copyAndPasteAnswers, 1000);
    }
  }

  function copyAndPasteAnswers() {
    var answerSpans = document.querySelectorAll('span.forfeit-answer');
    var textAreas = document.querySelectorAll('textarea');
    if (answerSpans.length !== textAreas.length) return;
    answerSpans.forEach((span, index) => {
      var answer = span.textContent.trim();
      var textArea = textAreas[index];
      if (textArea) {
        textArea.value = answer;
        textArea.dispatchEvent(new Event('input', { bubbles: true }));
      }
    });
    setTimeout(clickCheckButtonsWithDelay, 1000);
  }

  function clickCheckButtonsWithDelay() {
    var checkButtons = document.querySelectorAll('button.check-button');
    var checkIndex = 0;

    function clickNextCheckButton() {
      if (checkIndex < checkButtons.length) {
        var button = checkButtons[checkIndex];
        button.click();
        checkIndex++;
        setTimeout(clickNextCheckButton, 1000);
      } else {
        setTimeout(clickNextPageButton, 1000);
      }
    }

    clickNextCheckButton();
  }

  function clickNextPageButton() {
    var nextPageButton = document.querySelector('#ember2005'); // Adjust the selector to match the actual id of the next page button
    if (nextPageButton) {
      nextPageButton.click();
      console.log('Next page button clicked.');
    } else {
      console.log('Next page button not found.');
    }
  }

  clickNextButton();
}

clickButtonsAndAnswerQuestions();
