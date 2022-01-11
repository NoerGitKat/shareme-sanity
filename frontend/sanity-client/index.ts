import sanityClient, { SanityClient } from '@sanity/client';
import imageUrlBuilder, { ImageUrlBuilder } from '@sanity/image-url';

export const client: SanityClient = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2021-11-16',
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
});

const builder: ImageUrlBuilder = imageUrlBuilder(client);

export const urlFor = (source: string) => builder.image(source);
