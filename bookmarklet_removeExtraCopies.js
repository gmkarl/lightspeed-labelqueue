processListing(function(data) {
  if (data.copiesInput.value > 1) {
    data.copiesInput.value = 1;
    data.copiesInput.onchange();
    return true;
  }
  return false;
});
