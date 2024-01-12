"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useProductsContext } from "@/providers/ProductsProvider";
import { Product } from "@/lib/types";

const formSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Product name must be at least 3 characters.",
    })
    .max(50, {
      message: "Product name must be at most 50 characters.",
    }),
  description: z
    .string()
    .max(200, {
      message: "Product description must be at most 200 characters.",
    })
    .optional(),
  price: z.number().min(1, {
    message: "Product price must be a positive number higher than 1.",
  }),
});

const AddProductForm = () => {
  const { addProduct } = useProductsContext();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    let newProduct: Product = {
      id: Math.floor(Math.random() * 1000), // This is not the best way to generate an id, and you probably shouldn't do it like this in production.
      name: values.name,
      description: values.description ? values.description : "",
      price: values.price,
    };

    addProduct(newProduct);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Playstation 5 slim..." {...field} />
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
                <Textarea placeholder="" {...field} />
              </FormControl>
              <FormDescription className="w-80">
                You can leave this empty, but it&apos;s always good to add some
                text to help your clients understand your product.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  defaultValue={1}
                  placeholder=""
                  {...field}
                  onChange={(event) => field.onChange(+event.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default AddProductForm;
