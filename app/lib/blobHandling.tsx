'use server'
import { list, del } from '@vercel/blob';

export async function deleteBlobs(name: string) {
  try {
    const listResult: {url: string, pathname: string}[] = (await list()).blobs;
    const blobToDelete = listResult.find(blob => blob.pathname.includes(name));
    if (blobToDelete) {
        await del(blobToDelete.url);
    }

  } catch (error) {
    console.error('Fehler beim Löschen der Blobs:', error);
  }
}


export async function getBlobList() {
  const listResult: {url: string, pathname: string}[] = (await list()).blobs;
  return listResult;
}
