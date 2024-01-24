import {list} from '@vercel/blob';
import styles from './page.module.css';
import DeleteButton from './delete-button';

export default async function AllFilesPage() {
    const {blobs} = await list();
    console.log({ blobs });
    return (
        <div>
            {blobs.map(blob => (
                <div className = {styles.files} key={blob.url}>
                    {blob.pathname} - <DeleteButton url={blob.url}/>
                </div>
            ))}
        </div>
    );
}