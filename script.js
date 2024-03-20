((holdersCount, supplyCount) => {
  const find = (xpath, result) => {
    try {
      return document.evaluate(xpath, document, null, result, null);
    } catch (error) {
      return {};
    }
  };

  const parentXPath = '//*[@id="__next"]/div/div/main/div/div[2]/div[2]';
  const parentElement = find(
    parentXPath,
    XPathResult.FIRST_ORDERED_NODE_TYPE
  ).singleNodeValue;

  if (!parentElement) return;

  let idx = 0;
  for (const child of Array.from(parentElement.children)) {
    const holders = find(
      parentXPath + "/div[" + (idx + 1) + "]/div/div[2]/div[3]/div[1]/span[2]",
      XPathResult.STRING_TYPE
    ).stringValue;

    const supply = find(
      parentXPath + "/div[" + (idx + 1) + "]/div/div[2]/div[3]/div[2]/span[2]",
      XPathResult.STRING_TYPE
    ).stringValue;

    const socialElement = find(
      parentXPath + "/div[" + (idx + 1) + "]/div/div[2]/div[2]/div/span",
      XPathResult.FIRST_ORDERED_NODE_TYPE
    ).singleNodeValue;

    if (holders !== holdersCount || supply !== supplyCount || !socialElement) {
      parentElement.removeChild(child);
    } else {
      idx += 1;
    }
  }
})("1", "3");
