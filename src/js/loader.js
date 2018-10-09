window.addEventListener('load', function() {
    $preloader = document.querySelector('.loader');
    $loader = document.querySelector('.loader__percent');
    let i = 0;
    setTimeout(function timer() {
        if (i < 101 && document.readyState !== 'complete') {
            $loader.innerHTML = i;
            i++;
            setTimeout(timer, 100);
        } else {
            $preloader.classList.toggle('loader__fade');
            setTimeout(function() {
                $preloader.hidden = true;
            }, 400);
        }
    }, 10);
});
