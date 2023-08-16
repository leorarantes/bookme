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