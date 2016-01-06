processListing(function(data) {
  if (data.copiesInput.value > 1) {
    data.deleteButton.click();
    return true;
  }
  return false;
});
