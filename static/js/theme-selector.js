// USer Preference for theme
const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
const themeSwitcher = document.getElementsByClassName('dark--toggle')[0];
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        document.getElementById('typing-cat').setAttribute('src', 'static/images/gif/cat-dark.webp');
    }
}
// Switch theme
function setSwitchTheme() {
    const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
    if (currentTheme == 'light') {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.getElementById('typing-cat').setAttribute('src', 'static/images/gif/cat-dark.webp');
        localStorage.setItem('theme', 'dark');
    }
    else {
        document.documentElement.setAttribute('data-theme', 'light');
        document.getElementById('typing-cat').setAttribute('src', 'static/images/gif/cat-light.webp');
        localStorage.setItem('theme', 'light');
    }    
}
themeSwitcher.addEventListener('click', setSwitchTheme, false);