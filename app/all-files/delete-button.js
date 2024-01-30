'use client'
import { useRouter } from "next/navigation";


export default function DeleteButton({ url }) {
    const router = useRouter();
  
    return (
      <button
        onClick={async () => {
          // hit our API endpoint to delete file
         try {

          await fetch('/api/file', {
            method: 'DELETE',
            body: JSON.stringify({
              url,
            }),
          });
  
          router.refresh();
        } catch (error) {
            console.error('error deleting file', error);
        }
        }}
      >
        DELETE
      </button>
    );
  }
  