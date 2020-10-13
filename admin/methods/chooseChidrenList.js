
// 在页面中需要选择所属分类中的子分类时调用的方法
function getChildrenCategories (childrencategories, categoriesData, parentName) {
  for (let i = 0; i < categoriesData.length; i++) {
      if(categoriesData[i].parent && categoriesData[i].parent.name === `${parentName}`) {
        childrencategories.push(categoriesData[i])
    }
  }
}

export  {
  getChildrenCategories
}
