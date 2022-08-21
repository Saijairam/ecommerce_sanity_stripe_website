import  sanityClient  from "@sanity/client";
import imageUrlBuilder from '@sanity/image-url';


export const client  =  sanityClient({
        projectId:'z6cqvqhh',
        dataset:'production',
        apiVersion:'2022-07-31',
        useCdn:true,
        token: process.env.NEXT_PUBLIC_SANITY_KEY
})

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);