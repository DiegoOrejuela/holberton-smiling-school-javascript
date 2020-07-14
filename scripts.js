$(document).ready(function () {
    let quoteCasesLoader = $('#quotes-cases-loader');

    if (quoteCasesLoader.length) {
        caruselAfterSendRequest();
        requestQuotes();
    }
});



/* ===========================
    Quotes cases with carrusel
=============================== */

function setQuotesHandler () {
    console.log($('.quotes-cases-item.active').index());
    if ($('.quotes-cases-item.active').index() === 1) {
        caruselAfterSendRequest();
        setTimeout(function () {
            requestQuotes();
        }, 1000);
    }
}

function caruselAfterSendRequest () {
    $('#carousel-inner-quotes-cases').css({
        display: 'none' 
    });
    $('#quotes-cases-loader').css({
       display: 'block' 
    })
}

function requestQuotes () {
    $.ajax({
        //==== Settings 
        url : 'https://smileschool-api.hbtn.info/quotes',
        type : 'GET',
        dataType : 'json',

        //==== Callbacks
        success : function(json) {
            console.log(json);
            $('#quotes-cases-loader').css({
                display: 'none' 
            })

            $('#carousel-inner-quotes-cases').css({
                display: 'block' 
            });

            setQuotes(json);
            
        },
        error : function(xhr, status) {
            alert('Disculpe, existió un problema');
        },
        complete : function(xhr, status) {
            //alert('Petición realizada');
        }
    });
}

function setQuotes (json) {
    let carouselInnerQuotesCases = $('#carousel-inner-quotes-cases');

    carouselInnerQuotesCases.empty();

    $.each(json, function(index, item) {
        carouselInnerQuotesCases.append(
            $('<div/>', {
                'class': index === 0 ? 'carousel-item quotes-cases-item active p-5 bg-color-theme' : 'carousel-item quotes-cases-item p-5 bg-color-theme'
            }).append(
                $('<div/>', {
                    'class': 'quotes-case-1 d-flex flex-wrap align-items-center row'
                }).append([
                    $('<div/>', {
                        'class': 'd-flex justify-content-center mr-5 mb-5 col-2'
                    }).append(
                        $('<img/>', {
                            src: item.pic_url,
                            width: '150',
                            height: '150',
                            'class': 'rounded-pill'
                        })
                    ),
                    $('<div/>', {
                        'class': 'col'
                    }).append([
                        $('<span/>', {
                            text: item.text
                        }),
                        $('<br/>'),
                        $('<br/>'),
                        $('<span/>', {
                            text: item.name,
                            'class': 'font-weight-bold d-block'
                        }),
                        $('<span/>', {
                            text: item.title,
                            'class': 'd-block font-weight-light font-italic'
                        })
                    ])
                ])
            )
        )
    });
}