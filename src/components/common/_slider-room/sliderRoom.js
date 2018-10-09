(function() {
    let images = [
        'https://picsum.photos/864/416/?image=0',
        'https://picsum.photos/864/416/?image=1',
        'https://picsum.photos/864/416/?image=3'
    ];

    window.onload = function() {
        let $prev = document.getElementById('slide-prev');
        let $next = document.getElementById('slide-next');
        let $image = document.getElementById('slide-image');
        let $sliderCounter = document.querySelector('.sider-room__counter');
        let $sliderSum = document.querySelector('.sider-room__sum');

        let n = 0;
        $image.src = images[n];
        $sliderCounter.innerHTML = n + 1;
        $sliderSum.innerHTML = images.length;

        function slideNext() {
            if (n >= images.length - 1) {
                n = 0;
            } else {
                n++;
            }
            $sliderCounter.classList.toggle('slider-room__fadeIn');
            $sliderCounter.innerHTML = n + 1;
            $image.classList.toggle('slider-room__slideToLeft');
            setTimeout(function() {
                $image.hidden = true;
                $image.src = images[n];
                $image.classList.toggle('slider-room__slideToLeft');
                $image.classList.toggle('slider-room__slideRight');
                setTimeout(function() {
                    $image.hidden = false;
                    setTimeout(function() {
                        $image.classList.toggle('slider-room__slideRight');
                    }, 300);
                }, 100);
            }, 200);
        }

        function slidePrev() {
            if (n <= 0) {
                n = images.length - 1;
            } else {
                n--;
            }
            $sliderCounter.classList.toggle('slider-room__fadeIn');
            $sliderCounter.innerHTML = n + 1;
            $image.classList.toggle('slider-room__slideToRight');
            setTimeout(function() {
                $image.hidden = true;
                $image.classList.toggle('slider-room__slideLeft');
                $image.src = images[n];
                $image.classList.toggle('slider-room__slideToRight');
                setTimeout(function() {
                    $image.hidden = false;
                    setTimeout(function() {
                        $image.classList.toggle('slider-room__slideLeft');
                    }, 300);
                }, 100);
            }, 200);
        }

        $next.addEventListener('click', slideNext);
        $prev.addEventListener('click', slidePrev);
    };
})();
