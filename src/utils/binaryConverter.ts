const getCode = (byte: any) => {
  const text = byte.toString(16);
  if (byte < 16) {
    return '%0' + text;
  }
  return '%' + text;
};

export function byteArrayToString(byteArray: any) {
  var result = '';
  for (var i = 0; i < byteArray.length; ++i) {
    result += getCode(byteArray[i]);
  }
  return decodeURIComponent(result);
}

export function string2Bin(str: any) {
  var result = [];
  for (var i = 0; i < str.length; i++) {
    result.push(str.charCodeAt(i).toString(2));
  }
  return result;
}
