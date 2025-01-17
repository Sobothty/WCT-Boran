import { TrolleyIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const productType = defineType ({
    name: 'productType',
    title: 'Product type',
    type: 'document',
    icon: TrolleyIcon,
    fields: [
        defineField({
            name: "name",
            title: "Product name",
            type:'string',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: "slug",
            title: 'Slug',
            type: "slug",
            options: {
                source: "name",
                maxLength: 96
            },
            validation: Rule => Rule.required()
        }),
        defineField({
            name: "image",
            title: "Product Image",
            type: "image",
            options: {
                hotspot: true
            }
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "blockContent"
        }),
        defineField({
            name: "price",
            title: "Price",
            type: "number",
            validation: Rule => Rule.required()
        }),
        defineField({
            name: "category",
            title: "Category",
            type: "array",
            of: [{type: "reference", to: {type: "category"}}],
        }),
        defineField({
            name: "stock",
            title: "Stock",
            type: "number",
            validation: Rule => Rule.min(0),
        }),
    ],
    preview: {
        select: {
            title: "name",
            media: "image",
            price: "price",
        },
        prepare(select) {
            return {
                title: select.title,
                subtitle: `$${select.price}`,
                media: select.media,
            }
        }
    }
});