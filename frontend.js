// update FB Embed
updatefbembed();
window.addEventListener("resize", updatefbembed);

function updatefbembed() {
  var embed = document.getElementById('fbembed');

  if (embed != null) {
    var newsrc = 'https://www.facebook.com/plugins/likebox.php?href=http%3A%2F%2Fwww.facebook.com%2F306639766125525&width=';
    newsrc += embed.offsetWidth + '';
    newsrc += '&colorscheme=light&show_faces=true&border_color&stream=true&header=true&height=';
    newsrc += embed.offsetHeight + '';
    embed.src = newsrc;
  }
}

//Collapsible Objects Setup
SetupButtons();

function SetupButtons() {
  var coll = document.getElementsByClassName("collapsibleButton");
  var i;

  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }

      setTimeout(UpdateDynamicVisObjs, 150);
    });
  }
}

//Scroll Visibility
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top + rect.height >= 0 &&
    rect.left >= 0 &&
    rect.bottom - rect.height <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

UpdateDynamicVisObjs();

function UpdateDynamicVisObjs() {

  let tags = $(".dynamicvisibility");

  for (var i = 0; i < tags.length; i++) {
    var tag = tags[i];

    if (isInViewport(tag)) {
      $(tag).addClass("visible");
    } else {
      $(tag).removeClass("visible");
    }
  }
}

$(document).on("scroll", function () { UpdateDynamicVisObjs(); });

//automated content insertion
function prepContent(data) {
  return data.contentWindow.document.body.innerHTML.substring(59).slice(0, -6);
}

// ================= Youtube API ================= //
var yt_api_key = GetAPIKEY();

//TITLE GETTER
function GetTitle(yt_video_id, element, func) {
  var yt_snippet_endpoint = "https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" + yt_video_id + "&key=" + yt_api_key;

  $.getJSON(yt_snippet_endpoint)
    .done(function (data) {
      var title = data.items[0].snippet.title + "";
      func(title, element);
      return;
    })
    .fail(function () {
      return "null title";
    });
}

// ====== YOUTUBE FEEDS RELIANT ====== //
var cid = 'UCMKaNzK1FpuLunon71O693w';
var reqURL = "https://api.rss2json.com/v1/api.json?rss_url=" + encodeURIComponent("https://www.youtube.com/feeds/videos.xml?channel_id=") + cid;
console.log(reqURL);

//ID GETTER
function GetVidNum(element) {
  return (element.getAttribute('vnum') ? Number(element.getAttribute('vnum')) : 0);
}
//BG SETTER
function SetBgThumbnail(element, id) {
  element.style.backgroundImage = 'url("' + "http://img.youtube.com/vi/" + id + "/sddefault.jpg" + '")';
}

$.getJSON(reqURL, function (data) { InitFeedVideos(data); });

function InitFeedVideos(data) {
  var iframes = document.getElementsByClassName('feedVideoEmbed');
  for (var i = 0, len = iframes.length; i < len; i++) {
    var element = iframes[i];
    var vdata = data.items[GetVidNum(element)];
    var link = vdata.link;
    var id = link.substr(link.indexOf("=") + 1);
    element.setAttribute("src", "https://youtube.com/embed/" + id + "?controls=0&autoplay=1");
  }

  //THUMBNAIL SETTER FOR FEED VIDEOS
  var elements = document.getElementsByClassName('feedVideoThumbnail');
  for (var i = 0, len = elements.length; i < len; i++) {
    var element = elements[i];
    var vdata = data.items[GetVidNum(element)];
    var link = vdata.link;
    var id = link.substr(link.indexOf("=") + 1);

    SetBgThumbnail(element, id);
    element.querySelector("span").innerHTML = vdata.title;

    element.setAttribute("tblink", "https://youtube.com/embed/" + id + "?controls=0&autoplay=1")
  }
}

var yt_playlist_id = 'PLoS_G_Bd60ex0W6ihfqMbd6fa5i6mbdJS';
var yt_playlist_endpoint = "https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=100&playlistId=" + yt_playlist_id + "&key=" + yt_api_key;
console.log(yt_playlist_endpoint);
$.getJSON(yt_playlist_endpoint, function (data) { InitPlaylistVideos(data); });

//THUMBNAIL SETTER FOR PLAYLIST VIDEOS
function InitPlaylistVideos(data) {
  var elements = document.getElementsByClassName('playlistVideoThumbnail');
  for (var i = 0, len = elements.length; i < len; i++) {
    var element = elements[i];
    var vnum = GetVidNum(element);
    var itemindex = data.items.length - vnum - 1;

    if (data.items[itemindex] != null) {
      id = data.items[itemindex].snippet.resourceId.videoId;
      SetBgThumbnail(element, id);

      GetTitle(id, element, function (title, in_elem) {
        in_elem.querySelector("span").innerHTML = title;
      });

      element.setAttribute("tblink", "https://youtube.com/embed/" + id + "?controls=0&autoplay=1")
    }
  }
}

// ====== YOUTUBE PLAYLIST RELIANT ====== //

//get playlist items link:
//https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=9&playlistId=PLL1ekZ31_Q4Lhjvq1F30ModgubXGMrL61&key=AIzaSyBT54ZwWyTt-U23kAEBKYptpKjIoAIhZYs

// ================= +++++++++++++++ ================= //

//footer insertion

function LoadFooter(obj) {
  document.getElementById("footer").innerHTML = obj.contentWindow.document.body.innerHTML;
}
function LoadNav(obj) {
  document.getElementById("nav").innerHTML = obj.contentWindow.document.body.innerHTML;
}

// FB embed insertion

/* Temp area

var mainwindow = document.getElementById('fbembed').contentWindow.document.body;
.children[0].children[0].children[0].children[0].children[0];
  var header = mainwindow.children[0].children[0];

*/

