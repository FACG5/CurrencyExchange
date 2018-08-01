function fetch(method, url, data, cb) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var response = xhr.responseText;
      cb(response);
    }
  }
  var stringifiedData = JSON.stringify(data)
  xhr.open(method, url);
  xhr.send(stringifiedData);
}
