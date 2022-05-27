export const getExtension = (filename: string) => {
    let parts = filename.split('.');
    return parts[parts.length - 1];
}
  
export const isImage = (filename: string) => {
    let ext = getExtension(filename);
    switch (ext.toLowerCase()) {
        case 'jpg':
        case 'gif':
        case 'bmp':
        case 'png':
        case 'webp':
        case 'jpeg':
        //etc
        return { isImage: true, format: ext.toLowerCase() };
    }
    return { isImage: false, format: ext.toLowerCase() };
}

