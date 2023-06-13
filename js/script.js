const formsValidate = (selector) => {
    $(selector).each(function (){
        function checkInput(form) {
            var $form = $(form);
            $form.find('input[type="text"][required], textarea[required]').each(function () {
                if ($(this).val() != '') {
                    $(this).removeClass('is-invalid');
                    $(this).addClass('is-valid');
                } else {
                    $(this).removeClass('is-valid');
                    $(this).addClass('is-invalid')
                }
            });
            $form.find('input[type="email"][required]').each(function () {
                var regexp = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i;
                console.log(regexp.test($(this).val()))
                if (regexp.test($(this).val())) {
                    $(this).removeClass('is-invalid');
                    $(this).addClass('is-valid');
                } else {
                    $(this).removeClass('is-valid');
                    $(this).addClass('is-invalid')
                }
            });
        }

        $(this).find('[required]').focus(function () {
            $(this).removeClass('is-invalid');
            $(this).removeClass('is-valid');
        });
        $(this).submit(function (e) {
            checkInput($(this));
            if ($(this).find('.is-invalid').length) {
                e.preventDefault();

            }
        });
    });
}
const scrollAnimate = () => {
    $('[data-animate]').each(function (){
        let wScrTop = $(window).scrollTop() + $(window).height()  - ($(window).height() / 3);
        let top = $(this).offset().top;
        let animate = $(this).data('animate');
        let duration = $(this).data('duration');
        console.log($(this) , 'top-',top, ' scrTop = ', wScrTop)
        if ( wScrTop > top ) {

            $(this).css({
                animationFillMode: 'both',
                animationDuration: duration,
                animationName: animate,
            })
        }
    });
}
$(document).ready(function(){
    scrollAnimate();
    formsValidate('form');
    const myModal = new bootstrap.Modal('#thank-modal', {
        keyboard: false
    })
    $('#s-callback form').submit(function (e) {
        e.preventDefault();
        const $form = $(this);
        if (!$(this).find('.is-invalid').length) {
            $.ajax({
                url: "thank.html"
            })
                .done(function( data ) {
                    $form.get(0).reset();
                    $form.find('.is-valid').removeClass('is-valid');
                    $('#thank-modal .modal-body').html(data);
                    myModal.show($('#thank-modal'))
                });
        }
    });

});

$(window).scroll(function () {
    scrollAnimate();
});
