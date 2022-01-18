import SanityClient  from "@sanity/client";
import  ImageUrlBuilder  from "@sanity/image-url";
export const client = SanityClient({
    projectId:process.env.REACT_APP_PROJECT_ID,
    dataset: 'production',
    apiVersion: '2022-01-18',
    useCdn:true,
    token:process.env.REACT_APP_SANITY_TOKEN,
})
const builder = ImageUrlBuilder(client)
export const urlFor = (source) => builder.image(source)