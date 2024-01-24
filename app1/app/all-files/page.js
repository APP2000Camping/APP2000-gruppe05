// Import necessary modules
import { list } from '@vercel/blob';
import styles from './page.module.css';
import DeleteButton from './delete-button';

// AllFilesPage component
export default async function AllFilesPage() {
    // Fetch blobs
    const { blobs } = await list();
    
    // Categorize blobs based on their pathname
    const categorizedBlobs = categorizeBlobs(blobs);

    return (
        <div>
            <h1 className={styles.h1}>All Files</h1>

            {/* Iterate over categorized blobs */}
            {Object.entries(categorizedBlobs).map(([category, blobsInCategory]) => (
                <div key={category} className={styles.categorySection}>
                    <h2>{category}</h2>
                    {/* Iterate over blobs within the category */}
                    {blobsInCategory.map(blob => (
                        <div className={styles.files} key={blob.url}>
                            {blob.pathname} - <DeleteButton url={blob.url} />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

// Function to categorize blobs
function categorizeBlobs(blobs) {
    // Create an object to store blobs based on their category
    const categorizedBlobs = {};

    blobs.forEach(blob => {
        const category = getCategoryFromPath(blob.pathname);

        // If the category doesn't exist in the object, create an array for it
        if (!categorizedBlobs[category]) {
            categorizedBlobs[category] = [];
        }

        // Push the blob to the corresponding category array
        categorizedBlobs[category].push(blob);
    });

    return categorizedBlobs;
}

// Function to get category from path
function getCategoryFromPath(path) {
    // Get the file extension from the path
    const fileExtension = path.split('.').pop().toLowerCase();

    // Check for common image file extensions
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
    if (imageExtensions.includes(fileExtension)) {
        return 'Images';
    }

    // Check for common video file extensions
    const videoExtensions = ['mp4', 'avi', 'mkv', 'mov', 'wmv'];
    if (videoExtensions.includes(fileExtension)) {
        return 'Videos';
    }

    // Default category for other file types
    return 'Other';
}
