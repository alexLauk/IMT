
     $(function () {
        const p = '<p>Веб сайты из статьи</p>';

        $('.main').append(p).append('<ul></ul>')
            $('a').each( function () {
                $('ul').append(`<li>${$(this).text()}: ${$(this).attr('href')}</li>`)
            })
       

})