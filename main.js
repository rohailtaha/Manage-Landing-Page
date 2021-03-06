const toggleClass = (element, oldClass, newClass) => {
  element.classList.remove(oldClass)
  element.classList.add(newClass)
}

const toggleNavigation = function (event) {
  event.preventDefault()
  const nav__list = document.querySelector('.nav__list')
  if (isNavigationVisible()) {
    toggleClass(nav__list, 'nav__list--show', 'nav__list--hide')
    this.style.backgroundImage = "url(../images/icon-hamburger.svg)"
  } else {
    toggleClass(nav__list, 'nav__list--hide', 'nav__list--show')
    this.style.backgroundImage = "url(../images/icon-close.svg)"
  }

  function isNavigationVisible() {
    return document
      .querySelector('.nav__list')
      .classList.contains('nav__list--show')
  }
}

document.querySelector('.nav__menu-btn').addEventListener('click', toggleNavigation)

const bindEventsToCarouselButtons = (function () {
  getCarouselButtons().forEach(button => {
    button.addEventListener('click', function () {
      hideCurrentTestimonial()
      deactivateOtherButtons(this)
      showTestimonial(this)
      activateButton(this)
    })
  })

  function hideCurrentTestimonial() {
    const activeButton = getCarouselButtons().find(button => {
      return button.classList.contains('carousel__btn-list__btn--active')
    })
    document.querySelector(`.${activeButton.getAttribute('testimonial')}`).classList.add('testimonial--hide')

  }

  function deactivateOtherButtons(buttonToActivate) {
    getOtherButtons().forEach(button => {
      button.classList.remove('carousel__btn-list__btn--active')
    })

    function getOtherButtons() {
      return getCarouselButtons().filter(button => {
        return buttonToActivate.id !== button.id
      })
    }
  }

  function showTestimonial(button) {
    document
      .querySelector(`.${button.getAttribute('testimonial')}`)
      .classList.remove('testimonial--hide')
  }

  function activateButton(button) {
    button.classList.add('carousel__btn-list__btn--active')
  }

  function getCarouselButtons() {
    return Array.from(document.querySelectorAll('.carousel__btn-list button'))
  }

  function getTestimonials() {
    return Array.from(document.querySelectorAll('.testimonial'))
  }
})()


const validateForm = function() {

  if(isFieldEmpty()) {
    showError();
  } else {
    showConfirmation();
    emptyField();
  }
  clearMessage();
  return;
  
  function isFieldEmpty() {
    return document.querySelector('.footer__form__email-input').value === '';
  }

  function showError() {
    getMessageContainer().style.color = "hsl(12, 88%, 59%)";
    getMessageContainer().innerHTML = 'Please insert a valid email';
  }

  function showConfirmation() {
    getMessageContainer().style.color = "rgb(39, 187, 39)";
    getMessageContainer().innerHTML = 'Thanks for subscribing.';
  }

  function clearMessage() {
    setTimeout(() => {
      getMessageContainer().innerHTML = '';
    },3000)
  }

  function emptyField() {
    document.querySelector('.footer__form__email-input').value = '';
  }

  function getMessageContainer() {
    return document.querySelector('.footer__form__message');
  }
}

document.querySelector('.footer__form__submit-btn').addEventListener('click', (event) => {
  event.preventDefault();
  validateForm();
});

