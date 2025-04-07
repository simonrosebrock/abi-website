'use server'
import { list, del } from '@vercel/blob';
import { unstable_cache as cache, revalidateTag} from 'next/cache';

export async function deleteBlobs(name: string) {
  try {
    const listResult: {url: string, pathname: string}[] = (await list()).blobs;
    const blobToDelete = listResult.find(blob => blob.pathname.includes(name));
    if (blobToDelete) {
        await del(blobToDelete.url);
    }
    revalidateTag('blob-list');;
  } catch (error) {
    console.error('Fehler beim Löschen der Blobs:', error);
  }
}


export const getBlobList = cache(async () => {
  const listResult: {url: string, pathname: string}[] = (await list()).blobs;
  return listResult;
}, ['blob-list'], {revalidate: false, tags: ['blob-list']});
