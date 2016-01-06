// TODO: understand why newly created items may not be added to the label queue,
//       to ensure they will be at pierce's store

// TODO: I want to navigateToContent to the listing page first.
// navigateToContent('listing','item.listings.labels');
// it pops a working notifier which is then hidden
// navigateToContent turns arguments into a uri
// window.breadcrumbs has information on current page
// these are in core.min.js

function processListing(itemHandler) {

  if (!window.breadcrumbs || window.breadcrumbs[window.breadcrumbs.length - 1].name != "item.listings.labels") {
    alert("Not in label print queue.");
    return;
  }

  console.log("setting up listing processor ...");

  var name = 'listing';
  var listingPannel = document.getElementById(name);
  var originalPage = listingPannel.listing.page;

  // insert hooks
  var cache_hideNotifier = window.hideNotifier;
  var cache_showNotifier = window.showNotifier;
  var cache_cb_refresh = window.cb_refresh;

  // don't allow the 'working' notifier to be hidden
  var workDone = function() {};
  window.hideNotifier = function(type, delay) {
    if (type != 'working')
      return cache_hideNotifier(type, delay);
    workDone();
  };

  // async callbacks
  window.showNotifier = function(type, message, duration) {
    if (type == 'success')
      processRow();
    return cache_showNotifier(type, message, duration);
  };
  window.cb_refresh = function(pannel) {
    var ret = cache_cb_refresh(pannel);
    processPage();
    return ret;
  };

  // define work
  var page;
  var row;

  function processPage() {
    console.log('processing listing page #' + page);
    row = listingPannel.listing.page_size;
    processRow();
  }

  function processRow() {
    var data;
    do {
      do {
        if (row <= 0) {
          if (page <= 1) {
            finish();
          } else {
            -- page;
            pageGoTo(listingPannel, page);
          }
          return;
        }
        -- row;
        console.log('processing listing row #' + row);
        var rowElement = document.getElementById('listing_r_' + row);
      } while (rowElement == null);
      data = {
        'rowIndex' : row,
        'row' : rowElement,
        'deleteButton' : rowElement.getElementsByClassName('delete')[0],
        'itemCell' : document.getElementById('cellLabelsItem_' + row),
        'copiesInput' : document.getElementById('listing_copies' + row),
        'printedInput' : document.getElementById('listing_printed' + row),
        'dateCell' : document.getElementById('cellLabelsDate_' + row),
        'poCell' : document.getElementById('cellLabelsPO_' + row)
      };
    } while (!itemHandler(data));
  }

  function finish() {
    // remove hooks
    window.cb_refresh = cache_cb_refresh;
    window.showNotifier = cache_showNotifier;
    window.hideNotifier = cache_hideNotifier;

    console.log('finished listing processing');

    if (page != originalPage)
      pageGoTo(listingPannel, originalPage);
    else
      hideNotifier('working', 0);
  }

  // begin work
  console.log("processing listing ...");
  page = listingPannel.listing.page_count;
  if (page != listingPannel.listing.page)
    pageGoTo(listingPannel, page);
  else
    processPage();
}
