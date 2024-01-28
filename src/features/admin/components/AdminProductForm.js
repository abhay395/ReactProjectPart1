import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  SelectBrands,
  SelectCategories,
  SelectSingelProduct,
  clearSelectedProduct,
  createProductAsync,
  deletProductAsync,
  featchSingelProductAsync,
  updateProductAsync,
} from "../../product-list/ProductSlice";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
function AdminProductForm() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
    setValue,
  } = useForm();
  const brands = useSelector(SelectBrands);
  const categories = useSelector(SelectCategories);
  const param = useParams();
  const selectedProduct = useSelector(SelectSingelProduct);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(errors);
  const OnSubmit = (data) => {
    const product = { ...data };
    product.images = [
      product.image1,
      product.image2,
      product.image3,
      product.image4,
    ];
    product.rating = selectedProduct.rating || 0;
    delete product["image1"];
    delete product["image2"];
    delete product["image3"];
    delete product["image4"];
    product.price = +product.price;
    product.stock = +product.stock;
    product.discountPercentage = +product.discountPercentage;
    product.id=selectedProduct.id
    // // product.price
    // // console.log(product,'[[')
    if (!param.id) {
      dispatch(createProductAsync(product));
      setValue("title", "");
    }
    // // console.log(product)
    dispatch(updateProductAsync(product));
    // console.log(param.id,product)
    navigate(`/admin`);
    // reset()
  };
  // const Product  = useSelector(SelectSingelProduct)
  useEffect(() => {
    if (param.id) {
      dispatch(featchSingelProductAsync({ id: param.id }));
      //  console.log(selectedProduct)
    } else {
      dispatch(clearSelectedProduct());
    }
  }, [param, dispatch]);
  useEffect(() => {
    if (selectedProduct.length !== 0) {
      const product = selectedProduct;
      console.log(product);

      const fieldsToSet = [
        "title",
        "description",
        "price",
        "discountPercentage",
        "stock",
        "category",
        "brand",
        "thumbnail",
      ];

      fieldsToSet.forEach((field) => {
        setValue(field, product[field]);
      });

      // Set image values dynamically
      for (let i = 0; i < Math.min(product.images.length, 4); i++) {
        setValue(`image${i + 1}`, product.images[i]);
      }
    } else {
      const fieldsToSet = [
        "title",
        "description",
        "price",
        "discountPercentage",
        "stock",
        "category",
        "brand",
        "thumbnail",
      ];
      fieldsToSet.forEach((field) => {
        setValue(field, "");
      });
      for (let i = 0; i < 4; i++) {
        setValue(`image${i + 1}`, "");
      }
    }
  }, [selectedProduct, dispatch]);

  return (
    <section class="bg-white min-h-screen dark:bg-gray-900">
      <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          {" "}
          {!param.id ? "Add a new product" : "Edite Product"}
        </h2>
        <form noValidate onSubmit={handleSubmit(OnSubmit)}>
          <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div class="sm:col-span-2">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Product Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type product name"
                required=""
                {...register("title", { required: "title is required" })}
              />
            </div>
            <div class="sm:col-span-2">
              <label
                for="stock"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Product Stock
              </label>
              <input
                type="text"
                name="stock"
                id="stock"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="54"
                required=""
                {...register("stock", {
                  required: "title is required",
                  min: 0,
                })}
              />
            </div>
            <div>
              <label
                for="category"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Category
              </label>
              <select
                {...register("category", { required: "category is required" })}
                id="category"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              >
                <option value="" selected="">
                  Select category
                </option>
                {categories.map((item) => (
                  <option value={item.value}>{item.value}</option>
                ))}
              </select>
            </div>
            <div class="w-full">
              <label
                for="price"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="$2999"
                required=""
                {...register("price", {
                  required: "category is required",
                  min: 1,
                  max: 10000,
                })}
              />
            </div>

            <div>
              <label
                for="brand"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Brand
              </label>
              <select
                id="brand"
                {...register("brand", { required: "brand is required" })}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              >
                <option value="" selected="">
                  Select brand
                </option>
                {brands.map((item) => (
                  <option value={item.value}>{item.value}</option>
                ))}
              </select>
            </div>
            <div>
              <label
                for="discount"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                discount (%)
              </label>
              <input
                type="number"
                name="discount"
                id="discount"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="12"
                {...register("discountPercentage", {
                  min: 0,
                  max: 80,
                  required: "discount is required",
                })}
              />
            </div>
            <div class="sm:col-span-2">
              <label
                for="thumbnail"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Thumbnail
              </label>
              <input
                type="text"
                name="thumbnail"
                id="thumbnail"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="ex. https://www.google.com"
                {...register("thumbnail", {
                  required: "thumbnail is required",
                })}
              />
            </div>
            <div>
              <label
                for="image1"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                image 1
              </label>
              <input
                type="text"
                name="image1"
                id="image1"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="ex. https://www.google.com"
                {...register("image1")}
              />
            </div>
            <div>
              <label
                for="image2"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                image 2
              </label>
              <input
                type="text"
                name="image2"
                id="image2"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="ex. https://www.google.com"
                {...register("image2")}
              />
            </div>
            <div>
              <label
                for="image3"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                image 3
              </label>
              <input
                type="text"
                name="image3"
                id="item-weight"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="ex. https://www.google.com"
                {...register("image3")}
              />
            </div>
            <div>
              <label
                for="image4"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                image 4
              </label>
              <input
                type="text"
                name="image4"
                id="image4"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="ex. https://www.google.com"
                {...register("image4")}
              />
            </div>

            <div class="sm:col-span-2">
              <label
                for="description"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
              </label>
              <textarea
                id="description"
                rows="8"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Your description here"
                {...register("description", {
                  required: "description is required",
                })}
              ></textarea>
            </div>
          </div>
          <button
            type="submit"
            class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          >
            {!param.id ? "Add product" : "Edite Product"}
          </button>
          {param.id ? (
            <button
              type="button"
              onClick={() => {
                const product = {...selectedProduct,deleted:true}
              // //  console.log(product)
                dispatch(updateProductAsync(product));
                // // navigate('/admin')
              }}
              class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white ml-3 bg-red-600 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-red-900 hover:bg-red-900"
            >
              delete
            </button>
          ) : null}
        </form>
      </div>
    </section>
  );
}

export default AdminProductForm;
