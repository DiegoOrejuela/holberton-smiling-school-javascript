$(document).ready(function () {
    let quoteCasesLoader = $('#quotes-cases-loader');
    let popularTutorialsLoader = $('#popular-tutorials-loader');

    if (quoteCasesLoader.length) {
        caruselBeforeSendRequest('carousel-inner-quotes-cases', 'quotes-cases-loader');
        setTimeout(function () {
            requestQuotes();
        }, 1000);
    }

    if (popularTutorialsLoader.length) {
        caruselBeforeSendRequest('carousel-inner-popular-tutorials', 'popular-tutorials-loader');
        setTimeout(function () {
            mostPopularTutorialsRequest();
        }, 1000);
    }
});


/* ========
    Shared
======== */

function caruselBeforeSendRequest (carouselInnerId, quotesCasesLoaderId) {
    $(`#${carouselInnerId}`).css({
        display: 'none' 
    });
    $(`#${quotesCasesLoaderId}`).css({
       display: 'block' 
    })
}

function caruselAfterSuccessRequest (carouselInnerId, quotesCasesLoaderId) {
    $(`#${quotesCasesLoaderId}`).css({
        display: 'none' 
    });
    $(`#${carouselInnerId}`).css({
        display: 'block' 
    });
    
}

/* ===========================
    Quotes cases with carrusel
=============================== */

function setQuotesHandler () {
    console.log($('.quotes-cases-item.active').index());
    if ($('.quotes-cases-item.active').index() === 1) {
        //caruselAfterSendRequest();
        caruselBeforeSendRequest('carousel-inner-quotes-cases', 'quotes-cases-loader');
        setTimeout(function () {
            requestQuotes();
        }, 1000);
    }
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
            caruselAfterSuccessRequest('carousel-inner-quotes-cases', 'quotes-cases-loader');
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

/* ===========================
    Most popular tutorials with carousel
=============================== */

function mostPopularTutorialsRequest () {
    $.ajax({
        //==== Settings 
        url : 'https://smileschool-api.hbtn.info/popular-tutorials',
        type : 'GET',
        dataType : 'json',

        //==== Callbacks
        success : function(json) {
            console.log(json);
            caruselAfterSuccessRequest('carousel-inner-popular-tutorials', 'popular-tutorials-loader');
            mostPopularTutorials(json);
            
        },
        error : function(xhr, status) {
            alert('Disculpe, existió un problema');
        },
        complete : function(xhr, status) {
            //alert('Petición realizada');
        }
    });
}

function mostPopularTutorials (json) {
    let carouselInnerPopularTutorials = $('#carousel-inner-popular-tutorials');

    carouselInnerPopularTutorials.empty();

    $.each(json, function(index, item) {
        // ==== Calculated Components
        
        // - Starts
        const numberTotalsStarts = 5;
        let startsDiv = $('<div/>', {
            'class': 'starts-video d-flex align-items-center mr-4'
        });

        for (let i = 0; i < numberTotalsStarts; i++) {
            startsDiv.append(
                $('<img/>', {
                    src: i < item.star ? 'images/star_on.png' : 'images/star_off.png',
                    width: '15',
                    height: '15',
                    'class': i !== 4 ? 'mr-2' : ''
                })
            );
        }


        // ==== Append carousel Inner Popular Tutorials item
        carouselInnerPopularTutorials.append(
            $('<div/>', {
                'class': index === 0 ? 
                    'carousel-item carusel-inner-multiples-slides-item carousel-inner-popular-tutorials-item col-12 col-sm-6 col-md-4 col-lg-3 active' : 
                    'carousel-item carusel-inner-multiples-slides-item carousel-inner-popular-tutorials-item col-12 col-sm-6 col-md-4 col-lg-3'
            }).append(
                $('<div/>', {
                    'class': 'd-flex flex-column mr-3'
                }).append([
                    $('<div/>', {
                        'class': 'cover-video'
                    }).append([
                        $('<img/>', {
                            src: item.thumb_url,
                            width: '255',
                            height: '154',
                            'class': 'rounded mb-2'
                        }),
                        $('<img/>', {
                            src: 'images/play.png',
                            width: '64',
                            height: '64',
                            'class': 'play-image'
                        })
                    ]),
                    $('<div/>', {
                        'class': 'pl-3 pr-3'
                    }).append([
                        $('<span/>', {
                            text: item.title,
                            'class': 'd-block font-weight-bold mb-2'
                        }),
                        $('<p/>', {
                            text: item['sub-title'],
                            'class': 'mb-2 text-gray-color font-size-0875'
                        }),
                        $('<div/>', {
                            'class': 'author-post d-flex'
                        }).append([
                            $('<img/>', {
                                src: item.author_pic_url,
                                width: '30',
                                height: '30',
                                'class': 'rounded-pill mr-3 mb-2'
                            }),
                            $('<div/>', {
                                'class': 'd-flex align-items-center'
                            }).append(
                                $('<span/>', {
                                    text: item.author,
                                    'class': 'text-theme-color font-size-0875'
                                })
                            )
                        ]),
                        $('<div/>', {
                            'class': 'd-flex justify-content-between'
                        }).append([
                            startsDiv,
                            $('<div/>', {
                                'class': 'time-video text-theme-color d-flex align-items-center'
                            }).append(
                                $('<span/>', {
                                    text: item.duration
                                })
                            )
                        ]),
                    ])
                ])
            )
        )
    });
}