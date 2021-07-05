export function getNameInitials(name) {
  const spliteName = name.toUpperCase().split('');

  if (spliteName.length > 1) {
    return spliteName[0][0] + spliteName[1][0];
  }

  return spliteName[0][0];
}

export function transformToArrWithId(snapVal) {
  return snapVal
    ? Object.keys(snapVal).map(roomId => {
        return { ...snapVal[roomId], id: roomId };
      })
    : [];
}
