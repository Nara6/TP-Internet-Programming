<script >
import categoryApi from "@/libs/apis/category";
import item from "@/libs/apis/item";

export default {
    data() {
        return {
        categories: [],
        items: [],
        name: "",
        categoryId: "",
        description: "",
        }
    },
    async mounted() {
        this.categories = await categoryApi.getCategoryItem();
        this.items = await item.all();
        console.log(this.items);
    },
    methods: {
        async onSubmit(e) {
        e.preventDefault();
        const { name, description, categoryId } = this;
        const result = await item.create({ name, description, category: categoryId });
        if (!result) {
            alert(result.error);
            return;
        }

        this.items = await item.all();
        this.name = this.desc = this.categoryId = "";
        },
  },
  
};
</script>

<template >
  <main>
    <div class="bg-gray-500 text-white py-2 text-lg text-center">
      <h1>Item</h1>
    </div>
    <div class="py-2">
      <form @submit="onSubmit" method="post">
        <div class="flex flex-row py-2 px-2 space-x-2 bg-gray-100">
          <div>
            <input v-model="name" type="text" placeholder="Name" required />
          </div>
          <div>
            <label for="category">Choose a category:</label>
            <select
              v-model="categoryId"
              name="category"
              required
              class="px-2 mx-2 rounded-sm bg-green-100"
            >
              <option
                v-for="category in categories"
                :key="category.name"
                :value="category._id"
              >
                {{ category.name }}
              </option>
            </select>
          </div>
          <div>
            <input
              v-model="description"
              required
              type="text"
              placeholder="Description"
            />
          </div>
          <div>
            <button class="bg-blue-500 text-white p-1 px-2 rounded-md">
              Add new
            </button>
          </div>
        </div>
      </form>
    </div>
    <div>
      <table id="customers">
        <tr class="bg-gray-200">
          <th>Name</th>
          <th>Category</th>
          <th>Description</th>
        </tr>

        <tr v-for="item in items" :key="item.name">
          <td>{{ item.name }}</td>
          <td>{{ item.category?.name }}</td>
          <td>{{ item.description }}</td>
        </tr>
      </table>
    </div>
  </main>
</template>

<style>
#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#customers td,
#customers th {
  border: 1px solid #ddd;
  padding: 8px;
}

#customers tr:nth-child(even) {
  background-color: #f2f2f2;
}

#customers tr:hover {
  background-color: #ddd;
}
</style>