processListing(function(data) {
  if (data.poCell.childElementCount > 0) {
    data.deleteButton.click();
    return true;
  }
  return false;
});
