
// 在页面中需要选择所属分类中的子分类时调用的方法
function getChildrenCategories (childrencategories, categoriesData, parentName) {
  categoriesData.sort( i => {
    if(i.parent && i.parent.name === `${parentName}`) {
      childrencategories.push(i)
  }
  })
}

export  {
  getChildrenCategories
}
