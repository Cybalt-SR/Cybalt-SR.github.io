function togglesidebar() {
    var navbar = document.getElementById('yuynLe');
    var icon = document.getElementById('expandicon');

    if (navbar.classList.contains("jsnVQ") == false) {
        navbar.classList.add('jsnVQ');
        icon.classList.add('o0iVae');
    } else {
        navbar.classList.remove('jsnVQ');
        icon.classList.remove('o0iVae');
    }
}

function toggledropdown(idmain, idbutton) {
    var main = document.getElementById(idmain);
    var button = document.getElementById(idbutton);

    if (main.classList.contains("FWGjId") == false) {
        main.classList.add('FWGjId');
        button.classList.remove('FWGjId');
    } else {
        main.classList.remove('FWGjId');
        button.classList.add('FWGjId');
    }
}

function updatefbembed() {
    var embed = document.getElementById('fbembed');
    var newsrc = 'https://www.facebook.com/plugins/likebox.php?href=http%3A%2F%2Fwww.facebook.com%2F306639766125525&width=';
    newsrc += embed.offsetWidth + '';
    newsrc += '&colorscheme=light&show_faces=true&border_color&stream=true&header=true&height=';
    newsrc += embed.offsetHeight + '';
    embed.src = newsrc;
}