
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

//Youtube Embed Insertion
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

