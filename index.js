const toggleBtn = document.getElementById('toggleHeaderBtn');
const main = document.getElementById('main');
const body = document.querySelector('body');

let header = document.querySelector('header');

toggleBtn.addEventListener('click', () => {
    if (!header) return;

    header.classList.remove('open');
    header.classList.add('closed');
    toggleBtn.setAttribute('aria-pressed', 'true');

    let transitionHandled = false;

    const applyMainStyle = () => {
        main.style.top = "25px";
        main.style.padding = "2rem";
        console.log('Header removed, padding updated');
    };

    const onTransitionEnd = (e) => {
        if (e.propertyName === 'max-height') {
            transitionHandled = true;
            header.remove();
            header = null;
            applyMainStyle();
            header.removeEventListener('transitionend', onTransitionEnd);
        }
    };

    header.addEventListener('transitionend', onTransitionEnd);

    // fallback if transitionend never fires
    setTimeout(() => {
        if (!transitionHandled && header) {
            header.remove();
            header = null;
            applyMainStyle();
        }
    }, 400);
});
