document.onreadystatechange = function () {
    if (document.readyState === "complete") {
        initApplication();
    }
}
function initApplication() {
    $(document).ready(function() {
        $('#worksRow').bind('click', function (e) {
            // Prevents the default action to be triggered.
            const bpopapImg = 'img/' + e.target.id + '.png';
            let workBig = document.querySelector('#workBig img');
            console.log('workBig=', workBig);
            let s = workBig.getAttribute('src');
            console.log('s=', s);
           workBig.setAttribute('src', bpopapImg);
            s = workBig.getAttribute('src');
            console.log('s=', s);
            e.preventDefault();
            // Triggering bPopup when click event is fired
            $('#workBig').bPopup({
                amsl: 0,
                modalClose: true,
                opacity: 0.6,
                //easing: 'easeOutBack', //uses jQuery easing plugin
                speed: 450,
                transition: 'slideDown',
                closeClass: 'videoClosed',
            });
        });
    });
};
