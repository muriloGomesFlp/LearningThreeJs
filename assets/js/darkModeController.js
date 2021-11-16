$(function () {
    $('.darkmode').click(function () {
        let mode = $('.darkmode').attr('data-widget')

        switch (mode) {
            case 'light':
                $('.darkmode').empty()
                $('.darkmode').append('<i class="fas fa-moon"></i>')
                $('.darkmode').attr('data-widget', 'dark')
                $('body').addClass('dark-mode')
                $('nav').removeClass('navbar-white navbar-light')
                $('nav').addClass('navbar-dark')
               
                break

            case 'dark':
                $('.darkmode').empty()
                $('.darkmode').append('<i class="fas fa-sun"></i>')
                $('.darkmode').attr('data-widget', 'light')
                $('body').removeClass('dark-mode')
                $('nav').removeClass('navbar-dark')
                $('nav').addClass('navbar-white navbar-light')
                break
        }
        $
    })
})