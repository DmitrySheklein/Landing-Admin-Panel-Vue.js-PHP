const $ = require('jquery');

function getPagesList() {
    $.get('./api', function (data) {
        $('h1').remove();

        $.each(data, (i, el) => {
            const $deleteBtn = $('<button>').data('name', el)
            $deleteBtn.addClass('remove-btn').text('Удалить')
            const $h1 = $('<h1>').text(el)
            $h1.append($deleteBtn)
            $('body').append($h1)
        })
    }, 'json')
}
getPagesList();

$('#create-page-btn').click(() => {
    $.post('./api/createNewHtmlPage.php', {
            name: $('input[type="text"').val()
        }, (data) => {
            getPagesList();
        })
        .fail(() => {
            console.error('Файл уже создан')
        })
})

$(document).on('click', '.remove-btn', (event) => {
    const pageName = $(event.target).data('name')
    if(pageName) {
        $.post('./api/removeHtmlPage.php', {
            name: pageName
        }, (data) => {        
            getPagesList();
            alert('Файл удалён успешно')    
        })
        .fail(()=>{
            console.error('Файл не существует')
        })
    }
})