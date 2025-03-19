'use server'
import { unstable_noStore as noStore } from "next/cache";

const serverURL = process.env.SERVER_URL as string;
const apiKey = process.env.API_KEY as string;

export const getVerifiedList = async (page: number, limit: number) => {
    noStore()
    const res = await fetch(`${serverURL}/images`, {
        method: 'GET',
        headers: {
            'x-api-key': apiKey,
            'folder-type': 'verified',
            'student-name': 'all',
            'page': `${page}`,
            'limit': `${limit}`,
        }
    });
    const data = await res.json()
    return data;
}

export const getFileList = async (type: string, student: string, page: number, limit: number) => {
    noStore()
    const res = await fetch(`${serverURL}/images`, {
        method: 'GET',
        headers: {
            'x-api-key': apiKey,
            'folder-type': type,
            'student-name': student,
            'page': `${page}`,
            'limit': `${limit}`,
        }
        });
    var data = []
    try {
        data = await res.json()
    } catch {
        
    }
    
    return data;
}

export const getAllDeletedFileList = async () => {
    noStore()
    const res = await fetch(`${serverURL}/images`, {
        method: 'GET',
        headers: {
            'x-api-key': apiKey,
            'folder-type': 'deleted',
            'student-name': 'all',
            'page': `1`,
            'limit': `10000`,
        }
        });
    var data = []
    try {
        data = await res.json()
    } catch {
        
    }
    
    return data;
}


export const getAllFileCount = async (type: string) => {
    noStore()
    const res = await fetch(`${serverURL}/get-image-count`, {
      method: 'GET',
      headers: {
        'x-api-key': apiKey,
        'folder-type': type,
      }
    });
    const data = await res.json()
    return data.all;
  }

export const getFileCount = async (type: string, student: string) => {
    noStore()
    const res = await fetch(`${serverURL}/get-image-count`, {
        method: 'GET',
        headers: {
            'x-api-key': apiKey,
            'folder-type': type,
        }
    });
    const data = await res.json();
    try {
        var student_image_count = data[student.toLowerCase()];
    } catch {
        return 0;
    }
    
    return student_image_count;
}

export const getFileCountAdmin = async (type: string) => {
    noStore()
    const res = await fetch(`${serverURL}/get-image-count`, {
        method: 'GET',
        headers: {
            'x-api-key': apiKey,
            'folder-type': type,
        }
    });
    const data = await res.json();
    return data;
}

export const createZip = async () => {
    await fetch(`${serverURL}/createzip`, {
        method: 'POST',
        headers: {
            'x-api-key': apiKey,
        }
    });
}

export const verifyFile = async (originFolder: string, student: string, file: string) => {
    if (originFolder === 'verified') {
        return;
    }
    await fetch(`${serverURL}/verification`, {
        method: 'POST',
        headers: {
            'x-api-key': apiKey,
            'action': 'verify',
            'origin-folder': originFolder,
            'folder-name': student,
            'file-name': file,
        }
    });
}

export const deleteFile = async (originFolder: string, student: string, file: string) => {
    await fetch(`${serverURL}/verification`, {
        method: 'POST',
        headers: {
            'x-api-key': apiKey,
            'action': 'delete',
            'origin-folder': originFolder,
            'folder-name': student,
            'file-name': file,
        }
    });
}

export const deleteFilePermanent = async (originFolder: string, student: string, file: string) => {
    await fetch(`${serverURL}/delete`, {
        method: 'POST',
        headers: {
            'x-api-key': apiKey,
            'origin-folder': originFolder,
            'folder-name': student,
            'file-name': file,
        }
    });
}