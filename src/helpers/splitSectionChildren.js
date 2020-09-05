// transforms section into object of {childSections: [...], childItems: [...]}
export default (section) => {
  return section.inventory.reduce(
    (acc, curr) => {
      if ('item' in curr) {
        acc.childItems.push(curr)
      } else if ('section' in curr) {
        acc.childSections.push(curr)
      }
      return acc
    },
    { childItems: [], childSections: [] }
  )
}
