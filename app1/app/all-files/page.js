import {list} from '@vercel/blob';

export default async function AllFilesPage() {
    const {blobs} = await list();
    console.log({blobs});
    return <div>All files are shown here</div>;
}