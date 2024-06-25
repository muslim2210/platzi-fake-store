"use client";
import { z } from "zod";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import ImageUpload from "./custom ui/ImageUpload";
import { useParams, useRouter } from "next/navigation";
import Delete from "./custom ui/Delete";
import { Separator } from "./ui/separator";
import Wrapper from "./Wrapper";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(3).max(1000).trim(),
  images: z.array(z.string()),
  categoryId: z.coerce.number().min(1),
  price: z.coerce.number().min(0.1),
});

interface ProductFormProps {
  initialData?: ProductType | null; //Must have "?" to make it optional
}

const ProductForm: React.FC<ProductFormProps> = ({ initialData }) => {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<CategoryType[]>([]);

  const router = useRouter();

  const getCategory = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
        method: "GET",
      });
      const data = await res.json();
      setCategory(data);
    } catch (err) {
      console.log("[collections_GET]", err);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const handleKeyPress = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          // images: initialData.images.map((image: { url: string }) => image.url),
          categoryId: initialData.category.id,
        }
      : {
          title: "",
          description: "",
          images: [],
          categoryId: 0,
          price: 0.1,
        },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const url = initialData
        ? `/api/products/${initialData.id}`
        : "/api/products";
      const res = await fetch(url, {
        method: initialData ? "PUT" : "POST",
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (res.ok) {
        setLoading(false);
        console.log(data);
        toast.success(`Product ${initialData ? "Updated" : "Created"}!`);
        window.location.href = "/dashboard";
        router.push("/dashboard");
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error("Something went wrong! Please try again.");
    }
  };

  return (
    <Wrapper className="my-12">
      {initialData ? (
        <div className="flex items-center justify-between">
          <p className="text-xl md:text-2xl font-bold">Edit Product</p>
          <Delete id={initialData.id} item="product" />
        </div>
      ) : (
        <p className="text-xl md:text-2xl font-bold">Create Product</p>
      )}
      <Separator className="bg-black mt-4 mb-7" />
      <div className="max-w-[600px] lg:max-w-[900px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Insert title.."
                      {...field}
                      onKeyDown={handleKeyPress}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Insert Description.."
                      {...field}
                      rows={5}
                      onKeyDown={handleKeyPress}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value}
                      onChange={(url) => field.onChange([...field.value, url])}
                      onRemove={(url) =>
                        field.onChange(
                          [...field.value].filter((images) => images !== url)
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price ($)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Insert Price.."
                        {...field}
                        onKeyDown={handleKeyPress}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger className="w-[280px]">
                          <SelectValue placeholder="Select a Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>List Category</SelectLabel>
                            {category?.map((cat) => (
                              <SelectItem
                                key={cat.id}
                                value={cat.id.toString()}
                              >
                                {cat.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-10">
              <Button
                type="button"
                onClick={() => router.push("/dashboard")}
                className="bg-slate-200 hover:bg-slate-500/80 text-black"
              >
                Discard
              </Button>
              <Button
                type="submit"
                className="bg-primary hover:opacity-80 text-white"
              >
                {loading ? "Loading..." : "Submit"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Wrapper>
  );
};

export default ProductForm;
