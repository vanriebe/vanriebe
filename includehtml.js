function includeHTML() {
  var allElmnts, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  allElmnts = document.getElementsByTagName("*");
  for (i = 0; i < allElmnts.length; i++) {
    elmnt = allElmnts[i];
    /*search for elements with a certain atribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) { elmnt.innerHTML = this.responseText; }
          if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}
