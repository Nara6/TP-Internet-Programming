const category = require("../models/category")

const findById = async (id) => {
  try{
    const category = await category.findById(id)
    console.log(category);
    return {
      success : true,
      data : category
    }
  }catch(err){
    return {
      success : false,
      err : err.message
    }
  }
}

const findAll = async () => {
  try{
    const categories = await category.find()
    return {
      success : true,
      data : categories
    }
  }catch(err){
    return {
      success : false,
      err : err.message
    }
  }
}

const findCategorizedItems = async () => {
  return await category.aggregate([
    {
      $lookup: {
        from: "items",
        localField: "_id",
        foreignField: "category",
        as: "items"
      }
    },
    {
      $project: {
        _id: 1,
        name: 1,
        desc: 1,
        imageUrl: 1,
        items: {
          _id: 1,
          name: 1,
          category: 1,
          desc: 1,
        }
      }
    }
  ])
}

const create = async (newCategory) => {
  try{
    console.log(newCategory);
    const Category = await category.create(newCategory);
    return {
      success: true,
      data: Category
    }
  }catch(err){
    return {
      success : false,
      err : err.message
    }
  }
}

const update = async (cat_id, newCategory) => {
  try{
    const category = await category.findById(cat_id)
    category.name = newCategory.name
    category.desc = newCategory.desc
    category.imageUrl = newCategory.imageUrl
    await category.save()
    return {
      success : true,
      data : category
    }
  }catch(err){
    return{
      success : false,
      err : err.message
    }
  }
}

const remove = async (cat_id) => {
  try{
    await category.deleteOne({ _id:cat_id})
    return {
      success : true,
      data : "category deleted"
    }
  }catch(err){
    return {
      success : false,
      err : err.message
    }
  }
}

module.exports = {
  findById,
  update,
  remove,
  findAll,
  create,
  findCategorizedItems
}