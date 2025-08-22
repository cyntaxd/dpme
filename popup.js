const popupData = {
    web1: `
    <img src="tuw site preview.png" width="50%" height="50%">
    <br>
    <h1>The Useful Website</h1>
    <br>
    <a href="https://tuw.dpme.us"><button class="webBtn">Visit Website</button></a>
    <br>
    <h3>Site Overview</h3>
    <p>This website was created for a Japanese final project. Due to time constraints and limited knowledge, I was only able to use padding and margin to center the divs with forms and content in them. Because of this, the site doesn't work on mobile. Like at all. For smaller devices, in order to view the site without having to scroll 13 meters to the right, you should decrease size. Or scroll all those meters to the right. Whatever tickles your fancy. (I am never saying that again) Anyways, it is NOT very useful. All applications shown are downright stupid and should not be used, in exception to the calculator, which works, but is very tedious to work with. Also <span style="color: red; font-weight: bold;">DISCLAIMER, I AM NOT TRYING TO SCAM YOUR INFO, THE FORM FOR INPUTTING YOUR CONFIDENTIAL INFO IS VERY FAKE AND IS NOT HOOKED UP TO ANYTHING!</span></p>
    `,
    web2: `
    <img src="roadblock site preview.png" width="50%" height="50%">
    <br>
    <h1>Roadblock</h1>
    <br>
    <a href="https://rb.dpme.us"><button class="webBtn">Visit Website</button></a>
    <br>
    <h3>Site Overview</h3>
    <p>This website was created as a first test to my CSS and JS skills. About 3 lines of JS. Made as a testing site, and once intended to be used until the Great Proxy Crackdown of '25. Anyways, it's retired now, until I can get the search bar to work, because it would be a good test for my skills. Styling still needs heavy work, but will get around to that eventually. Was going to add more games and stuff but... Great Proxy Crackdown of '25 happened, so there's that.</p>
    `
}

const buttons = document.querySelectorAll('.popup-btn');
const popup = document.getElementById('popup');
const popupContent = document.getElementById('popup-content');
const closeBtn = document.getElementById('close-popup');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const id = button.getAttribute('data-id');
    popupContent.innerHTML = popupData[id];
    popup.classList.remove('hidden');
  });
});

closeBtn.addEventListener('click', () => {
    popup.classList.add('hidden');
})