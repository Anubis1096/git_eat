var Quagga = window.Quagga;
var App = {
  _lastResult: null,
  init: function () {
    this.attachListeners();
  },
  activateScanner: function () {
    var scanner = this.configureScanner(".overlay__content"),
      onDetected = function (result) {
        this.addToResults(result);
      }.bind(this),
      stop = function () {
        scanner.stop(); // should also clear all event-listeners?
        scanner.removeEventListener("detected", onDetected);
        this.hideOverlay();
        this.attachListeners();
      }.bind(this);

    this.showOverlay(stop);
    console.log("activateScanner");
    scanner.addEventListener("detected", onDetected).start();
  },
  addToResults: function (result) {
    if (this._lastResult === result.codeResult.code) {
      return;
    }
    this._lastResult = result.codeResult.code;
    var resultSets = document.querySelectorAll("ul.results");

    Array.prototype.slice.call(resultSets).forEach(function (resultSet) {
      var div = document.createElement("div");
      div.setAttribute("type", "button");
      div.classList.add("btn", "btn-secondary");
      // const button = $("<div class='btn btn-secondary'</div>");
      code = result.codeResult.code;
      // console.log(result);
      // li.className = "result";
      // format.className = "format";
      // code.className = "code";

      div.append(code);

      // format.append(document.createTextNode(result.codeResult.format));
      // code.append(document.createTextNode(result.codeResult.code));
      div.id = result.codeResult.code;
      resultSet.insertBefore(div, resultSet.firstChild);
    });
    $(".btn-secondary").on("click", function (event) {
        event.preventDefault();
        const barcode = this.id;
        console.log(barcode);
  
        if (barcode == "") {
          // if the user does not enter a name, display error message
          alert("Please enter an ingredient");
        } else {
          $.ajax("/api/barcode/", {
            type: "POST",
            data: {
              barcode: barcode,
            },
          }).then(function (res) {
            // reload the page to display new burger
            console.log(res);
          });
        }
  
        console.log("clicky working");
      });
  
  },

  
  attachListeners: function () {
    var button = document.querySelector("button.scan"),
      self = this;

    button.addEventListener("click", function clickListener(e) {
      e.preventDefault();
      button.removeEventListener("click", clickListener);
      self.activateScanner();
    });
  },
  showOverlay: function (cancelCb) {
    document.querySelector(".container .controls").classList.add("hide");
    document.querySelector(".overlay--inline").classList.add("show");
    var closeButton = document.querySelector(".overlay__close");
    closeButton.addEventListener("click", function closeHandler() {
      closeButton.removeEventListener("click", closeHandler);
      cancelCb();
    });
  },
  hideOverlay: function () {
    document.querySelector(".container .controls").classList.remove("hide");
    document.querySelector(".overlay--inline").classList.remove("show");
  },
  querySelectedReaders: function () {
    return Array.prototype.slice
      .call(document.querySelectorAll(".readers input[type=checkbox]"))
      .filter(function (element) {
        return !!element.checked;
      })
      .map(function (element) {
        return element.getAttribute("name");
      });
  },
  configureScanner: function (selector) {
    var scanner = Quagga.decoder({ readers: this.querySelectedReaders() })
      .locator({ patchSize: "medium" })
      .fromSource({
        target: selector,
        constraints: {
          width: 600,
          height: 600,
          facingMode: "environment",
        },
      });
    return scanner;
  },
};
App.init();
