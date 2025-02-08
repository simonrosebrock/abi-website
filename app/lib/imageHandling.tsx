'use server'
import { unstable_noStore as noStore } from "next/cache";

export const uploadFile = async (file: File, student: string) => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch('http://homeapp.webredirect.org:4000/upload', {
            method: 'POST',
            body: formData,
            headers: {
                'x-api-key': 'your-secure-key',
                'content-type': 'multipart/form-data',
                'folder-name': student,
            }
        });

        if (res.ok) {
            alert('File uploaded successfully');
        } else {
            alert('File upload failed');
        }
    } catch (error) {
        console.error(error);
    }
}

export const getVerifiedList = async (page: number, limit: number) => {
    noStore()
    const res = await fetch('http://homeapp.webredirect.org:4000/images', {
        method: 'GET',
        headers: {
            'x-api-key': 'your-secure-key',
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
    const res = await fetch('http://homeapp.webredirect.org:4000/images', {
        method: 'GET',
        headers: {
            'x-api-key': 'your-secure-key',
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

export const getAllFileCount = async (type: string) => {
    noStore()
    const res = await fetch('http://homeapp.webredirect.org:4000/get-image-count', {
      method: 'GET',
      headers: {
        'x-api-key': 'your-secure-key',
        'folder-type': type,
      }
    });
    const data = await res.json()
    return data.all;
  }

export const getFileCount = async (type: string, student: string) => {
    noStore()
    const res = await fetch('http://homeapp.webredirect.org:4000/get-image-count', {
        method: 'GET',
        headers: {
            'x-api-key': 'your-secure-key',
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
    const res = await fetch('http://homeapp.webredirect.org:4000/get-image-count', {
        method: 'GET',
        headers: {
            'x-api-key': 'your-secure-key',
            'folder-type': type,
        }
    });
    const data = await res.json();
    return data;
}

export const createZip = async () => {
    await fetch('http://homeapp.webredirect.org:4000/createzip', {
        method: 'POST',
        headers: {
            'x-api-key': 'your-secure-key',
        }
    });
}

export const verifyFile = async (student: string, file: string) => {
    await fetch('http://homeapp.webredirect.org:4000/verification', {
        method: 'POST',
        headers: {
            'x-api-key': 'your-secure-key',
            'action': 'verify',
            'folder-name': student,
            'file-name': file,
        }
    });
}

export const deleteFile = async (student: string, file: string) => {
    await fetch('http://homeapp.webredirect.org:4000/verification', {
        method: 'POST',
        headers: {
            'x-api-key': 'your-secure-key',
            'action': 'delete',
            'folder-name': student,
            'file-name': file,
        }
    });
}