if (window.addEventListener) {
  window.addEventListener('load', getAnnouncements, false);
}
else if (window.attachEvent) {
  window.attachEvent('onload', getAnnouncements);
}
else {
  window.onload = getAnnouncements;
}

function getAnnouncements() {
  //var xmlhttp = createXMLHttpRequest(); //旧バージョンのIEなどに対応する場合
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4) {
      if (xmlhttp.status == 200) {
        var data = JSON.parse(xmlhttp.responseText);

        var noticeHTML = '<div><p>' + data.notice.body + '</p><img src="' + data.notice.icon + '" /></div>';

        var copyrightHTML = '<div><p class="copyright">' + data.copyright.body + '</p><img src="' + data.copyright.icon + '" /></div>';

        var announcementsHTML = noticeHTML;
        document.getElementById("announcements").innerHTML = announcementsHTML + '\n' + copyrightHTML;
 
      }
      else {
      }
    }
  }
  xmlhttp.open("GET", "announcements.json");
  xmlhttp.send();
}

//function createXMLHttpRequest() {
//  if (window.XMLHttpRequest) { return new XMLHttpRequest() }
//  if (window.ActiveXObject) {
//    try { return new ActiveXObject("Msxml2.XMLHTTP.6.0") } catch (e) { }
//    try { return new ActiveXObject("Msxml2.XMLHTTP.3.0") } catch (e) { }
//    try { return new ActiveXObject("Microsoft.XMLHTTP") } catch (e) { }
//  }
//  return false;
//}
