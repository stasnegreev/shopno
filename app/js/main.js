document.onreadystatechange = function () {
    if (document.readyState === "complete") {
        initApplication();
    }
}

function initApplication() {
    $("a").on("click", function(e){
        var anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $(anchor.attr('href')).offset().top
        }, 777);
        e.preventDefault();
        return false;
    });
    AOS.init();
    $(document).ready(function() {
        $('#worksRow').bind('click', function (e) {
            // Prevents the default action to be triggered.
            const bpopapImg = 'img/' + e.target.id + '.png';
            let workBig = document.querySelector('#workBigImg');
            let s = workBig.getAttribute('src');
           workBig.setAttribute('src', bpopapImg);
            s = workBig.getAttribute('src');
            e.preventDefault();
            // Triggering bPopup when click event is fired
            $('#workBig').bPopup({
                amsl: 0,
                modalClose: true,
                opacity: 0.6,
                speed: 450,
                transition: 'slideDown',
                closeClass: 'videoClosed',
            });
        });
    });
    $('#serviceGrid').bind('click', function (e) {
        let serviceIteam = document.querySelector('#serviceGrid');
        console.log(e.target);
        if(e.target.classList.contains("button")){
            console.log(e.target.parentElement.classList);
            e.target.parentElement.classList.toggle("services__item_normal");
            e.target.parentElement.classList.toggle("services__item_active");

        } else{
            if(e.target.parentElement.classList.contains("button")){
                console.log(true);
                e.target.parentElement.parentElement.classList.toggle("services__item_normal");
                e.target.parentElement.parentElement.classList.toggle("services__item_active");



            }
        }
    });
    $('#carouselPrev').on('click', function (e) {
        $('#carousel2').carousel('prev');
    })
    $('#carouselNext').on('click', function (e) {
        $('#carousel2').carousel('next');
    })
    $('#carousel2').on('slide.bs.carousel', function (e) {
        document.querySelector(`#indicator${e.to}`).classList.toggle('active');
        document.querySelector(`#indicator${e.from}`).classList.toggle('active');

    })

};
