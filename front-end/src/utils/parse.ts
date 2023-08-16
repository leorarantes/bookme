export function parseListElements(elements: any[]) {
  if(elements[0]) {
      const titleKey = Object.keys(elements[0])[1];
      return elements.map((element) => {
          return {
              id: element.id,
              title: element[titleKey]
          };
      });
  }
  return [];
}

export function parseName(name: string) {
  return name.replace(' ', '-').toLowerCase();
}

export function parseIdHash(elements: any[]) {
  const hash: any = {};
  elements.forEach((element) => {
      const {id, ...props} = element;
      hash[id] = {...props};
  });
  return hash;
}

export function twoDigitsNumber(number: number) {
  const newNumber = number < 10 ? `0${number}` : `${number}`;
  return newNumber;
}