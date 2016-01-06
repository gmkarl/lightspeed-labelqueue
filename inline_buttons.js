/* <header style="position:relative;right:-8px;top:-1px;overflow:hidden"><ol class="listing-functions"><li><button class="delete-function
supplementary"><i class="icon-trash "></i> Clear PO</button></li><li><button class="delete-function supplementary"><i class="icon-trash "></i>Clear
Multiple</button></li><li><button class="delete-function supplementary"><i class="icon-trash "></i> Clear Extra Copies</button></li></ol></header> */

var uiButtons = document.createElement("header");
uiButtons.style.position = "relative";
uiButtons.style.right = "-8px";
uiButtons.style.top = "-1px";
uiButtons.style.overflow = "hidden";

uiButtons.innerHTML = '<ol class="listing-functions"><li><button class="delete-function supplementary" id="extended_clearPO"><i class="icon-trash
"></i> Clear PO</button></li><li><button class="delete-function supplementary" id="extended_clearMultiple"><i class="icon-trash "></i>Clear
Multiple</button></li><li><button class="delete-function supplementary" id="extended_clearExtra"><i class="icon-trash "></i> Clear Extra Copies</button></li></ol>';

document.getElementsByClassName("controls")[0].appendChild(uiButtons);
