

function OnBodyScroll() {
    
    var windowheight = $(window).height();
    var tags = $(".tag");
    
    for (var i = 0; i < tags.length; i++) {
        var tag = tags[i];
        var postop = $(tag).offset().top;
        var height = $(tag).height();

        if (postop < windowheight && postop + height > 0) {
            $(tag).addClass("visible");
        } else {
            $(tag).removeClass("visible");
        }
    }

    console.log($(tags[0]).offset().top + ' : ' + windowheight);
};

var navbarOpen = false;

window.addEventListener('click', function (e) {
    var navbar = document.getElementById('mainheader');

    if (!navbar.contains(e.target) && navbarOpen) {
        // Clicked in box
        togglesidebar();
    }
});

function togglesidebar() {
    var navbar = document.getElementById('yuynLe');
    var icon = document.getElementById('expandicon');

    if (navbar.classList.contains("jsnVQ") == false) {
        navbarOpen = true;

        navbar.classList.add('jsnVQ');
        icon.classList.add('o0iVae');
    } else {
        navbarOpen = false;

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

function prepContent(data) {
    return data.contentWindow.document.body.innerHTML.substring(59).slice(0, -6);
}

function updatefbembed() {
    var embed = document.getElementById('fbembed');
    var newsrc = 'https://www.facebook.com/plugins/likebox.php?href=http%3A%2F%2Fwww.facebook.com%2F306639766125525&width=';
    newsrc += embed.offsetWidth + '';
    newsrc += '&colorscheme=light&show_faces=true&border_color&stream=true&header=true&height=';
    newsrc += embed.offsetHeight + '';
    embed.src = newsrc;
}

var reqURL = "https://api.rss2json.com/v1/api.json?rss_url=" + encodeURIComponent("https://www.youtube.com/feeds/videos.xml?channel_id=");
function loadVideo(iframe) {
    $.getJSON(reqURL + iframe.getAttribute('cid'),
        function (data) {
            var videoNumber = (iframe.getAttribute('vnum') ? Number(iframe.getAttribute('vnum')) : 0);
            console.log(videoNumber);
            var link = data.items[videoNumber].link;
            id = link.substr(link.indexOf("=") + 1);
            iframe.setAttribute("src", "https://youtube.com/embed/" + id + "?controls=0&autoplay=1");
        }
    );
}
var iframes = document.getElementsByClassName('latestVideoEmbed');
for (var i = 0, len = iframes.length; i < len; i++) {
    loadVideo(iframes[i]);
}